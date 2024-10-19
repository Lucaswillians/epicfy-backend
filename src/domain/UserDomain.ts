import { User } from '../models/User';
import { UserAddBody } from '../types/user';
import { ValidatorUtils } from '../utils/ValidatorUtils';

export class UserDomain {
  private user: User;

  constructor() {
    this.user = new User();
  }

  /**
   * @throws Error
   */
  async add(user: UserAddBody) {
    // To ensure `is_company` is a boolean item.
    user.is_company = !!user.is_company;

    const addedIds = await this.user.add({
      email: user.email as string,
      is_company: user.is_company,
      username: user.username as string,
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
      email, is_company, username
    } = user;

    if (!ValidatorUtils.hasRequiredData([email, is_company, username])) {
      throw new Error('Parâmetros [email, is_company, username] são obrigatórios');
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
}
