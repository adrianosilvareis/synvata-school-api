import { Student } from '@/students/domain/entities/student';

export abstract class ListStudentsByCourseIdRepository {
  abstract listByCourseId(courseId: string): Promise<Student[]>
}
