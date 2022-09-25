import { Commands } from '@libs/commands-lib';

export class UpdateCourseCommandStub extends Commands<unknown> {
  public constructor(public command: string = 'Success') {
    super();
  }

  async execute(params: unknown): Promise<void> {
    this.emit(this.command, params);
  }
}
