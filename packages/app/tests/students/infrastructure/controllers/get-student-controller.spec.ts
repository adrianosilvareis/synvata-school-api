import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { GetStudentController } from '@/students/infrastructure/controllers/get-student-controller';

import { CommandStub } from '#/students/stubs/command-stub';

describe('GetStudentController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new GetStudentController(new CommandStub());

    // // when
    const response = await controller.get(createResponse(), 'any_id') as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a NotFound on not found error', async () => {
    // give

    const controller = new GetStudentController(new CommandStub('NotFoundError'));

    // // when
    const response = await controller.get(createResponse(), 'any_id') as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it('should be return a error on internal server error', async () => {
    // give

    const controller = new GetStudentController(new CommandStub('InternalServerError'));

    // // when
    const response = await controller.get(createResponse(), 'any_id') as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
