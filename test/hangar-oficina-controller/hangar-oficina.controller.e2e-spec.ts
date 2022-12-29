import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/hangar-oficina';

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
  const hangarOficina = {
    FuncionamientoTelefono: 'Hangar FuncionamientoTelefono:',
    LimpiarPC: 'Hangar LimpiarPC:',
    AcomodarCables: 'Hangar AcomodarCables:',
  };
  const hangarOficinaPatch = {
    FuncionamientoTelefono: 'PATCH Hangar FuncionamientoTelefono:',
    LimpiarPC: 'PATCH Hangar LimpiarPC:',
    AcomodarCables: 'PATCH Hangar AcomodarCables:',
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

  it('/hangar-oficina (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/hangar-oficina/:id (GET)', async () => {
    const newHangarOficina = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangarOficina);

    const getHangarById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newHangarOficina.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getHangarById.text).FuncionamientoTelefono).toBe(hangarOficina.FuncionamientoTelefono);
    expect(JSON.parse(getHangarById.text).LimpiarPC).toBe(hangarOficina.LimpiarPC);
    expect(JSON.parse(getHangarById.text).AcomodarCables).toBe(hangarOficina.AcomodarCables);

    expect(JSON.parse(getHangarById.text).user.id).toBe(user.id);
    expect(JSON.parse(getHangarById.text).user.email).toBe(user.email);
  });

  it('/hangar-oficina (POST)', async () => {
    const newHangarOficina = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangarOficina)
      .expect(201);

    expect(JSON.parse(newHangarOficina.text).FuncionamientoTelefono).toBe(hangarOficina.FuncionamientoTelefono);
    expect(JSON.parse(newHangarOficina.text).LimpiarPC).toBe(hangarOficina.LimpiarPC);
    expect(JSON.parse(newHangarOficina.text).AcomodarCables).toBe(hangarOficina.AcomodarCables);
  });

  it('/hangar-oficina/:id (PATCH)', async () => {
    const newHangarOficina = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangarOficina)
      .expect(201);

    const patchHangarOficinaById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newHangarOficina.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(hangarOficinaPatch)
      .expect(200);

    expect(JSON.parse(patchHangarOficinaById.text).FuncionamientoTelefono).toBe(
      hangarOficinaPatch.FuncionamientoTelefono,
    );
    expect(JSON.parse(patchHangarOficinaById.text).LimpiarPC).toBe(hangarOficinaPatch.LimpiarPC);
    expect(JSON.parse(patchHangarOficinaById.text).AcomodarCables).toBe(hangarOficinaPatch.AcomodarCables);
  });
});
