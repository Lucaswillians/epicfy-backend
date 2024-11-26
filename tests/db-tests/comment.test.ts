
import { describe, expect } from '@jest/globals'
import { testDb } from '../../src/config/db';

describe('configDB testing', () => {
  it('database connection test', async () => {
    const commentMock = {
      content: "content test",
      user_id: 1,
      idea_id: 2,
    }

    const commentSaved = await testDb('comment').insert(commentMock)
      .then((retorno) => testDb('comment')
        .where('id', retorno[0]))
      .then((commentSelected) => commentSelected[0]);

    expect(commentSaved.content).toBe(commentMock.content)
  })
})
