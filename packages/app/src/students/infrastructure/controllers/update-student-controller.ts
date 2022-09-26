import {
  JsonController, Res, Body, Put, Param,
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
    @inject(UpdateStudentCommand) private readonly updateStudentCommand: Commands<Student>,
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

  @Put('/students/:id')
  public async update(
    @Res() res: Response,
    @Param('id') id :string,
    @Body() body: Student,
  ): Promise<Response> {
    this.updateStudentCommand.on('InternalServerError', this.onError(res));
    this.updateStudentCommand.on('NotFoundError', this.onNotFound(res));
    this.updateStudentCommand.on('Success', this.onSuccess(res));

    body.id = id;

    await this.updateStudentCommand.execute(body);
    return res;
  }
}
