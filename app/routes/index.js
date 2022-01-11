const feedbacksRoutes = require('./feedbacks_routes');
const newsRoutes = require('./news_routes');
const pageRoutes = require('./page_routes');
module.exports = function(app, db) {
  feedbacksRoutes(app, db);
  newsRoutes(app, db);
  pageRoutes(app, db);
};