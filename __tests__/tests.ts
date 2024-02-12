import request from 'supertest';
import users from '../src/data/users';
import { HTTP_RESPONSE_CODES } from '../src/types/generalTypes';
import { USER_ROUTE } from '../src/routes/routes';

describe('CRUD API TESTS', () => {
  const api = request(`http://localhost:${process.env.PORT ?? 4000}`);
  const newUser = {
    username: 'Robin',
    age: 'Immortal',
    hobbies: [`Batman's sidekick`],
  };

  test('Get all users with a GET api/users request', async () => {
    const res = await api.get(USER_ROUTE);

    expect(res.status).toBe(HTTP_RESPONSE_CODES.OK);
    expect(users.length).toBe(users.length);
  });

  test('Created a new used by a POST api/users request', async () => {
    const res = await api.post(USER_ROUTE).send(newUser);

    expect(res.status).toBe(HTTP_RESPONSE_CODES.CREATED);
    expect(res.body.username).toBe(newUser.username);
  });

  test('Request an existing user with a GET api/user/{userId}', async () => {
    const postRes = await api.post(USER_ROUTE).send(newUser);

    const res = await api
      .put(`/api/users/${postRes.body.id}`)
      .send({ ...newUser, username: 'Batgirl' });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('Batgirl');
  });

  test('Delete an existing user with a DELETE api/user/{userId}', async () => {
    const postRes = await api.post(USER_ROUTE).send(newUser);

    const res = await api.delete(`/api/users/${postRes.body.id}`);

    expect(res.status).toBe(200);
  });

  test('Update an existing user with a PUT api/user/{userId}', async () => {
    const postRes = await api.post(USER_ROUTE).send(newUser);

    expect(postRes.status).toBe(HTTP_RESPONSE_CODES.CREATED);
    expect(postRes.body.username).toBe(newUser.username);

    const res = await api
      .put(`/api/users/${postRes.body.id}`)
      .send({ ...newUser, username: 'Penguin' });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('Penguin');
  });
});
