import { injectable } from 'inversify';
import { Uuid } from '@libs/uuid-lib/src/lib/uuid';

import { UpdateStudentRepository } from '@/students/domain/repositories/update-student-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { AddStudentRepository } from '@/students/domain/repositories/add-student-repository';
import { Student } from '@/students/domain/entities/student';
import { ListStudentsRepository } from '@/students/domain/repositories/list-students-repository';
import client from '@/config/database-client';
import { RemoveStudentRepository } from '@/students/domain/repositories/remove-student-repository';

@injectable()
export class PostgresStudentRepositories implements
  ListStudentsRepository,
  AddStudentRepository,
  RemoveStudentRepository,
  UpdateStudentRepository {
  async update(params: Student): Promise<Student> {
    try {
      const student = await client.svStudent.update({
        where: {
          id: params.id,
        },
        data: params,
      });
      return student;
    } catch (error) {
      throw new NotFoundError('Record to update does not exist.');
    }
  }

  async removeById(id: string): Promise<Student> {
    try {
      const student = await client.svStudent.delete({
        where: {
          id,
        },
      });
      return student;
    } catch (error) {
      throw new NotFoundError('Record to delete does not exist.');
    }
  }

  async add(params: Omit<Student, 'id'>): Promise<Student> {
    const student = await client.svStudent.create({
      data: {
        id: Uuid.generate().toString(),
        name: params.name,
        email: params.email,
      },
    });

    return student;
  }

  async list(): Promise<Student[]> {
    const list = await client.svStudent.findMany();
    return list.map((student) => new Student(student.id, student.name, student.email));
  }
}
