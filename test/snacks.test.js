// Import Dotenv
require("dotenv").config();

// tests/snacks.test.js
const request = require('supertest');
const app = require('../index'); // Import your Express app

describe('Snacks API', () => {
  // Test GET /snacks
  it('should fetch all snacks', async () => {
    const response = await request(app).get('/snacks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('snacks'); // Adjust based on your response structure
  });

  // Test POST /snacks
  it('should create a new snack', async () => {
    const newSnack = { name: 'Chips', price: 1.99 };
    const response = await request(app).post('/snacks').send(newSnack);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newSnack.name);
  });

  // Test PUT /snacks/:id
  it('should update a snack', async () => {
    const updateData = { name: 'Updated Chips', price: 2.49 };
    const response = await request(app).put('/snacks/1').send(updateData);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updateData.name);
  });

  // Test DELETE /snacks/:id
  it('should delete a snack', async () => {
    const response = await request(app).delete('/snacks/1');
    expect(response.statusCode).toBe(204);
  });
});


