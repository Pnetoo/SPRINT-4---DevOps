const request = require('supertest');
const app = require('../src/app');

describe('EcoTrack API', () => {
  test('Deve retornar status UP no health check', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });

  test('Deve retornar mensagem da API na rota principal', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe('EcoTrack API em execução');
  });
});