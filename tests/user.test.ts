import { describe, expect, it } from '@jest/globals';
import { Knex } from 'knex';
import { testDb } from '../src/config/db';
import { User } from '../src/models/User';

describe('Model', () => {
  it('should query a User by email', async () => {
    await testDb.migrate.latest();
    const user = new User();

    user.switch(testDb);
    const userWithEmail = await user.getByEmail('show@email.com');

    expect(userWithEmail).toBe(null);
  });
});

describe('Domain', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
})
