import {
  JsonController, Res, Post, Body,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { AddStudentCommand, AddStudentParams } from '@/students/domain/use-cases/add-student-command';

@injectable()
@JsonController()
export class AddStudentController {
  constructor(
    @inject(AddStudentCommand) private readonly addStudentCommand: Commands<AddStudentParams>,
  ) {}

  private onSuccess(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.OK).json(props);
    };
  }

  private onError(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(props);
    };
  }

  @Post('/students')
  public async add(@Res() res: Response, @Body() body: AddStudentParams): Promise<Response> {
    this.addStudentCommand.on('InternalServerError', this.onError(res));
    this.addStudentCommand.on('Success', this.onSuccess(res));

    await this.addStudentCommand.execute(body);
    return res;
  }
}
