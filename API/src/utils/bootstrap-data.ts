import dayjs from 'dayjs';
import * as argon2 from 'argon2';

import { Logger } from '@nestjs/common';

import { Role } from 'src/app/roles/entities/role.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Teacher } from 'src/app/teachers/entities/teacher.entity';
import { Student } from 'src/app/students/entities/student.entity';

import { Level } from 'src/app/levels/entities/level.entity';
import { Unit } from 'src/app/units/entities/unit.entity';
import { Lesson } from 'src/app/lessons/entities/lesson.entity';

import { Plan } from 'src/app/plans/entities/plan.entity';
import { Subscription } from 'src/app/subscriptions/entities/subscription.entity';

import { Post } from 'src/app/posts/entities/post.entity';
import { Tag } from 'src/app/tags/entities/tag.entity';
import { Comment } from 'src/app/comments/entities/comment.entity';

import { mainImage1, mainImage2, mainImage3 } from './staticImages';

const logger = new Logger('Boostrap');
const description = 'Lorem ipsum dolor sit amet magna aliqua';

export async function createRoles() {
  const roles = await Role.find();

  if (roles.length === 0) {
    try {
      const new_roles = [
        'ADMINISTRADOR',
        'PROFESOR',
        'ESTUDIANTE',
        'CEO',
        'COORDINADOR',
      ].map((item) => {
        const rol_db = new Role();
        rol_db.name = item;
        rol_db.description = description;
        return rol_db;
      });

      await Role.save(new_roles);
      logger.warn('Roles creados');
    } catch (error) {
      logger.error('Roles', error);
    }
  }
}

export async function createAdmin() {
  const adminExists = await User.findOne({
    where: { email: 'admin@gmail.com' },
  });

  if (!adminExists) {
    try {
      const role = new Role();
      role.name = 'ADMINISTRADOR';

      const hashedPassword = await argon2.hash('123');

      const new_admin = new User();

      new_admin.firstName = 'Accelerate';
      new_admin.lastName = 'Ed';
      new_admin.phone = '+529515158556';
      new_admin.address =
        'Alianza 205A interior 4 Jalatlaco, Oaxaca de Juárez, Oaxaca';
      new_admin.dateOfBirth = new Date().toISOString();
      new_admin.email = 'admin@gmail.com';
      new_admin.password = hashedPassword;
      new_admin.role = role;
      new_admin.verified = true;

      await User.save(new_admin);
      logger.warn('Administrador creado');
    } catch (error) {
      logger.error('Admin', error);
    }
  }
}

export async function createCoordinator() {
  const adminExists = await User.findOne({
    where: { email: 'coordi@gmail.com' },
  });

  if (!adminExists) {
    try {
      const role = new Role();
      role.name = 'COORDINADOR';

      const hashedPassword = await argon2.hash('123');

      const new_coordi = new User();

      new_coordi.firstName = 'Raúl';
      new_coordi.lastName = 'Rodríguez';
      new_coordi.phone = '+529515158556';
      new_coordi.address =
        'Alianza 205A interior 4 Jalatlaco, Oaxaca de Juárez, Oaxaca';
      new_coordi.dateOfBirth = new Date().toISOString();
      new_coordi.email = 'coordi@gmail.com';
      new_coordi.password = hashedPassword;
      new_coordi.role = role;
      new_coordi.verified = true;

      await User.save(new_coordi);
      logger.warn('Coordinador creado');
    } catch (error) {
      logger.error('Coordinador', error);
    }
  }
}

