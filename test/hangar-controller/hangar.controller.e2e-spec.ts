import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/hangar';

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
  const hangar = {
    RackPrincipalLimpieza: 'Hangar RackPrincipalLimpieza',
    RackPrincipalOrden: 'Hangar RackPrincipalOrden',
    FuncionamientoTelefono: 'Hangar FuncionamientoTelefono',
    FuncionamientoAP: 'Hangar FuncionamientoAP',
  };
  const hangarPatch = {
    RackPrincipalLimpieza: 'PATCH Hangar RackPrincipalLimpieza',
    RackPrincipalOrden: 'PATCH Hangar RackPrincipalOrden',
    FuncionamientoTelefono: 'PATCH Hangar FuncionamientoTelefono',
    FuncionamientoAP: 'PATCH Hangar FuncionamientoAP',
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

  it('/hangar (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/hangar/:id (GET)', async () => {
    const newHangar = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangar);

    const getHangarById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newHangar.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getHangarById.text).RackPrincipalLimpieza).toBe(hangar.RackPrincipalLimpieza);
    expect(JSON.parse(getHangarById.text).RackPrincipalOrden).toBe(hangar.RackPrincipalOrden);
    expect(JSON.parse(getHangarById.text).FuncionamientoAP).toBe(hangar.FuncionamientoAP);

    expect(JSON.parse(getHangarById.text).user.id).toBe(user.id);
    expect(JSON.parse(getHangarById.text).user.email).toBe(user.email);
  });

  it('/hangar (POST)', async () => {
    const newHangar = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangar)
      .expect(201);

    expect(JSON.parse(newHangar.text).RackPrincipalLimpieza).toBe(hangar.RackPrincipalLimpieza);
    expect(JSON.parse(newHangar.text).RackPrincipalOrden).toBe(hangar.RackPrincipalOrden);
    expect(JSON.parse(newHangar.text).FuncionamientoAP).toBe(hangar.FuncionamientoAP);
  });

  it('/hangar/:id (PATCH)', async () => {
    const newHangar = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangar)
      .expect(201);

    const patchHangarById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newHangar.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangarPatch)
      .expect(200);

    expect(JSON.parse(patchHangarById.text).RackPrincipalLimpieza).toBe(hangarPatch.RackPrincipalLimpieza);
    expect(JSON.parse(patchHangarById.text).RackPrincipalOrden).toBe(hangarPatch.RackPrincipalOrden);
    expect(JSON.parse(patchHangarById.text).FuncionamientoAP).toBe(hangarPatch.FuncionamientoAP);
  });
});
