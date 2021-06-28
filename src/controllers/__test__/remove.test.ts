import request from 'supertest';
import faker from 'faker';
import { app } from '../../app';

const TOKEN = 'XbPfbIHMI6arZ3Y922Bh';
const http = request(app);

describe('DELETE /acronym/:code', () => {

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
      .delete(`/acronym/${acronym.code}`)
      .send()
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
      .delete(`/acronym/${acronym.code}`)
      .set('Authorization', faker.random.word())
      .send()
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
      .delete(`/acronym/${faker.lorem.word()}`)
      .set('Authorization', TOKEN)
      .send()
      .expect(400);
  });

  test('return 200 if successfully delete', async () => {
    const code = faker.lorem.word();
    const acronym = {
      code,
      description: faker.lorem.sentence()
    }
    await http.post('/acronym')
      .send(acronym);

    await http
      .delete(`/acronym/${code}`)
      .set('Authorization', TOKEN)
      .send()
      .expect(200);
  });

})