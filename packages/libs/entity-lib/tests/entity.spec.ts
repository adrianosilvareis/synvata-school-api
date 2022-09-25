import { Entity } from '../src/lib/entity';

type UserParams = {
  name: string
}

class User extends Entity<UserParams> {
  public name!: string;

  public static create(params: UserParams, id?: string): User {
    return new User(params, id);
  }
}

describe('Entity', () => {
  it('should create a new entity when call static create', () => {
    const user = User.create({ name: 'fake_name' });
    expect(user.name).toBe('fake_name');
  });

  it('should create a new uuid without provider id', () => {
    const user = User.create({ name: 'fake_name' });
    const user2 = User.create({ name: 'fake_name' });
    expect(user.equal(user2)).toBeFalsy();
  });

  it('should compare id when use equal method', () => {
    const user = User.create({ name: 'fake_name' });
    const user2 = User.create({ name: 'fake_name' }, user.id.toString());

    expect(user.equal(user2)).toBeTruthy();
  });
});
