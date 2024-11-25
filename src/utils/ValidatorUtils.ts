import { Knex } from "knex";

export class ValidatorUtils {
  private db: Knex

  constructor(db: Knex) {
    this.db = db
  }

  static hasRequiredData(params: any[]): boolean {
    let hasRequired = true;

    for (let param in params) {
      if (params[param] == null) { 
        hasRequired = false;
        break;
      }
    }

    return hasRequired;
  }

  static hasRequiredValues(params: any[]): boolean {
    let hasRequired = true;

    for (let param in params) {
      if (params[param] == null) {
        hasRequired = false;
        break;
      }
    }

    return hasRequired;
  }

  async validateUserExists(userId: number): Promise<void> {
    const userExists = await this.db('user')
      .where('id', userId)
      .first()

    if (!userExists) throw new Error('User does not exist');
  }

  async validateIdeaExists(ideaId: number): Promise<void> {
    const ideaExists = await this.db('idea')
      .where('id', ideaId)
      .first()

    if (!ideaExists) throw new Error('Idea does not exist')
  }

  async validateUserAndIdeaExist(userId: number, ideaId: number): Promise<void> {
    await this.validateUserExists(userId)
    await this.validateIdeaExists(ideaId)
  }
}
