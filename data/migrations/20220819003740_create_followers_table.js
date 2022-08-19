/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("followers", (table) => {
    table.increments("id"),
      table
        .string("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users"),
      table
        .string("friend_user_id")
        .notNullable()
        .references("user_id")
        .inTable("users"),
      table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("followers");
};
