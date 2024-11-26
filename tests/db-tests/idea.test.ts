
import { describe, expect } from '@jest/globals'
import { testDb } from '../../src/config/db';

describe('configDB testing', () => {
  it('database connection test', async () => {
    const ideaMock = {
      title: 'title test',
      description: 'description test',
      status: 'status test',
      is_pinned: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const ideaSaved = await testDb('idea').insert(ideaMock)
      .then((retorno) => testDb('idea')
      .where('id', retorno[0]))
      .then((ideaSelected) => ideaSelected[0]);

    expect(ideaSaved.title).toBe(ideaMock.title)
  })
})
