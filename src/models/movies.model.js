// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require("objection");

class movies extends Model {
  static get tableName() {
    return "movies";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "year"],

      properties: {
        title: { type: "string" },
        year: { type: "int" },
        synopsis: { type: "int" },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get("knex");

  db.schema
    .hasTable("movies")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("movies", (table) => {
            table.increments("id");
            table.string("title");
            table.string("year");
            table.text("synopsis");
            table.timestamp("createdAt");
            table.timestamp("updatedAt").nullable();
          })
          .then(() => console.log("Created movies table")) // eslint-disable-line no-console
          .catch((e) => console.error("Error creating movies table", e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating movies table", e)); // eslint-disable-line no-console

  return movies;
};
