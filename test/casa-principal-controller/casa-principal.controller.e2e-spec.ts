import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/casa-principal';

describe('CasaPrincipalController (e2e)', () => {
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
  const casaPrincipal = {
    RackPrincipalLimpieza: 'RackPrincipalLimpieza e2e test',
    RackPrincipalOrden: 'RackPrincipalOrden e2e test',
    FuncionamientoAP: 'FuncionamientoAP e2e test',
    FuncionamientoTelefono: 'FuncionamientoTelefono e2e test',
    UPS: 'UPS e2e test',
  };
  const casaPrincipalPatch = {
    RackPrincipalLimpieza: 'PATCH RackPrincipalLimpieza e2e test',
    RackPrincipalOrden: 'PATCH RackPrincipalOrden e2e test',
    FuncionamientoAP: 'PATCH FuncionamientoAP e2e test',
    FuncionamientoTelefono: 'PATCH FuncionamientoTelefono e2e test',
    UPS: 'PATCH UPS e2e test',
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

  it('/casa-principal (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/casa-principal/:id (GET)', async () => {
    const newCasaPrincipal = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(casaPrincipal);

    const getCasaPrincipalById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newCasaPrincipal.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getCasaPrincipalById.text).RackPrincipalLimpieza).toBe(casaPrincipal.RackPrincipalLimpieza);
    expect(JSON.parse(getCasaPrincipalById.text).RackPrincipalOrden).toBe(casaPrincipal.RackPrincipalOrden);
    expect(JSON.parse(getCasaPrincipalById.text).FuncionamientoAP).toBe(casaPrincipal.FuncionamientoAP);
    expect(JSON.parse(getCasaPrincipalById.text).FuncionamientoTelefono).toBe(casaPrincipal.FuncionamientoTelefono);
    expect(JSON.parse(getCasaPrincipalById.text).UPS).toBe(casaPrincipal.UPS);

    expect(JSON.parse(getCasaPrincipalById.text).user.id).toBe(user.id);
    expect(JSON.parse(getCasaPrincipalById.text).user.email).toBe(user.email);
  });

  it('/casa-principal (POST)', async () => {
    const newCasaPrincipal = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(casaPrincipal)
      .expect(201);

    expect(JSON.parse(newCasaPrincipal.text).RackPrincipalLimpieza).toBe(casaPrincipal.RackPrincipalLimpieza);
    expect(JSON.parse(newCasaPrincipal.text).RackPrincipalOrden).toBe(casaPrincipal.RackPrincipalOrden);
    expect(JSON.parse(newCasaPrincipal.text).FuncionamientoAP).toBe(casaPrincipal.FuncionamientoAP);
    expect(JSON.parse(newCasaPrincipal.text).FuncionamientoTelefono).toBe(casaPrincipal.FuncionamientoTelefono);
    expect(JSON.parse(newCasaPrincipal.text).UPS).toBe(casaPrincipal.UPS);
  });

  it('/casa-principal/:id (PATCH)', async () => {
    const newCasaPrincipal = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(casaPrincipal)
      .expect(201);

    const patchCamaraById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newCasaPrincipal.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(casaPrincipalPatch)
      .expect(200);

    expect(JSON.parse(patchCamaraById.text).RackPrincipalLimpieza).toBe(casaPrincipalPatch.RackPrincipalLimpieza);
    expect(JSON.parse(patchCamaraById.text).RackPrincipalOrden).toBe(casaPrincipalPatch.RackPrincipalOrden);
    expect(JSON.parse(patchCamaraById.text).FuncionamientoAP).toBe(casaPrincipalPatch.FuncionamientoAP);
    expect(JSON.parse(patchCamaraById.text).FuncionamientoTelefono).toBe(casaPrincipalPatch.FuncionamientoTelefono);
    expect(JSON.parse(patchCamaraById.text).UPS).toBe(casaPrincipalPatch.UPS);
  });
});
