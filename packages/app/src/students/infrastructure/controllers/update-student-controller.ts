import {
  JsonController, Res, Body, Put,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { UpdateStudentCommand } from '@/students/domain/use-cases/update-student-command';
import { Student } from '@/students/domain/entities/student';

@injectable()
@JsonController()
export class UpdateStudentController {
  constructor(
    @inject(UpdateStudentCommand) private readonly removeStudentCommand: Commands<Student>,
  ) {}

  private onSuccess(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.OK).json(props);
    };
  }

  private onNotFound(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.NOT_FOUND).json(props);
    };
  }

  private onError(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(props);
    };
  }

  @Put('/students')
  public async update(
    @Res() res: Response,
    @Body() params: Student,
  ): Promise<Response> {
    this.removeStudentCommand.on('InternalServerError', this.onError(res));
    this.removeStudentCommand.on('NotFoundError', this.onNotFound(res));
    this.removeStudentCommand.on('Success', this.onSuccess(res));

    await this.removeStudentCommand.execute(params);
    return res;
  }
}
