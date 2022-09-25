import { Student } from '@/students/domain/entities/student';

export abstract class UpdateStudentRepository {
  abstract update(student: Student): Promise<Student>
}