export async function createLevels() {
  const levelOneExists = await Level.findOne({ where: { name: 'A1' } });
  if (!levelOneExists) {
    try {
      const levelsRepository = Level.getRepository();
      const unitRepository = Unit.getRepository();

      const units = [1, 2, 3].map((item) => {
        const unit = new Unit();
        unit.name = 'Unidad ' + item;
        unit.lessons = [1, 2, 3].map((value) => {
          const lesson = new Lesson();

          lesson.name = `Clase ${item}.${value}`;
          lesson.description = `Clase ${item}.${value} Hoy aprenderás los verbos to be`;
          lesson.teacherNotes = `Clase ${item}.${value} ENSEÑALE BIEN WEY`;
          lesson.studentNotes = `Clase ${item}.${value} Aprende con los mejores profesores`;
          lesson.teacherFiles = [
            {
              fileName: 'doomcheats.txt',
              fileUrl: '0a803956-30bd-4049-886b-ef8c5beb2e63-doomcheats.txt',
            },
          ];
          lesson.teacherLinks = ['https://pomodorotimer.online/es/'];
          lesson.studentFiles = [
            {
              fileName: 'doomcheats.txt',
              fileUrl: '0a803956-30bd-4049-886b-ef8c5beb2e63-doomcheats.txt',
            },
          ];
          lesson.studentLinks = ['https://pomodorotimer.online/es/'];
          lesson.fromSessionNumber = 1;
          lesson.toSessionNumber = value;

          return lesson;
        });

        return unit;
      });

      const unitResponse = await unitRepository.save(units);

      const levels = [
        {
          name: 'A1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          units: [unitResponse[0]],
        },
        {
          name: 'A2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          units: [unitResponse[1]],
        },
        {
          name: 'A3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
          units: [unitResponse[2]],
        },
      ];

      await levelsRepository.save(levels);
      logger.warn('Niveles creados');
    } catch (error) {
      logger.error('Niveles', error);
    }
  }
}

export async function createTeachers() {
  const teacherExists = await Teacher.findOne({
    where: { user: { email: 'teacher1@gmail.com' } },
  });

  if (!teacherExists) {
    try {
      const pwd = await argon2.hash('123');
      const levels = await Level.find();
      const role = await Role.findOneBy({ name: 'PROFESOR' });
      const days = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ];

      const persons = [
        {
          firstName: 'Leanne',
          lastName: 'Graham',
          phone: '+17707368045',
          address: 'Kulas Light Apt. 556, Gwenborough',
        },
        {
          firstName: 'Chelsey',
          lastName: 'Dietrich',
          phone: '+17707368031',
          address: 'Skiles Walks Suite 351, Roscoeview',
        },
        {
          firstName: 'Clementine',
          lastName: 'Bauch',
          phone: '+17707364447',
          address: 'Douglas Extension Suite 847, McKenziehaven',
        },
      ];

      const teachers = persons.map((person, index) => {
        const userTeacher = new User();
        userTeacher.firstName = person.firstName;
        userTeacher.lastName = person.lastName;
        userTeacher.phone = person.phone;
        userTeacher.address = person.address;
        userTeacher.dateOfBirth = new Date().toISOString();
        userTeacher.email = `teacher${index}@gmail.com`;
        userTeacher.password = pwd;
        userTeacher.role = role;
        userTeacher.verified = true;

        const teacher = new Teacher();
        teacher.user = userTeacher;
        teacher.levels = levels;
        teacher.license = '12345678';
        teacher.schedule = [
          ...new Set([...Array(15)].map((_) => ~~(Math.random() * 6))),
        ]
          .slice(0, 4)
          .map((day) => {
            return {
              day: days[day],
              startHour: `${index + 5}:00:00 AM`,
              endHour: `${index + 5}:00:00 PM`,
            };
          });

        return teacher;
      });

      await Teacher.save(teachers);
      logger.warn('Profesores creados');
    } catch (error) {
      logger.error('Profesores', error);
    }
  }
}

