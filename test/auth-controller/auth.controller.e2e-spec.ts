import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/auth';

describe('AgroinsumoController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection | void;
  const userRegister = {
    email: 't@hotmail.com',
    password: 'TomasShanahan1',
    fullName: 'Tomas Shanahan',
    team: 'Telecomunicaciones',
  };
  const userRegisterAdmin = {
    email: 'admin@hotmail.com',
    rol: ['admin'],
    password: 'TomasShanahan1',
    fullName: 'Tomas Shanahan',
    team: 'Telecomunicaciones',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = await _getConnection();
  });

  beforeEach(async () => {
    await clearDB(connection);
  });

  afterAll((done) => {
    app.close();
    done();
  });

  it('/register (POST)', async () => {
    const register = await request(app.getHttpServer()).post(`${url}/register`).send(userRegister).expect(201);

    expect(JSON.parse(register.text).email).toBe(userRegister.email);
    expect(JSON.parse(register.text)).toHaveProperty('id');
    expect(JSON.parse(register.text)).toHaveProperty('token');
  });

  it('/login (POST)', async () => {
    const userLogin = {
      email: 't@hotmail.com',
      password: 'TomasShanahan1',
    };

    const register = await request(app.getHttpServer()).post(`${url}/register`).send(userRegister).expect(201);
    const login = await request(app.getHttpServer()).post(`${url}/login`).send(userLogin).expect(201);

    // REGISTER
    expect(JSON.parse(register.text).email).toBe(userRegister.email);
    expect(JSON.parse(register.text)).toHaveProperty('id');
    expect(JSON.parse(register.text)).toHaveProperty('token');
    // LOGIN
    expect(JSON.parse(login.text).email).toBe(userLogin.email);
    expect(JSON.parse(login.text)).toHaveProperty('rol');
    expect(JSON.parse(login.text)).toHaveProperty('team');
    expect(JSON.parse(login.text)).toHaveProperty('token');
    expect(JSON.parse(login.text)).toHaveProperty('cloudinaryInfo');
    expect(JSON.parse(login.text).cloudinaryInfo).toHaveProperty('timestamp');
    expect(JSON.parse(login.text).cloudinaryInfo).toHaveProperty('signature');
  });

  it('/check-auth-status (Get)', async () => {
    const register = await request(app.getHttpServer()).post(`${url}/register`).send(userRegister).expect(201);
    const token = JSON.parse(register.text).token;

    const check_auth_status = await request(app.getHttpServer())
      .get(`${url}/check-auth-status`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // REGISTER
    expect(JSON.parse(register.text).email).toBe(userRegister.email);
    expect(JSON.parse(register.text)).toHaveProperty('id');
    expect(JSON.parse(register.text)).toHaveProperty('token');
    // CHECK_AUTH_STATUS
    expect(JSON.parse(check_auth_status.text).email).toBe(userRegister.email);
    expect(JSON.parse(check_auth_status.text)).toHaveProperty('password');
    expect(JSON.parse(check_auth_status.text)).toHaveProperty('fullName');
    expect(JSON.parse(check_auth_status.text)).toHaveProperty('rol');
    expect(JSON.parse(check_auth_status.text)).toHaveProperty('team');
    expect(JSON.parse(check_auth_status.text)).toHaveProperty('token');
  });

  it('/user-form (Get)', async () => {
    const register = await request(app.getHttpServer()).post(`${url}/register`).send(userRegister).expect(201);
    const token = JSON.parse(register.text).token;
    const funcionamientoAP = 'Testing /user-form e2e FuncionamientoAP';

    await request(app.getHttpServer())
      .post(`/agroinsumos`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAP,
      });
    const user_form = await request(app.getHttpServer())
      .get(`${url}/user-form`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // REGISTER
    expect(JSON.parse(register.text).email).toBe(userRegister.email);
    expect(JSON.parse(register.text)).toHaveProperty('id');
    expect(JSON.parse(register.text)).toHaveProperty('token');
    // USER_FORM
    expect(JSON.parse(user_form.text)).toHaveProperty('agroinsumos');
    expect(JSON.parse(user_form.text).agroinsumos.FuncionamientoAP).toBe(funcionamientoAP);
    // USER
    expect(JSON.parse(user_form.text).agroinsumos.user.email).toBe(userRegister.email);
    expect(JSON.parse(user_form.text).agroinsumos.user).toHaveProperty('password');
    expect(JSON.parse(user_form.text).agroinsumos.user).toHaveProperty('fullName');
    expect(JSON.parse(user_form.text).agroinsumos.user).toHaveProperty('rol');
    expect(JSON.parse(user_form.text).agroinsumos.user).toHaveProperty('team');
  });

  it('/get-all-information (Get)', async () => {
    const register = await request(app.getHttpServer()).post(`${url}/register`).send(userRegister).expect(201);
    const registerAdmin = await request(app.getHttpServer())
      .post(`${url}/register`)
      .send(userRegisterAdmin)
      .expect(201);

    const adminToken = JSON.parse(registerAdmin.text).token;
    const token = JSON.parse(register.text).token;
    const funcionamientoAP = 'Testing /get-all-information e2e FuncionamientoAP';
    const funcionamientoAP2 = 'Testing 2 /get-all-information e2e FuncionamientoAP';

    await request(app.getHttpServer())
      .post(`/agroinsumos`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAP,
      });
    await request(app.getHttpServer())
      .post(`/agroinsumos`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAP2,
      });
    const admin_form = await request(app.getHttpServer())
      .get(`${url}/get-all-information`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    // agroinsumos
    expect(JSON.parse(admin_form.text)).toHaveProperty('agroinsumos');
    expect(JSON.parse(admin_form.text).agroinsumos).toHaveLength(2);
    // balanza
    expect(JSON.parse(admin_form.text)).toHaveProperty('balanza');
    expect(JSON.parse(admin_form.text).balanza).toHaveLength(0);
    // camaras
    expect(JSON.parse(admin_form.text)).toHaveProperty('camaras');
    expect(JSON.parse(admin_form.text).camaras).toHaveLength(0);
    // CASA-PRINCIPAL
    expect(JSON.parse(admin_form.text)).toHaveProperty('casaPrincipal');
    expect(JSON.parse(admin_form.text).casaPrincipal).toHaveLength(0);
    // EX-AGROINSUMO
    expect(JSON.parse(admin_form.text)).toHaveProperty('exAgroinsumo');
    expect(JSON.parse(admin_form.text).exAgroinsumo).toHaveLength(0);
    // HANGAR
    expect(JSON.parse(admin_form.text)).toHaveProperty('hangar');
    expect(JSON.parse(admin_form.text).hangar).toHaveLength(0);
    // HANGAR-OFICINA
    expect(JSON.parse(admin_form.text)).toHaveProperty('hangarOficina');
    expect(JSON.parse(admin_form.text).hangarOficina).toHaveLength(0);
    // TALLER
    expect(JSON.parse(admin_form.text)).toHaveProperty('taller');
    expect(JSON.parse(admin_form.text).taller).toHaveLength(0);
  });
});
