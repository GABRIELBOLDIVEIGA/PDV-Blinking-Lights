import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PixService {
  constructor(private readonly httpService: HttpService) {}

  async oauth() {
    const url = `${process.env.GN_ENDPOINT}/oauth/token`;

    const credentials = Buffer.from(
      `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`,
    ).toString('base64');

    const cert = fs.readFileSync(
      path.join(process.cwd(), `src/pix/certs/${process.env.GN_CERT}`),
    );

    const agent = new https.Agent({
      pfx: cert,
      passphrase: '',
    });

    const headers = {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
    };

    const body = {
      grant_type: 'client_credentials',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(url, body, headers).pipe(
          catchError((error: unknown) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async viaCep() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://viacep.com.br/ws/29026255/json/').pipe(
        catchError((error: unknown) => {
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }
}
