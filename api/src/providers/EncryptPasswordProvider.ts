import { pbkdf2Sync } from 'crypto';

export class EncryptPasswordProvider {
  execute(passwordRaw: string): string {
    return pbkdf2Sync(passwordRaw, process.env.PASSWORD_SALT, 1000, 64, 'sha512').toString('hex');
  }
}
