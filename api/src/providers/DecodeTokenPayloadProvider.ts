import { decode } from 'jsonwebtoken';

interface Payload {
  id: number;
  name: string;
  email: string;
  login: string;
  temporary: boolean;
}

export class DecodeTokenPayloadProvider {
  execute(token: string): Payload {
    return decode(token, { complete: true }).payload as Payload;
  }
}
