/* eslint-disable max-len */
import {
  JsonController, Res, Delete, Params,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { RemoveStudentCommand, RemoveStudentParams } from '@/students/domain/use-cases/remove-student-command';

@injectable()
@JsonController()
export class RemoveStudentController {
  constructor(
    @inject(RemoveStudentCommand) private readonly removeStudentCommand: Commands<RemoveStudentParams>,
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

  @Delete('/students/:id')
  public async remove(
    @Res() res: Response,
    @Params() params: RemoveStudentParams,
  ): Promise<Response> {
    this.removeStudentCommand.on('InternalServerError', this.onError(res));
    this.removeStudentCommand.on('NotFoundError', this.onNotFound(res));
    this.removeStudentCommand.on('Success', this.onSuccess(res));

    await this.removeStudentCommand.execute(params);
    return res;
  }
}
