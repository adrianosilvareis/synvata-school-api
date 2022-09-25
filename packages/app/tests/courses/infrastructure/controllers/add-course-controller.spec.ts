import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { faker } from '@faker-js/faker';

import { AddCourseController } from '@/courses/infrastructure/controllers/add-course-controller';

import { AddCourseCommandStub } from '#/stubs/add-course-command-stub';

describe('AddCourseController', () => {
  it('should be return a token on success', async () => {
    // give
    const controller = new AddCourseController(new AddCourseCommandStub());
    const params = { name: faker.name.fullName() };

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new AddCourseController(new AddCourseCommandStub('InternalServerError'));
    const params = { name: faker.name.fullName() };

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
