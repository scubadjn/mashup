import express from 'express';

const app = express();
const PORT = 3030;

app.get('/', (_, res) => {
  res.send('hello mashup!');
});

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log("Server liastening on Port", PORT);
});