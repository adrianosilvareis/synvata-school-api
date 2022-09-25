import { Student } from '@/students/domain/entities/student';

export abstract class ListStudentsRepository {
  abstract list(): Promise<Student[]>
}
