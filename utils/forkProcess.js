function getRandomIntInclusive(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export function forkProcess(query) {
  let data = [];

  if (!query) {
    query = 1000000;
  }

  for (let i = 0; i < query; i++) {
    const num = getRandomIntInclusive(1, 1000);
    data.push(num);
  }

  return data;
}

process.on("message", (msg) => {
  const data = msg.number;
  process.send(`El resultado es: ${data}`);
});
