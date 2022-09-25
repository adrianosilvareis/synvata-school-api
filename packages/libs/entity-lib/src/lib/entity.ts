import { Uuid } from '@libs/uuid-lib';

export class Entity <T> {
  private readonly identity: Uuid;

  protected constructor(params: T, identity?: string, entityName: string | Symbol = 'Entity') {
    this.identity = identity ? new Uuid(identity, entityName) : Uuid.generate(entityName);
    Object.assign(this, params);
  }

  public get id(): Uuid {
    return this.identity;
  }

  public equal(entity: Entity<T>): boolean {
    return this.identity.equal(entity.id);
  }
}
