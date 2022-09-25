import { Builder } from '@libs/entity-builder';
import { faker } from '@faker-js/faker';

import { Course } from '@/courses/domain/entities/course';

export class CourseBuilder extends Builder<Course, CourseBuilder> {
  public constructor() {
    super(CourseBuilder);
  }

  protected buildDefault(): Course {
    return new Course(
      faker.datatype.uuid(),
      faker.name.fullName(),
    );
  }
}
