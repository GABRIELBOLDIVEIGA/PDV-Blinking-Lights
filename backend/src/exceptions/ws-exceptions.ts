import { WsException } from '@nestjs/websockets';

type WsExceptionsType = 'BadRequest' | 'Unauthorized' | 'Unknowm';

export class WsTypeException extends WsException {
  readonly type: WsExceptionsType;

  constructor(type: WsExceptionsType, message: string | unknown) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}
