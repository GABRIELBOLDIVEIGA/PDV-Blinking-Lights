import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const cert = fs.readFileSync(
  path.resolve(__dirname, `./certs/${process.env.GN_CERT}`),
);

console.log('[Cert] => ', cert);

const agent = new https.Agent({
  pfx: cert,
  passphrase: '',
});

@Injectable()
export class PixService {
  constructor() {}

  async oauth() {
    const credentials = Buffer.from(
      `${process.env.GN_CLIENT_ID}: ${process.env.GN_CLIENT_SECRET}`,
    ).toString('base64');

    console.log('[Credentials] => ', credentials);

    return axios({
      method: 'POST',
      url: `${process.env.GN_ENDPOINT}/oauth/token`,
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
      data: {
        grant_type: 'client_credentials',
      },
    });
  }
}
