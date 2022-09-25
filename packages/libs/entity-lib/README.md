# Entity

## Use

```typescript
import { Entity } from "@libs/entity-lib"

type UserParams = {
  name: string
}

class User extends Entity<UserParams> {

  public static create(params: UserParams, id?: string): User {
    // verify yours params
    return new User(params, id);
  }
}

const user = User.create({ name: 'teste' })

user.id // return Uuid

user.equal(OtherEntity);

```