const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Home route working!" }));
  } else if (req.url === "/student") {
    res.writeHead(200);
    res.end(JSON.stringify({
      name: "Emmanuel",
      studentId: "TSKR445933",
      track: "Backend Development"
    }));
  } else if (req.url === "/wallet") {
    res.writeHead(200);
    res.end(JSON.stringify({ balance: 15000, currency: "NGN" }));

    } else if (req.url === "/courses") {
    res.writeHead(200);
    res.end(JSON.stringify({
      academy: "TS Academy",
      courses: new Array("Backend Development", "Music", "Development", "Data Analytics")
    }));

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "404 Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Multi-route server live at http://localhost:3000");
});