import { decode } from 'jsonwebtoken';

interface Payload {
  id: number;
  name: string;
  email: string;
  login: string;
}

export class DecodeTokenPayloadProvider {
  execute(token: string): Payload {
    return decode(token, { complete: true }).payload as Payload;
  }
}
