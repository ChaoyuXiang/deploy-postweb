const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());


var parentDir = path.normalize(__dirname + "/..");
app.use(express.static(path.join(parentDir, 'client/build')));

const uri = process.env.MONGO_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const postsRouter = require('./routes/posts');
const userRouter = require('./routes/users');

app.use('/api/posts', postsRouter);
app.use('/api/users', userRouter);


// serve static assets if in production

  app.get('*', (req, res) => {
    res.sendFile(path.join(parentDir + '/client/build/index.html'));
  });

// if (process.env.NODE_ENV === 'production') {
//   // Serve static files from the React app
//   console.log('reach here');
  
// }





app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});