# Commands

Basic command lib for all typescript project

## dependencies

`yarn add inversify`
`yarn add reflect-metadata`

## use

```typescript
import 'reflect-metadata'
import { injectable } from 'inversify'

@injectable()
class MyCommand extends Commands<ExecProps> {
  public callbackName: string = 'success';

  async execute(command: ExecProps): Promise<void> {
    this.emit(this.callbackName, command);
  }
}
```