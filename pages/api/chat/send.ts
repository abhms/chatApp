import { NextApiRequest, NextApiResponse } from 'next';
import { Server, Socket } from 'socket.io';
import http from 'http';

let io: Server;

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (!io) {
    const httpServer = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Socket.io server');
    });

    io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"]
      },
    });

    io.on('connect', (socket: Socket) => {
      console.log(`Socket ${socket.id} connected`);

      socket.on('message', (message: string) => {
        console.log(`Message from ${socket.id}: ${message}`);
      })

      socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
      });
    });

    httpServer.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  }

  res.status(200).json({ message: 'Socket.io server running' });
};
