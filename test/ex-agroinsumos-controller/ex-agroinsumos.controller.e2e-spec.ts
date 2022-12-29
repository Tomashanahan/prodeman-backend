import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/ex-agroinsumos';

describe('ExAgroinsumoController (e2e)', () => {
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
  const exAgroinsumo = {
    RackPrincipalLimpieza: 'Ex agroinsumos RackPrincipalLimpieza',
    RackPrincipalOrden: 'Ex agroinsumos RackPrincipalOrden',
    FuncionamientoAP: 'Ex agroinsumos FuncionamientoAP',
  };
  const exAgroinsumoPatch = {
    RackPrincipalLimpieza: 'PATCH Ex agroinsumos RackPrincipalLimpieza',
    RackPrincipalOrden: 'PATCH Ex agroinsumos RackPrincipalOrden',
    FuncionamientoAP: 'PATCH Ex agroinsumos FuncionamientoAP',
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

  it('/ex-agroinsumos (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/ex-agroinsumos/:id (GET)', async () => {
    const newExAgroinsumo = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(exAgroinsumo);

    const getCasaPrincipalById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newExAgroinsumo.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getCasaPrincipalById.text).RackPrincipalLimpieza).toBe(exAgroinsumo.RackPrincipalLimpieza);
    expect(JSON.parse(getCasaPrincipalById.text).RackPrincipalOrden).toBe(exAgroinsumo.RackPrincipalOrden);
    expect(JSON.parse(getCasaPrincipalById.text).FuncionamientoAP).toBe(exAgroinsumo.FuncionamientoAP);

    expect(JSON.parse(getCasaPrincipalById.text).user.id).toBe(user.id);
    expect(JSON.parse(getCasaPrincipalById.text).user.email).toBe(user.email);
  });

  it('/ex-agroinsumos (POST)', async () => {
    const newExAgroinsumo = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(exAgroinsumo)
      .expect(201);

    expect(JSON.parse(newExAgroinsumo.text).RackPrincipalLimpieza).toBe(exAgroinsumo.RackPrincipalLimpieza);
    expect(JSON.parse(newExAgroinsumo.text).RackPrincipalOrden).toBe(exAgroinsumo.RackPrincipalOrden);
    expect(JSON.parse(newExAgroinsumo.text).FuncionamientoAP).toBe(exAgroinsumo.FuncionamientoAP);
  });

  it('/ex-agroinsumos/:id (PATCH)', async () => {
    const newExAgroinsumo = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(exAgroinsumo)
      .expect(201);

    const patchExAgroinsumoById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newExAgroinsumo.text).preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(exAgroinsumoPatch)
      .expect(200);

    expect(JSON.parse(patchExAgroinsumoById.text).RackPrincipalLimpieza).toBe(exAgroinsumoPatch.RackPrincipalLimpieza);
    expect(JSON.parse(patchExAgroinsumoById.text).RackPrincipalOrden).toBe(exAgroinsumoPatch.RackPrincipalOrden);
    expect(JSON.parse(patchExAgroinsumoById.text).FuncionamientoAP).toBe(exAgroinsumoPatch.FuncionamientoAP);
  });
});
