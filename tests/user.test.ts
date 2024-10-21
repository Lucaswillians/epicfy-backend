import { describe, expect, it } from '@jest/globals';
import { Knex } from 'knex';
import { testDb } from '../src/config/db';
import { User } from '../src/models/User';
import { UserRow } from '../src/types/user';

describe('Model', () => {
  it('should create a User', async () => {
    await testDb.migrate.latest();
    const user = new User();

    user.switch(testDb);
    const testCreation = await user.add({
      email: 'test_1@test_1.com',
      password: 'test_1',
      is_company: false,
      username: 'test_1'
    }) as number[];

    expect(testCreation.length > 0).toBe(true);
  });

  it('should query a User id by email', async () => {
    await testDb.migrate.latest();
    const user = new User();

    user.switch(testDb);
    const userCreated = await user.add({
      email: 'test_2@test_2.com',
      password: 'test_2',
      is_company: true,
      username: 'test_2'
    }) as number[];
    const userWithEmail = await user.getByEmail('test_2@test_2.com');

    expect(userCreated[0]).toEqual(userWithEmail);
  });

  it('should query a User info by email', async () => {
    await testDb.migrate.latest();
    const user = new User();

    user.switch(testDb);
    const userCreated = await user.add({
      email: 'test_3@test_3.com',
      password: 'test_3',
      is_company: true,
      username: 'test_3'
    }) as number[];
    const userWithEmail = await user.getInfoByEmail('test_3@test_3.com');

    expect(userCreated[0]).toEqual(userWithEmail);
  });

  it('should query a User info by id', async () => {
    await testDb.migrate.latest();
    const user = new User();

    user.switch(testDb);
    const userCreated = await user.add({
      email: 'test_4@test_4.com',
      password: 'test_4',
      is_company: true,
      username: 'test_4'
    }) as number[];
    const userWithEmail = await user.get(userCreated[0]);

    expect(userCreated[0]).toEqual(userWithEmail);
  });

  it('should update a User', async () => {
    await testDb.migrate.latest();
    const user = new User();
    const initialUsername = 'test_5';
    const afterUsername = 'test_5_after'

    user.switch(testDb);
    const userCreated = await user.add({
      email: 'test_5@test_5.com',
      password: 'test_5',
      is_company: true,
      username: initialUsername
    }) as number[];
    const userWithEmailInitial = await user.get(userCreated[0]) as UserRow;
    await user.update(userCreated[0], {
      username: afterUsername,
      password: ''
    });
    const userWithEmailAfter = await user.get(userCreated[0]) as UserRow;

    expect(
      userWithEmailInitial.username === initialUsername &&
      userWithEmailAfter.username === afterUsername
    ).toEqual(true);
  });

  it('should update a User', async () => {
    await testDb.migrate.latest();
    const user = new User();

    user.switch(testDb);
    const userCreated = await user.add({
      email: 'test_6@test_6.com',
      password: 'test_6',
      is_company: true,
      username: 'test_6'
    }) as number[];
    const userWithEmailInitial = await user.get(userCreated[0]) as UserRow;
    await user.remove(userCreated[0]);
    const userWithEmailAfter = await user.get(userCreated[0]) as UserRow;

    expect(userWithEmailInitial.id && !userWithEmailAfter).toEqual(true);
  });
});

describe('Domain', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
})
