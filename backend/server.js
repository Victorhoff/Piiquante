const http = require('http')
const app = require('./app');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});