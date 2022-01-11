var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/news/all', (req, res) => {
    db.collection('news').find({}).toArray(function(err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('news').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.post('/news', (req, res) => {
    const news = { title: req.body.title, body: req.body.body, picture: req.body.picture };
    db.collection('news').insert(news, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete('/news/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('news').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('News ' + id + ' deleted!');
      } 
    });
  });
  app.put('/news/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const news = { title: req.body.title, body: req.body.body, picture: req.body.picture };
    db.collection('news').update(details, news, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(news);
      } 
    });
  });
};