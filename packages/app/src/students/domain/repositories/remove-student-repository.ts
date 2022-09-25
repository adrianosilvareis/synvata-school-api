import { Student } from '@/students/domain/entities/student';

export abstract class RemoveStudentRepository {
  abstract removeById(id: string): Promise<Student>
}