export async function createStudents() {
  const studentExists = await Student.findOne({
    where: { user: { email: 'student1@gmail.com' } },
  });

  if (!studentExists) {
    try {
      const pwd = await argon2.hash('123');
      const levels = await Level.find();
      const role = await Role.findOneBy({ name: 'ESTUDIANTE' });

      const persons = [
        {
          firstName: 'Kurtis',
          lastName: 'Weissnat',
          phone: '+17706761324',
          address: 'Rex Trail Suite 280, Howemouth',
        },
        {
          firstName: 'Nicholas',
          lastName: 'Runolfsdottir V',
          phone: '+5864936943',
          address: 'Ellsworth Summit Suite 729, Aliyaview',
        },
        {
          firstName: 'Glenna',
          lastName: 'Reichert',
          phone: '+17707667947',
          address: 'Dayna Park Suite 449, Bartholomebury',
        },
        {
          firstName: 'Clementine',
          lastName: 'DuBuque',
          phone: '+17704838042',
          address: 'Kattie Turnpike Suite 198, Lebsackbury',
        },
        {
          firstName: 'Ervin',
          lastName: 'Howell',
          phone: '+17702659342',
          address: 'Victor Plains Suite 879, Wisokyburgh',
        },
        {
          firstName: 'John',
          lastName: 'Jane',
          phone: '+17703560231',
          address: 'Alabama Street Suite 609, Ohio',
        },
      ];

      const students = persons.map((person, index) => {
        const level = levels[Math.floor(Math.random() * levels.length)];

        const userStudent = new User();
        userStudent.firstName = person.firstName;
        userStudent.lastName = person.lastName;
        userStudent.phone = person.phone;
        userStudent.address = person.address;
        userStudent.dateOfBirth = new Date().toISOString();
        userStudent.email = `student${index + 1}@gmail.com`;
        userStudent.password = pwd;
        userStudent.role = role;
        userStudent.verified = true;

        const student = new Student();
        student.level = level;
        student.user = userStudent;

        return student;
      });

      await Student.save(students);
      logger.warn('Estudiantes creados');
    } catch (error) {
      logger.error('Estudiantes', error);
    }
  }
}

export async function createPlans() {
  const plansExists = await Plan.findOne({
    where: { paypalId: 'P-34196665VP085541HMRLR32I' },
  });

  if (!plansExists) {
    const plans = [
      {
        // Product Id: PROD-82829770N77559050
        name: 'Suscripción estándar',
        paypalId: 'P-34196665VP085541HMRLR32I',
        price: 200,
        description: description,
        credits: 20,
      },
      {
        // Product Id: 1683430666
        name: 'Suscripción inicial',
        paypalId: 'P-4TU95415Y09716829MRLR4FY',
        price: 100,
        description: description,
        credits: 10,
      },
    ];

    try {
      await Plan.save(plans);
      logger.warn('Planes creados');
    } catch (error) {
      logger.error('Planes', error);
    }
  }
}

export async function createSubscriptions() {
  const plan = await Plan.find({ take: 1 });
  const students = await Student.find({ relations: { subscriptions: true } });

  try {
    const subs = [];

    students.forEach(async (student) => {
      if (
        student.user.verified &&
        student.subscriptions.length === 0 &&
        student.user.email.includes('2@gmail')
      ) {
        const sub = new Subscription();
        sub.plan = plan[0];
        sub.status = true;
        sub.student = student;
        sub.paypalId = '7377368795';
        sub.start = dayjs().toISOString();
        sub.availableCredits = plan[0].credits;
        sub.expiration = dayjs().add(1, 'month').toISOString();

        subs.push(sub);
      }
    });

    if (subs.length > 0) {
      await Subscription.save(subs);
      logger.warn('Suscripciones creadas');
    }
  } catch (error) {
    logger.error('Suscripciones', error);
  }
}

export async function createTags() {
  const tagsExists = await Tag.findOne({ where: { name: 'Tag 1' } });

  if (!tagsExists) {
    try {
      const tag1 = new Tag();
      tag1.name = 'Tag 1';

      const tag2 = new Tag();
      tag2.name = 'Tag 2';

      const tag3 = new Tag();
      tag3.name = 'Tag 3';

      await Tag.save(tag1);
      await Tag.save(tag2);
      await Tag.save(tag3);

      logger.warn('Tags creados');
    } catch (error) {
      logger.error('Tags', error);
    }
  }
}

