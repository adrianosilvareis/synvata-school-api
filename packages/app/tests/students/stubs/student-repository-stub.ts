import { UpdateStudentRepository } from '@/students/domain/repositories/update-student-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { AddStudentRepository } from '@/students/domain/repositories/add-student-repository';
import { Student } from '@/students/domain/entities/student';
import { ListStudentsRepository } from '@/students/domain/repositories/list-students-repository';
import { AddStudentParams } from '@/students/domain/use-cases/add-student-command';
import { RemoveStudentRepository } from '@/students/domain/repositories/remove-student-repository';

export class StudentRepositoryStub implements
ListStudentsRepository,
AddStudentRepository,
RemoveStudentRepository,
UpdateStudentRepository {
  public students: Student[] = [];

  public newId: string = '';

  public callback!: () => void;

  async list(): Promise<Student[]> {
    this.callback();
    return this.students;
  }

  async add(params: AddStudentParams): Promise<Student> {
    const student = new Student(this.newId, params.name, params.email);
    this.students.push(student);

    this.callback();
    return student;
  }

  async removeById(id: string): Promise<Student> {
    const student = this.students.find((c) => c.id === id);

    if (!student) {
      throw new NotFoundError('Record to delete does not exist.');
    }

    this.students = this.students.filter((c) => c.id !== id);

    this.callback();
    return student;
  }

  async update(params: Student): Promise<Student> {
    const student = this.students.find((c) => c.id === params.id);

    if (!student) {
      throw new NotFoundError('Record to update does not exist.');
    }

    this.students = this.students.map((c) => (c.id !== params.id ? c : student));

    this.callback();
    return params;
  }
}
