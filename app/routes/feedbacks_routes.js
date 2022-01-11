var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/feedbacks/all', (req, res) => {
    db.collection('feedbacks').find({}).toArray(function(err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.get('/feedbacks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('feedbacks').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  app.post('/feedbacks', (req, res) => {
    const feedback = { name: req.body.name, text: req.body.text, date: req.body.date, time: req.body.time };
    db.collection('feedbacks').insert(feedback, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete('/feedbacks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('feedbacks').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Feedback ' + id + ' deleted!');
      } 
    });
  });
  app.put ('/feedbacks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const feedback = { name: req.body.name, text: req.body.text, date: req.body.date, time: req.body.time };
    db.collection('feedbacks').update(details, feedback, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(feedback);
      } 
    });
  });
};