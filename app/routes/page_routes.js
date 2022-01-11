var ObjectID = require('mongodb').ObjectID;
var _dirname = '/Users/vladislav/Desktop/IoT courses/Course2/web/lab10-11';
module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.sendFile(_dirname + '/index.html');
  });
  app.get('/index.html', (req, res) => {
    res.sendFile(_dirname + '/index.html');
  });
  app.get('/pages/admin.html', (req, res) => {
    res.sendFile(_dirname + '/Admin.html');
  });
  app.get('/pages/contacts.html', (req, res) => {
    res.sendFile(_dirname + '/Concert.html');
  });
  app.get('/pages/fans.html', (req, res) => {
    res.sendFile(_dirname + '/fansAppeal.html');
  });
  app.get('/pages/news.html', (req, res) => {
    res.sendFile(_dirname + '/news.html');
  });
  app.get('/pages/matches.html', (req, res) => {
    res.sendFile(_dirname + '/Schedule.html');
  });
};
