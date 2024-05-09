import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import configs from 'src/config/pix.env';

@Injectable()
export class PixService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(PixService.name);
  private access_token: string = '';
  private readonly url = `${configs.GN_ENDPOINT}`;

  jobs = [
    { status: false, txid: '1' },
    { status: false, txid: '2' },
    { status: false, txid: '3' },
    { status: false, txid: '4' },
    { status: false, txid: '5' },
  ];

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

  async resolveJobs(txid: string) {
    const job = this.jobs.find((job) => job.txid === txid);

    if (!job) throw new BadRequestException('TXID não encontrado.');

    return { status: true, ...job };
  }

  async recebePagamento(txid: string) {
    const job = this.jobs.find((job) => {
      return job.txid === txid;
    });

    if (!job) throw new BadRequestException('TXID não encontrado.');

    const lista_atualizada = [
      ...this.jobs.filter((job) => job.txid != txid),
      { status: true, txid },
    ];

    this.jobs = lista_atualizada;
  }
}
