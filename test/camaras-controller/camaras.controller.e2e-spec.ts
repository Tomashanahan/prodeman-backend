import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/camaras';

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
  const camaras = {
    ChequearVisualizacion: 'Camaras RackPrincipalLimpieza',
  };
  const camaraPatch = {
    ChequearVisualizacion: 'PATCH Camaras RackPrincipalLimpieza',
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
    app.close();
    done();
  });

  it('/camaras (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/camaras/:id (GET)', async () => {
    const newCamara = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(camaras);

    const getCamaraById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newCamara.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getCamaraById.text).ChequearVisualizacion).toBe(camaras.ChequearVisualizacion);

    expect(JSON.parse(getCamaraById.text).user.id).toBe(user.id);
    expect(JSON.parse(getCamaraById.text).user.email).toBe(user.email);
  });

  it('/camaras (POST)', async () => {
    const newCamara = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(camaras)
      .expect(201);

    expect(JSON.parse(newCamara.text).ChequearVisualizacion).toBe(camaras.ChequearVisualizacion);
  });

  it('/camaras/:id (PATCH)', async () => {
    const newCamara = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(camaras)
      .expect(201);

    const patchCamaraById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newCamara.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(camaraPatch)
      .expect(200);

    expect(JSON.parse(patchCamaraById.text).ChequearVisualizacion).toBe(camaraPatch.ChequearVisualizacion);
  });
});
