import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/agroinsumos';

describe('AgroinsumoController (e2e)', () => {
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
    app.close();
    done();
  });

  it('/agroinsumos (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/agroinsumos/:id (GET)', async () => {
    const funcionamientoAP = 'Testing FuncionamientoAP';

    const agroinsumo = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAP,
      });

    const getAgroinsumoById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(agroinsumo.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getAgroinsumoById.text).FuncionamientoAP).toBe(funcionamientoAP);
    expect(JSON.parse(getAgroinsumoById.text).user.id).toBe(user.id);
    expect(JSON.parse(getAgroinsumoById.text).user.email).toBe(user.email);
  });

  it('/agroinsumos (POST)', async () => {
    const funcionamientoAP = 'Testing FuncionamientoAP';

    const res = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAP,
      })
      .expect(201);

    expect(JSON.parse(res.text).FuncionamientoAP).toBe(funcionamientoAP);
    expect(JSON.parse(res.text).user.id).toBe(user.id);
    expect(JSON.parse(res.text).user.email).toBe(user.email);
  });

  it('/agroinsumos/:id (PATCH)', async () => {
    const funcionamientoAP = 'Testing FuncionamientoAP';
    const funcionamientoAPUPatch = 'Update FuncionamientoAP';

    const agroinsumo = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAP,
      });

    const patchAgroinsumoById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(agroinsumo.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        FuncionamientoAP: funcionamientoAPUPatch,
      })
      .expect(200);

    expect(JSON.parse(agroinsumo.text).FuncionamientoAP).toBe(funcionamientoAP);
    expect(JSON.parse(patchAgroinsumoById.text).FuncionamientoAP).toBe(funcionamientoAPUPatch);
  });
});
