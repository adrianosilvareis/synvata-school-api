# EntityBuilder

## use

```typescript

// entity/user.ts

class User {
  public constructor(public name: string, public email: string) {}
}

// tests/entity/user-builder.ts
class UserBuilder extends Builder<User, Builder> {
  public buildDefault (): User {
    return new User("faker-name", "faker-email")
  }
}

//tests/entity/user.spec.ts
...
const builder = new UserBuilder()

const userWithOtherName = builer.with("name", "other-name").build()

const userWithDefaultValues = builer.build()
...
```