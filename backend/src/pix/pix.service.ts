import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PixService {
  constructor(private readonly httpService: HttpService) {}

  getCredentials() {
    const credentials = Buffer.from(
      `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`,
    ).toString('base64');

    return credentials;
  }

  getCert() {
    const cert = fs.readFileSync(
      path.join(process.cwd(), `certs/${process.env.GN_CERT}`),
    );

    return cert;
  }

  getAgent() {
    const agent = new https.Agent({
      pfx: this.getCert(),
      passphrase: '',
    });

    return agent;
  }

  async oauth() {
    try {
      const url = `${process.env.GN_ENDPOINT}/oauth/token`;

      const body = {
        grant_type: 'client_credentials',
      };

      const options = {
        headers: {
          Authorization: `Basic ${this.getCredentials()}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: this.getAgent(),
      };

      const { data } = await firstValueFrom(
        this.httpService.post(url, body, options).pipe(
          catchError((error: unknown) => {
            throw error;
          }),
        ),
      );

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
