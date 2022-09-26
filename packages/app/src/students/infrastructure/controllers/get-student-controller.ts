import {
  JsonController, Res, Get, Param,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { GetStudentParams, GetStudentCommand } from '@/students/domain/use-cases/get-student-command';

@injectable()
@JsonController()
export class GetStudentController {
  constructor(
    @inject(GetStudentCommand) private readonly getStudentCommand: Commands<GetStudentParams>,
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

  private onNotFound(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.NOT_FOUND).json(props);
    };
  }

  @Get('/students/:id')
  public async get(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    this.getStudentCommand.on('InternalServerError', this.onError(res));
    this.getStudentCommand.on('NotFoundError', this.onNotFound(res));
    this.getStudentCommand.on('Success', this.onSuccess(res));

    await this.getStudentCommand.execute({ id });
    return res;
  }
}
