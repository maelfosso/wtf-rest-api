import request from 'supertest';
import { app } from '../../app';

const http = request(app);

describe('POST /acronym', () => {
  test('return 400 when the acronym code and description are empty', async () => {

  });

  test('return 400 when the acronym code is empty', async () => {

  });

  test('return 400 when the acronym description is empty', async () => {

  });

  test('return 400 when the acronym code is empty', async () => {

  });

  test('return 400 when the code already exists', async () => {

  });

  test('return 201 for successful acronym creation', async () => {

  });

});

