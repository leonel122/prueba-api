const { Service } = require('feathers-objection');

exports.Movies = class Movies extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
