import request from 'supertest';
import faker from 'faker';
import { app } from '../../app';

const http = request(app);

describe('GET /acronym', () => {

  test('return 200 for successful acronym found', async () => {
    const code = faker.lorem.word();
    const description = faker.lorem.word();

    const acronym = {
      code,
      description
    }
    await http.post('/acronym')
      .send(acronym)
      .expect(201);

    const response = await http.get(`/acronym/${code}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1)
    expect(response.body[0].code).toEqual(code);
    expect(response.body[0].description).toEqual(description);
  });

});

