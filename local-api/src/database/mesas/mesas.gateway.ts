import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  // MessageBody,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import { MesasService } from 'src/database/mesas/mesas.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway(8091, {
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
  @WebSocketServer()
  server;

  async disponibilidadeMesa(id: number, nome: string, disponivel: boolean) {
    this.server.emit('status-mesas', { id, nome, disponivel });
  }

  async atualizaProdutosMesa() {
    this.server.emit('atualiza-produtos-mesas');
  }
}
