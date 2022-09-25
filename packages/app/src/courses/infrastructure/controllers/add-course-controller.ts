import {
  JsonController, Res, Post, Body,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { AddCourseCommand, AddCourseParams } from '@/courses/domain/use-cases/add-course-command';

@injectable()
@JsonController()
export class AddCourseController {
  constructor(
    @inject(AddCourseCommand) private readonly addCourseCommand: Commands<AddCourseParams>,
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

  @Post('/courses')
  public async add(@Res() res: Response, @Body() body: AddCourseParams): Promise<Response> {
    this.addCourseCommand.on('InternalServerError', this.onError(res));
    this.addCourseCommand.on('Success', this.onSuccess(res));

    await this.addCourseCommand.execute(body);
    return res;
  }
}
