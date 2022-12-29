import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { clearDB, _getConnection } from '../helper';
import { Connection } from 'typeorm';

const url = '/balanza';

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
  const balanza = {
    RackPrincipalLimpieza: 'Balanza RackPrincipalLimpieza',
    RackPrincipalOrden: 'Balanza RackPrincipalOrden',
    LimpiarPC: 'Balanza LimpiarPC',
    FuncionamientoAP: 'Balanza FuncionamientoAP',
    UPS: 'Balanza UPS',
    FuncionamientoTelefono: 'Balanza FuncionamientoTelefono',
  };
  const balanzaPatch = {
    RackPrincipalLimpieza: 'PATCH Balanza RackPrincipalLimpieza',
    RackPrincipalOrden: 'PATCH Balanza RackPrincipalOrden',
    LimpiarPC: 'PATCH Balanza LimpiarPC',
    FuncionamientoAP: 'PATCH Balanza FuncionamientoAP',
    UPS: 'PATCH Balanza UPS',
    FuncionamientoTelefono: 'PATCH Balanza FuncionamientoTelefono',
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

  it('/balanza (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('/balanza/:id (GET)', async () => {
    const newBalanza = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(balanza);

    const getAgroinsumoById = await request(app.getHttpServer())
      .get(`${url}/${JSON.parse(newBalanza.text).Balanza.preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(JSON.parse(getAgroinsumoById.text).RackPrincipalLimpieza).toBe(balanza.RackPrincipalLimpieza);
    expect(JSON.parse(getAgroinsumoById.text).RackPrincipalOrden).toBe(balanza.RackPrincipalOrden);
    expect(JSON.parse(getAgroinsumoById.text).LimpiarPC).toBe(balanza.LimpiarPC);
    expect(JSON.parse(getAgroinsumoById.text).FuncionamientoAP).toBe(balanza.FuncionamientoAP);
    expect(JSON.parse(getAgroinsumoById.text).UPS).toBe(balanza.UPS);
    expect(JSON.parse(getAgroinsumoById.text).FuncionamientoTelefono).toBe(balanza.FuncionamientoTelefono);

    expect(JSON.parse(getAgroinsumoById.text).user.id).toBe(user.id);
    expect(JSON.parse(getAgroinsumoById.text).user.email).toBe(user.email);
  });

  it('/balanza (POST)', async () => {
    const newBalanza = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(balanza)
      .expect(201);

    expect(JSON.parse(newBalanza.text).Balanza.RackPrincipalLimpieza).toBe(balanza.RackPrincipalLimpieza);
    expect(JSON.parse(newBalanza.text).Balanza.RackPrincipalOrden).toBe(balanza.RackPrincipalOrden);
    expect(JSON.parse(newBalanza.text).Balanza.LimpiarPC).toBe(balanza.LimpiarPC);
    expect(JSON.parse(newBalanza.text).Balanza.FuncionamientoAP).toBe(balanza.FuncionamientoAP);
    expect(JSON.parse(newBalanza.text).Balanza.UPS).toBe(balanza.UPS);
    expect(JSON.parse(newBalanza.text).Balanza.FuncionamientoTelefono).toBe(balanza.FuncionamientoTelefono);
  });

  it('/balanza/:id (PATCH)', async () => {
    const newBalanza = await request(app.getHttpServer())
      .post(`${url}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(balanza)
      .expect(201);

    const patchBalanzaById = await request(app.getHttpServer())
      .patch(`${url}/${JSON.parse(newBalanza.text).Balanza.preference_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(balanzaPatch)
      .expect(200);

    expect(JSON.parse(patchBalanzaById.text).RackPrincipalLimpieza).toBe(balanzaPatch.RackPrincipalLimpieza);
    expect(JSON.parse(patchBalanzaById.text).RackPrincipalOrden).toBe(balanzaPatch.RackPrincipalOrden);
    expect(JSON.parse(patchBalanzaById.text).LimpiarPC).toBe(balanzaPatch.LimpiarPC);
    expect(JSON.parse(patchBalanzaById.text).FuncionamientoAP).toBe(balanzaPatch.FuncionamientoAP);
    expect(JSON.parse(patchBalanzaById.text).UPS).toBe(balanzaPatch.UPS);
    expect(JSON.parse(patchBalanzaById.text).FuncionamientoTelefono).toBe(balanzaPatch.FuncionamientoTelefono);
  });
});
