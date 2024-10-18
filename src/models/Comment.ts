import knex from 'knex';
import { db } from '../config/db';

export class Comment {
  private db: knex.Knex;

  constructor() {
    this.db = db;
  }
}
