import { Student } from '@/students/domain/entities/student';

export abstract class GetStudentRepository {
  abstract get(id: string): Promise<Student>
}
