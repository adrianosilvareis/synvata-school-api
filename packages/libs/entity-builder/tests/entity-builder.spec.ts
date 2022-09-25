/* eslint-disable max-classes-per-file */
import { Builder } from '../src';

class Entity {
  constructor(public id: number, public name: string) {}
}

class EntityBuilder extends Builder<Entity, EntityBuilder> {
  public constructor() {
    super(EntityBuilder);
  }

  protected buildDefault(): Entity {
    return new Entity(1, 'default');
  }
}

describe('EntityBuilder', () => {
  it('should be returna new Entity', () => {
    const builder = new EntityBuilder();

    const entity = builder.build();

    expect(entity.id).toBe(1);
    expect(entity.name).toBe('default');
  });

  it('should be change a default name', () => {
    const builder = new EntityBuilder();

    const entity = builder.with('name', 'otherName').build();

    expect(entity.id).toBe(1);
    expect(entity.name).toBe('otherName');
  });

  it('should be return a new Entity with many', () => {
    const builder = new EntityBuilder();

    const entities = builder.buildMany();

    expect(entities.length).toBeGreaterThanOrEqual(1);

    entities.forEach((entity) => {
      expect(entity.id).toBe(1);
      expect(entity.name).toBe('default');
    });
  });

  it('should be return a new Entity with many and quantity', () => {
    const definedQuantity = 2;
    const builder = new EntityBuilder();

    const entities = builder.buildMany(definedQuantity);

    expect(entities.length).toBe(definedQuantity);
    expect(entities[0].id).toBe(1);
    expect(entities[0].name).toBe('default');
    expect(entities[1].id).toBe(1);
    expect(entities[1].name).toBe('default');
  });
});
