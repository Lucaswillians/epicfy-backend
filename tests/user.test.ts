import { describe, expect, it } from '@jest/globals';
import { testDb } from '../src/config/db';
import { UserDomain } from '../src/domain/UserDomain';
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
    await user.add({
      email: 'test_3@test_3.com',
      password: 'test_3',
      is_company: true,
      username: 'test_3'
    });
    const userWithEmail = await user.getInfoByEmail('test_3@test_3.com');

    expect('test_3@test_3.com').toEqual(userWithEmail?.email);
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

    expect(userCreated[0]).toEqual(userWithEmail?.id);
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
  it('should create a User', async () => {
    await testDb.migrate.latest();
    const user = new UserDomain();

    user.model().switch(testDb);

    const testCreation = await user.add({
      email: 'test_7@test_7.com',
      password: 'test_1',
      is_company: false,
      username: 'test_7'
    });

    expect(testCreation).toBeGreaterThan(0);
  });

  it('should check undefined creation data', () => {
    const user = new UserDomain();

    expect(() => user.checkData({})).toThrow(Error);
  });

  it('should check empty creation data',  () => {
    const user = new UserDomain();

    expect(() => user.checkData({
      email: '',
      password: '',
      username: ''
    })).toThrow(Error);
  });

  it('should check undefined update data', () => {
    const user = new UserDomain();

    expect(() => user.checkDataUpdate({})).toThrow(Error);
  });

  it('should check empty update data',  () => {
    const user = new UserDomain();

    expect(() => user.checkDataUpdate({
      password: '',
      username: ''
    })).toThrow(Error);
  });

  it('should check undefined login data', () => {
    const user = new UserDomain();

    expect(() => user.checkDataLogin({})).toThrow(Error);
  });

  it('should check empty login data',  () => {
    const user = new UserDomain();

    expect(() => user.checkDataLogin({
      email: '',
      password: '',
    })).toThrow(Error);
  });

  it('should check wrong e-mail',  () => {
    const user = new UserDomain();

    expect(() => user.validateEmail('asdasdasd')).toThrow(Error);
  });

  it('should check correct e-mail',  () => {
    const user = new UserDomain();

    expect(() => user.validateEmail('test@test.com.br')).not.toThrow(Error);
  });

  it('should check correct e-mail format',  () => {
    const user = new UserDomain();

    expect(user.isValidEmail('test@test.com.br')).toBeTruthy();
  });

  it('should check wrong e-mail format',  () => {
    const user = new UserDomain();

    expect(user.isValidEmail('test@test')).toBeFalsy();
  });

  it('should check wrong id format',  () => {
    const user = new UserDomain();

    expect(() => user.checkId('test')).toThrow(Error);
  });

  it('should check correct string id format',  () => {
    const user = new UserDomain();

    expect(() => user.checkId('1')).not.toThrow(Error);
  });

  it('should check correct int id format',  () => {
    const user = new UserDomain();

    expect(() => user.checkId(1)).not.toThrow(Error);
  });

  it('should update a User', async () => {
    await testDb.migrate.latest();
    const user = new UserDomain();
    const afterUser = 'test_9_show'

    user.model().switch(testDb);

    const testUpdate = await user.add({
      email: 'test_7@test_7.com',
      password: 'test_1',
      is_company: false,
      username: 'test_7'
    });
    await user.update(testUpdate, {
      password: '',
      username: afterUser
    });
    const userUpdated = await user.getById(testUpdate);

    expect(userUpdated?.username).toEqual(afterUser);
  });

  it('should remove a User', async () => {
    await testDb.migrate.latest();
    const user = new UserDomain();

    user.model().switch(testDb);

    const testUpdate = await user.add({
      email: 'test_7@test_7.com',
      password: 'test_1',
      is_company: false,
      username: 'test_7'
    });
    await user.unset(testUpdate);
    const userUpdated = await user.getById(testUpdate);

    expect(userUpdated).toBeNull();
  });

  it('should query a User', async () => {
    await testDb.migrate.latest();
    const user = new UserDomain();

    user.model().switch(testDb);

    await user.add({
      email: 'test_7@test_7.com',
      password: 'test_1',
      is_company: false,
      username: 'test_7'
    });
    const created = await user.byEmail('test_7@test_7.com');

    expect(created).not.toBeNull();
  });

  it('should login a User', async () => {
    await testDb.migrate.latest();
    const user = new UserDomain();

    user.model().switch(testDb);

    await user.add({
      email: 'test_7@test_7.com',
      password: 'test_1',
      is_company: false,
      username: 'test_7'
    });
    const created = await user.byEmail('test_7@test_7.com');
    const logged = await user.checkSignup('test_1', created);

    expect(logged).toBeTruthy();
  });

  it('should build a login token', async () => {
    await testDb.migrate.latest();
    const user = new UserDomain();

    user.model().switch(testDb);

    await user.add({
      email: 'test_7@test_7.com',
      password: 'test_1',
      is_company: false,
      username: 'test_7'
    });
    const created = await user.byEmail('test_7@test_7.com');
    const token = user.buildLoginToken(created);

    expect(token).not.toEqual('');
  });
})
