import { Response } from 'express';
import { RequestHandler } from '../@types';

class Poller {
  static create() {
    return new Poller();
  }

  private waitQueue: { [topic: string]: Response[] };
  private payloadQueue: { [topic: string]: any[] };

  constructor() {
    this.waitQueue = {};
    this.payloadQueue = {};
  }

  toMiddleware(): RequestHandler {
    const middleware: RequestHandler = (req, res) => {
      const topic: string = req.topic || 'poller';

      if (this.payloadQueue[topic]) {
        const recentPayload = this.payloadQueue[topic].pop();

        this.payloadQueue[topic] = null;
        res.json(recentPayload);
      } else {
        this.waitQueue[topic] = this.waitQueue[topic] || [];
        this.waitQueue[topic].push(res);
      }
    };

    return middleware;
  }

  broadcast(topic = 'poller', payload = {}) {
    if (this.waitQueue[topic]) {
      this.waitQueue[topic].forEach((res) => res.json(payload));
      this.waitQueue[topic] = null;
    } else {
      this.payloadQueue[topic] = this.payloadQueue[topic] || [];
      this.payloadQueue[topic].push(payload);
    }
  }

  clear(topic) {
    this.waitQueue[topic] = null;
    this.payloadQueue[topic] = null;
  }
}

export default Poller;
