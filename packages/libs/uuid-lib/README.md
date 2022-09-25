# UUID-lib

## Use

```typescript
import { Uuid } from '@libs/uuid';

class MyClass {
  public id: Uuid

  constructor() {
    this.id = Uuid.generate();
  }
}
```

## validate

```typescript
//...
const uuid = 'any-valid-uuid'

Uuid.isValid(uuid) // boolean
//...
```

## toString

```typescript
//...
const uuid = Uuid.generate();
uuid.toString() // return a string with you uuid
//...
```

## compare

```typescript
//...
const firstUuid = Uuid.generate();
const secondUuid = Uuid.generate();

firstUuid.equal(secondUuid) // boolean
//...
```

## reuse uuid
```typescript
//...
const uuid = new Uuid('external uuid');
// throw if provider uuid is invalid
// return a instance of Uuid if external uuid is valid
//...
```