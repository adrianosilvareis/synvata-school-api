import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { UpdateCourseController } from '@/courses/infrastructure/controllers/update-course-controller';

import { CourseBuilder } from '#/courses/builders/course-builder';
import { CommandStub } from '#/courses/stubs/command-stub';

describe('UpdateCourseController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new UpdateCourseController(new CommandStub());
    const params = new CourseBuilder().build();

    // // when
    const response = await controller
      .update(createResponse(), params.id, params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new UpdateCourseController(new CommandStub('InternalServerError'));
    const params = new CourseBuilder().build();

    // // when
    const response = await controller
      .update(createResponse(), params.id, params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a notFound on not found error', async () => {
    // give
    const controller = new UpdateCourseController(new CommandStub('NotFoundError'));
    const params = new CourseBuilder().build();

    // // when
    const response = await controller
      .update(createResponse(), params.id, params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
