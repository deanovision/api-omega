/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id"),
      table.string("sub").notNullable().unique(),
      table.string("email").notNullable().unique(),
      table.string("user_name").notNullable().unique(),
      table.string("name"),
      table.text("avatar_url"),
      table.text("bio"),
      table.timestamp("last_active"),
      table.timestamps(true, false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
