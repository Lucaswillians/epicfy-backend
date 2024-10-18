import { Knex } from 'knex';
import { db } from '../config/db';

export class User {
  private db: Knex;

  constructor() {
    this.db = db;
  }
}
