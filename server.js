const express = require("express");
const http = require("http");
const path = require("path");
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set();

app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", ws => {
  clients.add(ws);

  ws.on("message", raw => {
    let data;
    try { data = JSON.parse(raw.toString()); } catch { return; }
    if (data.type !== "message" || !data.text) return;

    const message = {
      type: "message",
      name: String(data.name || "User").slice(0, 30),
      text: String(data.text).slice(0, 1000),
      time: new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})
    };

    for (const client of clients) {
      if (client.readyState === 1) client.send(JSON.stringify(message));
    }
  });

  ws.on("close", () => clients.delete(ws));
});

server.listen(process.env.PORT || 3000, () =>
  console.log("Farehi running on port " + (process.env.PORT || 3000))
);
