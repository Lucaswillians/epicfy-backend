import { genSalt, hash } from 'bcrypt';

export class CryptoUtils {
  private static getSalt(): number {
    return parseInt(process.env.SALT_ROUNDS || '10');
  }

  private static async genSalt(): Promise<string> {
    let salt = '';

    try {
      salt = await genSalt(CryptoUtils.getSalt());
    } catch (exception) {
      throw new Error('Ocorreu um erro ao gerar o salt para a lib Bcrypt');
    }

    return salt;
  }

  public static async hash(text: string): Promise<string> {
    let hashed = '';

    try {
      const salt = await CryptoUtils.genSalt();
      hashed = await hash(text, salt);
    } catch (exception) {
      throw new Error('Ocorreu um erro ao gerar o hash para a lib Bcrypt');
    }

    return hashed;
  }
}
