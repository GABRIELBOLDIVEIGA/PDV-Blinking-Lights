import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthPixDTO } from './dto/auth.dto';
import { CreateCobrancaDTO } from './dto/create-cobranca.dto';
import { AxiosError } from 'axios';
import { CobrancaResponseDTO } from './dto/cobranca.response.dto';
import { QrcodeResposeDTO } from './dto/qrcode.response.dto';
import { CobrancasQueryDTO } from './dto/cobrancas-query.dto';
import { CobrancasResponseDTO } from './dto/cobrancas.response.dto';
import configs from 'src/config/pix.env';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PixService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(PixService.name);
  private access_token: string = '';
  private readonly url = `${configs.GN_ENDPOINT}`;
  private readonly aws_webhook = `${configs.API_AWS_WEBHOOK}`;

  private getCredentials() {
    const credentials = Buffer.from(
      `${configs.GN_CLIENT_ID}:${configs.GN_CLIENT_SECRET}`,
    ).toString('base64');

    return credentials;
  }

  private getCert() {
    const cert = fs.readFileSync(
      path.join(process.cwd(), `certs/${configs.GN_CERT}`),
    );

    return cert;
  }

  private getAgent() {
    const agent = new https.Agent({
      pfx: this.getCert(),
      passphrase: '',
    });

    return agent;
  }

  private getAccess_token() {
    return this.access_token;
  }

  private getOptions() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.getAccess_token()}`,
      },
      httpsAgent: this.getAgent(),
    };

    return options;
  }

  // Every 45 minutes
  @Cron('0 */45 * * * *')
  async oauth() {
    try {
      const body = {
        grant_type: 'client_credentials',
      };

      const options = {
        headers: {
          Authorization: `Basic ${this.getCredentials()}`,
        },
        httpsAgent: this.getAgent(),
      };

      const { data } = await lastValueFrom(
        this.httpService
          .post<AuthPixDTO>(`${this.url}/oauth/token`, body, options)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw error.message;
            }),
          ),
      );

      this.access_token = data.access_token;

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async criarCobranca(
    original: string,
  ): Promise<QrcodeResposeDTO & CobrancaResponseDTO> {
    try {
      const body: CreateCobrancaDTO = {
        calendario: {
          expiracao: 1800,
        },

        valor: {
          original: original,
        },
        chave: '739d5680-b91f-458b-b630-4fa83bf3ec60',
      };

      const options = {
        headers: {
          Authorization: `Bearer ${this.getAccess_token()}`,
        },
        httpsAgent: this.getAgent(),
      };

      const { data } = await lastValueFrom(
        this.httpService
          .post<CobrancaResponseDTO>(`${this.url}/v2/cob`, body, options)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw error.message;
            }),
          ),
      );

      const qrcode = await this.getQrcode(data.loc.id);
      const response = { ...data, ...qrcode };

      this.addJob(data.txid);

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addJob(txid: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService
          .post<{
            status: boolean;
            txid: string;
          }>(`${this.aws_webhook}/pix/adiciona-job`, { txid })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw error.message;
            }),
          ),
      );

      return data;
    } catch (error) {
      return 'erro ao cliar job';
    }
  }

  async getQrcode(id: number): Promise<QrcodeResposeDTO> {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${this.getAccess_token()}`,
        },
        httpsAgent: this.getAgent(),
      };

      const { data } = await lastValueFrom(
        this.httpService
          .get<QrcodeResposeDTO>(`${this.url}/v2/loc/${id}/qrcode`, options)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw error.message;
            }),
          ),
      );

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCobrancas(
    cobrancasQuery: CobrancasQueryDTO,
  ): Promise<CobrancasResponseDTO> {
    try {
      const keys = Object.keys(cobrancasQuery);

      const params = keys.map((k) => `${k}=${cobrancasQuery[`${k}`]}`);

      const query = `?${params.join('&')}`;

      const { data } = await lastValueFrom(
        this.httpService
          .get<CobrancasResponseDTO>(
            `${this.url}/v2/cob${query}`,
            this.getOptions(),
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw error;
            }),
          ),
      );

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async webhookAws(txid: string): Promise<string> {
    const { data } = await lastValueFrom(
      this.httpService.get(`${this.url}/pix/aws/${txid}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw error.message;
        }),
      ),
    );

    return data;
  }
}
