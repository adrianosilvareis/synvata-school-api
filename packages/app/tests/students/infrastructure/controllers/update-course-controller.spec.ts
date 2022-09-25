import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { UpdateStudentController } from '@/students/infrastructure/controllers/update-student-controller';

import { StudentBuilder } from '#/students/builders/student-builder';
import { CommandStub } from '#/students/stubs/command-stub';

describe('UpdateStudentController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new UpdateStudentController(new CommandStub());
    const params = new StudentBuilder().build();

    // // when
    const response = await controller.update(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new UpdateStudentController(new CommandStub('InternalServerError'));
    const params = new StudentBuilder().build();

    // // when
    const response = await controller.update(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a notFound on not found error', async () => {
    // give
    const controller = new UpdateStudentController(new CommandStub('NotFoundError'));
    const params = new StudentBuilder().build();

    // // when
    const response = await controller.update(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
