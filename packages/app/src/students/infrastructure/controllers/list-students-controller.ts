import {
  JsonController, Res, Get,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { ListStudentsCommand } from '@/students/domain/use-cases/list-students-command';

@injectable()
@JsonController()
export class ListStudentsController {
  constructor(@inject(ListStudentsCommand) private readonly listStudentCommand: Commands) {}

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

  @Get('/students')
  public async list(@Res() res: Response): Promise<Response> {
    this.listStudentCommand.on('InternalServerError', this.onError(res));
    this.listStudentCommand.on('Success', this.onSuccess(res));

    await this.listStudentCommand.execute();
    return res;
  }
}
