// Initializes the `movies` service on path `/movies`
const { Movies } = require('./movies.class');
const createModel = require('../../models/movies.model');
const hooks = require('./movies.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/movies', new Movies(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('movies');

  service.hooks(hooks);
};
