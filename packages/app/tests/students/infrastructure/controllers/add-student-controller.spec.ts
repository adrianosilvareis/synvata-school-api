import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { AddStudentController } from '@/students/infrastructure/controllers/add-student-controller';

import { StudentBuilder } from '#/students/builders/student-builder';
import { CommandStub } from '#/students/stubs/command-stub';

describe('AddStudentController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new AddStudentController(new CommandStub());
    const params = new StudentBuilder().build();

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new AddStudentController(new CommandStub('InternalServerError'));
    const params = new StudentBuilder().build();

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
