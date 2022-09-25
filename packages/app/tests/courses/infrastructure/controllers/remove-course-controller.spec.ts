import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { Uuid } from '@libs/uuid-lib';

import { RemoveCourseController } from '@/courses/infrastructure/controllers/remove-course-controller';

import { RemoveCourseCommandStub } from '#/stubs/remove-course-command-stub';

describe('RemoveCourseController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new RemoveCourseController(new RemoveCourseCommandStub());
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new RemoveCourseController(new RemoveCourseCommandStub('InternalServerError'));
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a notFound on not found error', async () => {
    // give
    const controller = new RemoveCourseController(new RemoveCourseCommandStub('NotFoundError'));
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
