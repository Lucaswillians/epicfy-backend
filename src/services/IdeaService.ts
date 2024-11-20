import { Knex } from "knex"
import { db } from "../config/db"
import { IdeaData, ideaEntity } from "../types/idea"

export class IdeaService {
  private db: Knex

  constructor() {
    this.db = db
  }

  async getAllIdeas(): Promise<ideaEntity[]> {
    return this.db<ideaEntity>('idea').select('*')
  }

  async getOneIdea(id: number): Promise<ideaEntity | null> {
    const idea = await this.db<ideaEntity>('idea')
      .select('*')
      .where('id', id)
      .first()
    return idea || null
  }

  async createIdea(idea: IdeaData): Promise<number[]> {
    return this.db<IdeaData>('idea').insert(idea)
  }

  async updateIdea(id: number, idea: IdeaData): Promise<number> {
    return this.db<IdeaData>('idea')
      .where('id', id)
      .update(idea)
  }

  async deleteIdea(id: number): Promise<number> {
    return this.db('idea').where('id', id).del()
  }
}
