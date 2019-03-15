const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const logger = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const cors = require('cors');
const db = require("./models");

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use('/', express.static(path.join(__dirname, '/client/dist/client')));
app.set('view engine', 'jade');


app.all('*', (req, res, next) => {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found, req was: ', req, ' res is: ', res);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error page
  res.status(err.status || 500);
  res.json({
    message: 'error',
    error: err
  });
});

// Syncing sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
    console.log('===================================');

    io.on('connection', (socket) => {

      socket.on('connectionRequest', () => {
        console.log('received connection request');
        db.Factory.findAll({}).then((data) => {
          socket.emit('connectionInfo', data);
        });
      });

      // new factory
      socket.on('newFactory', (data) => {
        db.Factory.create({
          Name: data.Name,
          Low: data.Low,
          High: data.High,
          Numbers: data.Numbers,
          Expires: data.Expires
        }).then((data) => {
          socket.emit('update', {
            Action: 'new', Value: data 
          });
          socket.broadcast.emit('update', {
            Action: 'new', Value: data 
          });
        });
      });


      // update factory
      socket.on('updateFactory', (data) => {
        db.Factory.update({
          Name: data.Name,
          Low: data.Low,
          High: data.High,
          Numbers: data.Numbers.toString(),
          Expires: data.Expires
        }, {
            where: {
              id: data.id
            }
          }).then((res) => {
            socket.emit('update', {
              Action: 'updated', Value: data 
            });
            socket.broadcast.emit('update', {
              Action: 'updated', Value: data 
            });
          });
      });


      // delete factory
      socket.on('deleteFactory', (data) => {
        db.Factory.destroy({
          where: {
            id: data.id
          }
        }).then((res) => {
          socket.emit('update', {
            Action: 'deleted', Value: data 
          });
          socket.broadcast.emit('update', {
             Action: 'deleted', Value: data 
          });
        });
      });

    });

  });
});