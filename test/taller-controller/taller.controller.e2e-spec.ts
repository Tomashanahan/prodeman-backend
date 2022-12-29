import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/taller';

describe('HangarController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection | void;
  let user: {
    id: string;
    email: string;
    fullName: string;
    rol: string[];
    team: 'Microinformatica' | 'Telecomunicaciones';
  };
  let token: string;
  const taller = {
    RackPrincipalLimpieza: 'RackPrincipalLimpieza testing',
    RackPrincipalOrden: 'RackPrincipalOrden testing',
    FuncionamientoTelefono: 'FuncionamientoTelefono testing',
    FuncionamientoAP: 'FuncionamientoAP testing',
  };
  const tallerPatch = {
    RackPrincipalLimpieza: 'PATCH RackPrincipalLimpieza testing',
    RackPrincipalOrden: 'PATCH RackPrincipalOrden testing',
    FuncionamientoTelefono: 'PATCH FuncionamientoTelefono testing',
    FuncionamientoAP: 'PATCH FuncionamientoAP testing',
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

    await request(app.getHttpServer()).post('/auth/register').send({
      email: 't@hotmail.com',
      password: 'TomasShanahan1',
      fullName: 'Tomas Shanahan',
      team: 'Telecomunicaciones',
    });
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 't@hotmail.com',
        password: 'TomasShanahan1',
        fullName: 'Tomas Shanahan',
        team: 'Telecomunicaciones',
      })
      .expect((res) => {
        user = {
          id: JSON.parse(res.text).id,
          email: JSON.parse(res.text).email,
          fullName: JSON.parse(res.text).fullName,
          rol: JSON.parse(res.text).rol,
          team: JSON.parse(res.text).team,
        };
        token = JSON.parse(res.text).token;
      });
  });

  afterAll((done) => {
    if (connection) {
      connection.close().then(() => app.close());
    }
    done();
  });

  it('/taller (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/taller/:id (GET)', async () => {
    const newTaller = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(taller);

    const getTallerById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newTaller.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getTallerById.text).RackPrincipalLimpieza).toBe(taller.RackPrincipalLimpieza);
    expect(JSON.parse(getTallerById.text).RackPrincipalOrden).toBe(taller.RackPrincipalOrden);
    expect(JSON.parse(getTallerById.text).FuncionamientoTelefono).toBe(taller.FuncionamientoTelefono);
    expect(JSON.parse(getTallerById.text).FuncionamientoAP).toBe(taller.FuncionamientoAP);

    expect(JSON.parse(getTallerById.text).user.id).toBe(user.id);
    expect(JSON.parse(getTallerById.text).user.email).toBe(user.email);
  });

  it('/taller (POST)', async () => {
    const newTaller = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(taller)
      .expect(201);

    expect(JSON.parse(newTaller.text).RackPrincipalLimpieza).toBe(taller.RackPrincipalLimpieza);
    expect(JSON.parse(newTaller.text).RackPrincipalOrden).toBe(taller.RackPrincipalOrden);
    expect(JSON.parse(newTaller.text).FuncionamientoTelefono).toBe(taller.FuncionamientoTelefono);
    expect(JSON.parse(newTaller.text).FuncionamientoAP).toBe(taller.FuncionamientoAP);
  });

  it('/taller/:id (PATCH)', async () => {
    const newTaller = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(taller)
      .expect(201);

    const patchHangarById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newTaller.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(tallerPatch)
      .expect(200);

    expect(JSON.parse(patchHangarById.text).RackPrincipalLimpieza).toBe(tallerPatch.RackPrincipalLimpieza);
    expect(JSON.parse(patchHangarById.text).RackPrincipalOrden).toBe(tallerPatch.RackPrincipalOrden);
    expect(JSON.parse(patchHangarById.text).FuncionamientoTelefono).toBe(tallerPatch.FuncionamientoTelefono);
    expect(JSON.parse(patchHangarById.text).FuncionamientoAP).toBe(tallerPatch.FuncionamientoAP);
  });
});
