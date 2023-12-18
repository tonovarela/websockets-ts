import {WebSocket, WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 3000 });
wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.on('error', console.error);
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  ws.on('message', function message(data) {
    const payload = {
      type: 'custom-message',
      payload: data.toString().toUpperCase()
    };
    //Todos incluyentes
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(payload), { binary: false });
    //   }
    // });

    //Todos excluyentes
    wss.clients.forEach(function each(client) {
      if (client!== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload), { binary: false });
      }
    });
    
    
  });
});