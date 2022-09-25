import { Builder } from '@libs/entity-builder';
import { faker } from '@faker-js/faker';

import { Student } from '@/students/domain/entities/student';

export class StudentBuilder extends Builder<Student, StudentBuilder> {
  public constructor() {
    super(StudentBuilder);
  }

  protected buildDefault(): Student {
    return new Student(
      faker.datatype.uuid(),
      faker.name.fullName(),
      faker.internet.email(),
    );
  }
}
