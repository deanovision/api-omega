/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("followers", (table) => {
    table.increments("id"),
      table.string("user_id").references("sub").inTable("users").notNullable(),
      table
        .string("follower_user_id")
        .references("sub")
        .inTable("users")
        .notNullable(),
      table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("following");
};
