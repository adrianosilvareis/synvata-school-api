import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export abstract class Commands<T = undefined> {
  private listeners: { [key: string]: (props: unknown) => void } = {};

  protected emit(listenerName: string, props: unknown): void {
    const listener = this.listeners[listenerName];
    if (listener) {
      listener(props);
    } else {
      throw new Error(`Listener "${listenerName}" not found`);
    }
  }

  public on(listenerName: string, callback: (props: unknown) => void): void {
    this.listeners[listenerName] = callback;
  }

  abstract execute(command?: T): Promise<void>;
}
