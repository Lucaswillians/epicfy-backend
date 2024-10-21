import knex, { Knex } from 'knex';
import { db } from '../config/db';
import {
  UserInsertRow,
  UserRow, UserUpdateRow
} from '../types/user';

export class User {
  private db: Knex;

  constructor() {
    this.db = db;
  }

  async add(user: UserInsertRow) {
    return this.db<UserInsertRow>('user').insert(user);
  }

  async getByEmail(email: string): Promise<number | null> {
    const user = await this.db<UserRow>('user')
      .select('id')
      .where('email', email)
      .first();
    let id = null;

    if (user && user.id) {
      id = user.id;
    }

    return id;
  }

  async getInfoByEmail(email: string): Promise<UserRow | null> {
    const user = await this.db<UserRow>('user')
      .select('*')
      .where('email', email)
      .first();

    return user || null;
  }

  async get(userId: number): Promise<UserRow | null> {
    const user = await this.db<UserRow>('user')
      .select('*')
      .where('id', userId)
      .first();

    return user || null;
  }

  async update(id: number, user: UserUpdateRow) {
    return this.db<UserUpdateRow>('user')
      .where('id', id)
      .update(user);
  }

  public async remove(id: number): Promise<number> {
    return this.db('user').where('id', id).del();
  }
}
