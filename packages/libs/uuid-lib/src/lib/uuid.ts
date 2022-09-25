import crypto from 'crypto';

export class Uuid {
  public constructor(private readonly identity: string, private readonly entityName: string | Symbol = 'Uuid') {
    if (!Uuid.isValid(identity)) {
      throw new Error('Invalid UUID');
    }
  }

  public static isValid(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }

  public static generate(entityName?: string | Symbol): Uuid {
    return new Uuid(crypto.randomUUID().toString(), entityName);
  }

  public toString(): string {
    return this.identity;
  }

  public equal(uuid: Uuid): boolean {
    return uuid.entityName === this.entityName && uuid.identity === this.identity;
  }
}
