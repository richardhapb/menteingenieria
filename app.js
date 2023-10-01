import express, { json } from 'express';
import { router } from './routes/index.js';
const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(json());
app.disable('x-powered-by');

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