export async function createPosts() {
  const postExists = await Post.findOne({
    where: { title: 'Post de prueba numero 1' },
  });

  if (!postExists) {
    const studentRepository = Student.getRepository();
    const userRepository = User.getRepository();

    const student1 = await userRepository.findOne({
      where: { email: 'student1@gmail.com' },
    });
    const teacher2 = await userRepository.findOne({
      where: { email: 'teacher1@gmail.com' },
    });
    const admin3 = await userRepository.findOne({
      where: { email: 'admin@gmail.com' },
    });

    try {
      const tag1 = new Tag();
      tag1.name = 'Tag 1';
      tag1.id = 1;
      const tag2 = new Tag();
      tag2.name = 'Tag 2';
      tag2.id = 2;
      const tag3 = new Tag();
      tag3.id = 3;

      const post1 = new Post();
      post1.title = 'Post de prueba numero 1';
      post1.body = '<p>Posts de prueba 1</p>';
      post1.mainImage = mainImage1;
      post1.tags = [tag1, tag2];
      post1.gallery = [mainImage1, mainImage2, mainImage3];

      const post2 = new Post();
      post2.title = 'Post de prueba numero 2';
      post2.body = '<p>Post de prueba 2 </p>';
      post2.mainImage = mainImage2;
      post2.tags = [tag1, tag3];
      post2.gallery = [mainImage1, mainImage2, mainImage3];

      const post3 = new Post();
      post3.title = 'Post de prueba numero 3';
      post3.body = '<p>Post de prueba 3</p>';
      post3.mainImage = mainImage3;
      post3.tags = [tag2, tag3];
      post3.gallery = [mainImage1, mainImage2, mainImage3];

      const savedPost1 = await Post.save(post1);
      const savedPost2 = await Post.save(post2);
      const savedPost3 = await Post.save(post3);

      logger.warn('Posts creados');

      //Comentarios del post 1
      const comment1 = new Comment();
      comment1.content = 'Comentario de prueba 1';
      comment1.user = student1;
      comment1.post = savedPost1;

      const savedComment1 = await Comment.save(comment1);

      const comment2 = new Comment();
      comment2.content = 'Comentario de prueba 2 / Respuesta a comentario 1';
      comment2.user = teacher2;
      comment2.post = savedPost1;
      comment2.parentComment = savedComment1.id;

      await Comment.save(comment2);

      const comment3 = new Comment();
      comment3.content = 'Comentario de prueba 3';
      comment3.user = admin3;
      comment3.post = savedPost1;

      await Comment.save(comment3);

      //Comentarios del post 2
      const comment4 = new Comment();
      comment4.content = 'Comentario de prueba 4';
      comment4.user = student1;
      comment4.post = savedPost2;

      const savedComment4 = await Comment.save(comment4);

      const comment5 = new Comment();
      comment5.content = 'Comentario de prueba 5 / Respuesta a comentario 4';
      comment5.user = teacher2;
      comment5.post = savedPost2;
      comment5.parentComment = savedComment4.id;

      const savedComment5 = await Comment.save(comment5);

      const comment6 = new Comment();
      comment6.content = 'Comentario de prueba 6 / Respuesta a comentario 6';
      comment6.user = teacher2;
      comment6.post = savedPost2;
      comment6.parentComment = savedComment4.id;

      await Comment.save(comment6);

      const comment7 = new Comment();
      comment7.content = 'Comentario de prueba 7';
      comment7.user = admin3;
      comment7.post = savedPost2;

      await Comment.save(comment7);

      //Comentarios del post 3
      const comment8 = new Comment();
      comment8.content = 'Comentario de prueba 8';
      comment8.user = student1;
      comment8.post = savedPost3;

      await Comment.save(comment8);

      const comment9 = new Comment();
      comment9.content = 'Comentario de prueba 9';
      comment9.user = teacher2;
      comment9.post = savedPost3;

      await Comment.save(comment9);

      const comment10 = new Comment();
      comment10.content = 'Comentario de prueba 10';
      comment10.user = admin3;
      comment10.post = savedPost3;

      await Comment.save(comment10);

      logger.warn('Comentarios creados');
    } catch (error) {
      logger.error('Comentarios', error);
    }
  }
}
