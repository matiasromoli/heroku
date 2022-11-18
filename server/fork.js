import express from "express";
const app = express();

const PORT = parseInt(process.argv[2]) || 8080;

app.get("/", (req, res) => {
  res.send(`PORT: ${PORT} PID: ${process.pid}`);
});

app.get("/info", (req, res) => {
  const data = {
    m: process.memoryUsage().rss,
    p: process.platform,
    e: process.execPath,
    v: process.version,
    a: process.argv[2],
    c: process.cwd(),
    p: process.pid,
  };
  console.log(data);
});

app.listen(PORT, () => {
  console.log(
    `Servidor conectado en el puerto ${PORT}, con el PID: ${process.pid}`
  );
});
