import { compare, genSalt, hash } from 'bcrypt';

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

  public static async equal(text: string, encrypted: string): Promise<boolean> {
    let equal = false;

    try {
      equal = await compare(text, encrypted);
    } catch (exception) {
      throw new Error('Ocorreu um erro ao comparar o hash para a lib Bcrypt');
    }

    return equal;
  }
}
