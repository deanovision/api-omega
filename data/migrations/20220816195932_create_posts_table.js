/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("post_id").primary(),
      table.string("user_id").notNullable(),
      table
        .foreign("user_id")
        .references("uid")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE"),
      table.text("body").notNullable(),
      table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
