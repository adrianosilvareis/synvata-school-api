import 'reflect-metadata';
import { injectable } from 'inversify';

import { Commands } from '../src';

type ExecProps = {
  username: string;
}

@injectable()
class MyCommand extends Commands<ExecProps> {
  public callbackName: string = 'success';

  async execute(command: ExecProps): Promise<void> {
    this.emit(this.callbackName, command);
  }
}

describe('Commands', () => {
  it('should call listener when emit is called', async () => {
    const callback = jest.fn();
    const command = new MyCommand();
    command.on('success', callback);
    await command.execute({ username: 'test' });
    expect(callback).toHaveBeenCalled();
  });

  it('should throw if listnet not found!', async () => {
    const command = new MyCommand();
    const promise = command.execute({ username: 'test' });
    await expect(promise).rejects.toThrow('Listener "success" not found');
  });
});
