import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { faker } from '@faker-js/faker';

import { AddCourseController } from '@/courses/infrastructure/controllers/add-course-controller';

import { CommandStub } from '#/courses/stubs/command-stub';

describe('AddCourseController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new AddCourseController(new CommandStub());
    const params = { name: faker.name.fullName() };

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new AddCourseController(new CommandStub('InternalServerError'));
    const params = { name: faker.name.fullName() };

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
