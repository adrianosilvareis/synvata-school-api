import { Uuid } from '../src/lib/uuid';

describe('Uuid', () => {
  it('should generate a correct uuid', () => {
    const uuid = Uuid.generate();
    expect(Uuid.isValid(uuid.toString())).toBeTruthy();
  });

  it('should validate a correct uuid', () => {
    const uuid = '59b9ff16-7eb6-4fc5-adff-c21658e9e165';
    expect(Uuid.isValid(uuid)).toBeTruthy();
  });

  it('should not validate an incorrect uuid', () => {
    const uuid = '59b9ff16-7eb6-4fc5-adff-c21658e9e165a';
    expect(Uuid.isValid(uuid)).toBeFalsy();
  });

  it('should not validate an empty uuid', () => {
    const uuid = '';
    expect(Uuid.isValid(uuid)).toBeFalsy();
  });
  it('should return false when diferente identity', () => {
    const entity = Symbol('Entity');
    const uuid = Uuid.generate(entity);
    const uuid2 = Uuid.generate(entity);
    expect(uuid.equal(uuid2)).toBeFalsy();
  });

  it('should return false when diferente entity', () => {
    const entity = Symbol('Entity');
    const uuid = Uuid.generate(entity);
    const otherEntity = Symbol('OtherEntity');
    const uuid2 = new Uuid(uuid.toString(), otherEntity);
    expect(uuid.equal(uuid2)).toBeFalsy();
  });

  it('should return false when diferente entity', () => {
    const entity = Symbol('Entity');
    const uuid = Uuid.generate(entity);
    const uuid2 = new Uuid(uuid.toString(), entity);
    expect(uuid.equal(uuid2)).toBeTruthy();
  });
});
