import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { ListCoursesController } from '@/courses/infrastructure/controllers/list-courses-controller';

import { CommandStub } from '#/courses/stubs/command-stub';

describe('ListCoursesController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new ListCoursesController(new CommandStub());

    // // when
    const response = await controller.list(createResponse()) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give

    const controller = new ListCoursesController(new CommandStub('InternalServerError'));

    // // when
    const response = await controller.list(createResponse()) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
