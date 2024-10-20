import { User } from '../models/User';
import { UserAddBody, UserAddData, UserRow } from '../types/user';
import { ValidatorUtils } from '../utils/ValidatorUtils';
import { CryptoUtils } from '../utils/CryptoUtils';

export class UserDomain {
  private user: User;

  constructor() {
    this.user = new User();
  }

  /**
   * @throws Error
   */
  async add(user: UserAddData) {
    user.password = await CryptoUtils.hash(user.password);

    const addedIds = await this.user.add({
      email: user.email,
      is_company: user.is_company,
      username: user.username,
      password: user.password
    });

    if (!addedIds[0]) {
      throw new Error("Ocorreu um erro e não foi possível inserir o usuário");
    }

    return addedIds[0];
  }

  /**
   * @throws Error
   */
  checkData(user: UserAddBody) {
    const {
      email,
      is_company,
      username,
      password
    } = user;

    if (!ValidatorUtils.hasRequiredData([
      email, is_company, username, password
    ])) {
      throw new Error('Parâmetros [email, is_company, username, password] são obrigatórios');
    }
  }

  /**
   * @throws Error
   */
  validateEmail(email: string): void {
    if (!email) {
      throw new Error('E-mail é obrigatório para cadastro');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('E-mail está em formato inválido')
    }
  }

  /**
   * @throws Error
   */
  async checkEmail(email: string): Promise<void> {
    const user = await this.user.getByEmail(email);

    if (user) {
      throw new Error('Usuário já existente');
    }
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;

    return emailRegex.test(email);
  }

  /**
   * @throws Error
   */
  public checkId(id: any): number {
    if (!id) {
      throw new Error('Código do usuário é obrigatório na URL (/user/:id)');
    }

    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new Error('Código do usuário é inválido');
    }

    return userId;
  }

  public async getById(id: number): Promise<UserRow | null> {
    return this.user.get(id);
  }
}
