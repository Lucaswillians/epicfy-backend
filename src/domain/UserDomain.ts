import { User } from '../models/User';
import {
  UserAddBody,
  UserAddData, UserLoginBody,
  UserRow, UserUpdateBody,
  UserUpdateData
} from '../types/user';
import { CryptoUtils } from '../utils/CryptoUtils';
import { ValidatorUtils } from '../utils/ValidatorUtils';

export class UserDomain {
  private user: User;

  constructor() {
    this.user = new User();
  }

  public model(): User {
    return this.user;
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

    const hasRequiredData = ValidatorUtils.hasRequiredData([
      email, is_company, username, password
    ]);
    const hasRequiredValues = ValidatorUtils.hasRequiredValues([
      email, username, password
    ]);

    if (!hasRequiredData || !hasRequiredValues) {
      throw new Error('Parâmetros [email, is_company, username, password] são obrigatórios');
    }
  }

  /**
   * @throws Error
   */
  checkDataUpdate(user: UserUpdateBody) {
    const {
      username,
      password
    } = user;

    const hasRequiredData = ValidatorUtils.hasRequiredData([
      username, password
    ]);
    const hasRequiredValues = ValidatorUtils.hasRequiredValues([
      username, password
    ])

    if (!hasRequiredData || !hasRequiredValues) {
      throw new Error('Parâmetros [username, password] são obrigatórios');
    }
  }

  /**
   * @throws Error
   */
  checkDataLogin(user: UserLoginBody) {
    const {
      email,
      password
    } = user;

    const hasRequiredData = ValidatorUtils.hasRequiredData([
      email, password
    ]);
    const hasRequiredValues = ValidatorUtils.hasRequiredValues([
      email, password
    ]);

    if (!hasRequiredData || !hasRequiredValues) {
      throw new Error('Parâmetros [email, password] são obrigatórios');
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

  /**
   * @throws Error
   */
  async update(id: number, user: UserUpdateData) {
    const userExists = await this.getById(id);

    if (!userExists) {
      throw new Error(`Usuário com o código ${id} é inexistente`);
    }

    if (!user.password) {
      user.password = userExists.password;
    } else {
      const isSamePassword = await CryptoUtils.equal(user.password, userExists.password);

      if (!isSamePassword) {
        user.password = await CryptoUtils.hash(user.password);
      } else {
        user.password = userExists.password;
      }
    }

    const updateId = await this.user.update(id, {
      username: user.username,
      password: user.password
    });

    if (!updateId) {
      throw new Error("Ocorreu um erro e não foi possível atualizar o usuário");
    }

    return updateId;
  }

  /**
   * @throws Error
   */
  async unset(id: number) {
    const userExists = await this.getById(id);

    if (!userExists) {
      throw new Error(`Usuário com o código ${id} é inexistente`);
    }

    const updateId = await this.user.remove(id);

    if (!updateId) {
      throw new Error("Ocorreu um erro e não foi possível remover o usuário");
    }

    return updateId;
  }

  /**
   * @throws Error
   */
  public async byEmail(email: string): Promise<UserRow> {
    const user = await this.user.getInfoByEmail(email);

    if (!user) {
      throw new Error('Usuário não cadastrado');
    }

    return user;
  }

  /**
   * @throws Error
   */
  public async checkSignup(password: string, user: UserRow): Promise<boolean> {
    const isCorrect = await CryptoUtils.equal(password, user.password);

    if (!isCorrect) {
      throw new Error('Usuário ou senha incorretos');
    }

    return isCorrect;
  }

  public async buildLoginToken(user: UserRow): Promise<string> {
    const key = `${user.id}_${user.email}_${user.created_at}`;

    return CryptoUtils.hash(key);
  }
}
