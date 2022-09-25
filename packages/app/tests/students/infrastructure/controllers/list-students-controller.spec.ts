import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { ListStudentsController } from '@/students/infrastructure/controllers/list-students-controller';

import { CommandStub } from '#/students/stubs/command-stub';

describe('ListStudentsController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new ListStudentsController(new CommandStub());

    // // when
    const response = await controller.list(createResponse()) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give

    const controller = new ListStudentsController(new CommandStub('InternalServerError'));

    // // when
    const response = await controller.list(createResponse()) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
