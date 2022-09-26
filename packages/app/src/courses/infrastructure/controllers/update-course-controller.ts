import {
  JsonController, Res, Body, Put, Param,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { UpdateCourseCommand } from '@/courses/domain/use-cases/update-course-command';
import { Course } from '@/courses/domain/entities/course';

@injectable()
@JsonController()
export class UpdateCourseController {
  constructor(
    @inject(UpdateCourseCommand) private readonly updateCourseCommand: Commands<Course>,
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

  @Put('/courses/:id')
  public async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() params: Course,
  ): Promise<Response> {
    this.updateCourseCommand.on('InternalServerError', this.onError(res));
    this.updateCourseCommand.on('NotFoundError', this.onNotFound(res));
    this.updateCourseCommand.on('Success', this.onSuccess(res));

    params.id = id;

    await this.updateCourseCommand.execute(params);
    return res;
  }
}
