import request from 'supertest';
import faker from 'faker';
import { app } from '../../app';

const TOKEN = 'XbPfbIHMI6arZ3Y922Bh';
const http = request(app);

describe('PUT /acronym/:code', () => {

  beforeAll(() => {
    process.env.AUTH_TOKEN = TOKEN;
  })

  test('return 403 if no authorization token', async () => {
    const acronym = {
      code: faker.lorem.word(),
      description: faker.lorem.sentence()
    }
    await http.post('/acronym')
      .send(acronym);

    await http
      .put(`/acronym/${acronym.code}`)
      .send({
        description: faker.lorem.sentence()
      })
      .expect(403);
  });

  test('return 403 if a wrong authorization token is provided', async () => {
    const acronym = {
      code: faker.lorem.word(),
      description: faker.lorem.sentence()
    }
    await http.post('/acronym')
      .send(acronym);

    await http
      .put(`/acronym/${acronym.code}`)
      .set('Authorization', faker.random.word())
      .send({
        description: faker.lorem.sentence()
      })
      .expect(403);
  });

  test('return 404 if code does not exist', async () => {    
    const acronym = {
      code: faker.lorem.word(),
      description: faker.lorem.sentence()
    }
    await http.post('/acronym')
      .send(acronym);

    await http
      .put(`/acronym/${faker.lorem.word()}`)
      .set('Authorization', TOKEN)
      .send({
        description: faker.lorem.sentence()
      })
      .expect(400);
  });

  test('return 200 if successfully put', async () => {
    const code = faker.lorem.word();
    const acronym = {
      code,
      description: faker.lorem.sentence()
    }
    await http.post('/acronym')
      .send(acronym);

    const description = faker.lorem.sentence();

    await http
      .put(`/acronym/${code}`)
      .set('Authorization', TOKEN)
      .send({ description })
      .expect(200);

    const response = await http.get(`/acronym/${code}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.code).toEqual(code);
    expect(response.body.description).toEqual(description);
  });

})