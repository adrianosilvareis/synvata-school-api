import { injectable } from 'inversify';
import { Uuid } from '@libs/uuid-lib/src/lib/uuid';

import { ListStudentsByCourseIdRepository } from '@/students/domain/repositories/list-students-by-course-id-repository';
import { GetStudentRepository } from '@/students/domain/repositories/get-student-repository';
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
  UpdateStudentRepository,
  GetStudentRepository,
  ListStudentsByCourseIdRepository {
  async update(params: Student): Promise<Student> {
    try {
      const student = await client.svStudent.update({
        where: {
          id: params.id,
        },
        data: {
          id: params.id,
          name: params.name,
          email: params.email,
          courses: {
            set: params.courses?.map(({ id }) => ({ id })),
          },
        },
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
        courses: {
          connect: params.courses?.map(({ id }) => ({ id })),
        },
      },
    });
    return student;
  }

  async list(): Promise<Student[]> {
    const list = await client.svStudent.findMany();
    return list;
  }

  async listByCourseId(courseId: string): Promise<Student[]> {
    const list = await client.svStudent.findMany({
      where: {
        courses: {
          some: {
            id: courseId,
          },
        },
      },
    });
    return list;
  }

  async get(id: string): Promise<Student> {
    const student = await client.svStudent.findFirst({
      where: {
        id,
      },
      include: {
        courses: true,
      },
    });

    if (!student) {
      throw new NotFoundError('Record not exist.');
    }

    return student;
  }
}
