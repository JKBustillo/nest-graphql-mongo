import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Mutation((_returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query((_returns) => LessonType)
  getLesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((_returns) => [LessonType])
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Mutation((_returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentids } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentids);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getStudents(lesson.students);
  }
}
