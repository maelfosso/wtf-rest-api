import request from 'supertest';
import faker from 'faker';
import { app } from '../../app';

const http = request(app);

describe('POST /acronym', () => {
  test('return 400 when the acronym code and description are empty', async () => {
    const invalid = {
      code: '',
      description: ''
    };

    const response = await http.post('/acronym')
      .send(invalid);
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('code');     
    expect(response.body.code).toBe("VALIDATION_ERROR")
    expect(response.body.options).toHaveLength(2);
    expect(response.body.options[0].field).toBe("code");
    expect(response.body.options[1].field).toBe("description");
  });

  test('return 400 when the acronym code is empty', async () => {
    const invalid = {
      code: '',
      description: faker.lorem.paragraph()
    };

    const response = await http.post('/acronym')
      .send(invalid);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('code');     
    expect(response.body).toHaveProperty('options');
    expect(response.body.options[0].field).toBe("code");
  });

  test('return 400 when the acronym description is empty', async () => {
    const invalid = {
      code: faker.lorem.word(),
      description: ''
    };

    const response = await http.post('/acronym')
      .send(invalid);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('code'); 
    expect(response.body).toHaveProperty('options');    
    expect(response.body.options[0].field).toBe("description");
  });

  test('return 400 when the code already exists', async () => {
    const code = faker.lorem.word();

    const acronym1 = {
      code,
      description: faker.lorem.sentence()
    };

    await http.post('/acronym')
      .send(acronym1);

    const acronym2 = {
      code,
      description: faker.lorem.sentence()
    }
    const response = await http.post('/acronym')
      .send(acronym2);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('code'); 
    expect(response.body.code).toBe('ACRONYM_ALREADY_EXISTS');
  });

  test('return 201 for successful acronym creation', async () => {
    const code = faker.lorem.word();
    const description = faker.lorem.word();

    const acronym = {
      code,
      description
    }
    const response = await http.post('/acronym')
      .send(acronym);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('code'); 
    expect(response.body.code).toEqual(code);
    expect(response.body).toHaveProperty('description'); 
    expect(response.body.description).toEqual(description);
  });

});

