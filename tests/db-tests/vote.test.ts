
import { describe, expect } from '@jest/globals'
import { testDb } from '../../src/config/db';

describe('configDB testing', () => {
  it('database connection test', async () => {
    const voteMock = {
      is_upvote: 1,
      user_id: 1,
      idea_id: 2,
    }

    const voteSaved = await testDb('vote').insert(voteMock)
      .then((retorno) => testDb('vote')
        .where('id', retorno[0]))
      .then((voteSelected) => voteSelected[0]);

    expect(voteSaved.is_upvote).toBe(voteMock.is_upvote)
  })
})
