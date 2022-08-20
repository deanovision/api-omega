/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("comment_id"),
      table.integer("post_id").unsigned().notNullable(),
      table
        .foreign("post_id")
        .references("post_id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE"),
      table.string("user_id").notNullable();
    table
      .foreign("user_id")
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("body"), table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
