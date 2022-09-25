import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { Uuid } from '@libs/uuid-lib';

import { RemoveStudentController } from '@/students/infrastructure/controllers/remove-student-controller';

import { CommandStub } from '#/students/stubs/command-stub';

describe('RemoveStudentController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new RemoveStudentController(new CommandStub());
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new RemoveStudentController(new CommandStub('InternalServerError'));
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a notFound on not found error', async () => {
    // give
    const controller = new RemoveStudentController(new CommandStub('NotFoundError'));
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
