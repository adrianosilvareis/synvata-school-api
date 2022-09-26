import { Course } from '@/courses/domain/entities/course';

export class Student {
  public constructor(
    public id: string,
    public name: string,
    public email: string,
    public courses?: Course[],
  ) { }
}
