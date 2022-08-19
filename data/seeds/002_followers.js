/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
let userIds = [
  "3c0bb8dff300cd41a84374f9",
  "2a0cec7bd7a2cc49f8feafa5",
  "d1b39d5dbd7ddc5a984393ae",
  "ced8afc3ac59343fcb7fef2e",
  "dbb00feb39dabbcab6f6cd35",
  "afcdc34cf2e84e81eadfaba2",
  "166b0aff5cef6ccd1673951c",
  "a6dfcefc256237bfa4cbe8fa",
  "aaaf502dd2dafb3318eea15f",
  "3cedcb4ae16229461ba641ee",
  "1d326daa0b6fefb239b5de46",
  "e8f8c8f7a0ebefab4bf7d9df",
  "bfc36f28e51dd031b86c77e7",
  "dad7ddfc5bfc0ae9e6e13aa2",
  "db43efe4634fee8ecf003185",
  "a0a6168dbcd7eed08fc3649d",
  "58f5182ac2bb3fe4bf045504",
  "3852615abffb0233caafc77d",
  "bd5ae9eeaf4d972cb9807f6e",
];
let followers = [];
for (let i = 0; i < userIds.length; i++) {
  for (let j = 0; j < userIds.length; j++) {
    if (i !== j) {
      followers.push({
        user_id: userIds[i],
        friend_user_id: userIds[j],
      });
    }
  }
}
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("followers").del();
  await knex("followers").insert(followers);
};
