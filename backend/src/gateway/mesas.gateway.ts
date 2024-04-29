import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MesasService } from 'src/database/mesas/mesas.service';

@WebSocketGateway(8092, {
  maxHttpBufferSize: 1e6,
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: false,
  },
  allowEIO3: true,
})
export class MesaGateway {
  constructor(private readonly mesasService: MesasService) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() mesa: { id: number; aberta: boolean }) {
    await this.mesasService.update(mesa.id, { aberta: mesa.aberta });

    this.server.emit('message', mesa);
  }
}
