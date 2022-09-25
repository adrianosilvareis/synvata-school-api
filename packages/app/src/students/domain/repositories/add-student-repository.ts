import { Student } from '@/students/domain/entities/student';

export abstract class AddStudentRepository {
  abstract add(student: Omit<Student, 'id'>): Promise<Student>
}
