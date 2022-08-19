const { faker } = require("@faker-js/faker");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
let users = [];
for (let i = 0; i <= 50; i++) {
  users.push({
    name: faker.name.fullName(),
    user_name: faker.unique(faker.internet.userName),
    email: faker.unique(faker.internet.email),
    sub: faker.unique(faker.database.mongodbObjectId),
    avatar_url: faker.internet.avatar(),
    bio: faker.lorem.paragraph(),
  });
}
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert(users);
};
