/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { EventEmitter } from 'events';
import { RequestHandler } from 'src/@types';
import Job from './requestJob';

class Queue extends EventEmitter {
  config: { queueLimit: number, activeLimit: number };
  private activeCount: number;
  private queue: any[];
  private active: any[];

  constructor(config) {
    super();
    this.config = config || {};
    this.activeCount = 0;
    this.queue = [];
    this.active = [];
  }

  getLength() {
    return this.queue.length;
  }

  createJob(data) {
    const job = new Job(this, data);

    process.nextTick(() => {
      if (!this.canQueue()) return this.rejectJob(job);
      if (this.canStart() && this.queue.length === 0) return this.startJob(job);
      return this.queueJob(job);
    });

    process.nextTick(this.checkQueue.bind(this));
    return job;
  }

  startJob(job) {
    this.activeCount++;
    this.active.push(job);
    job.setState(true, 'process', () => {
      this.completeJob(job);
    });

    return job;
  }

  dequeueJob(job = null) {
    if (job) {
      const index = this.queue.indexOf(job);

      if (index < 0) {
        throw new Error('request not found in queue');
      } else {
        this.queue.splice(index, 1);
      }
    } else {
      job = this.queue.shift();
    }
    job.setState(false, 'dequeue');

    return job;
  }

  completeJob(job) {
    const index = this.active.indexOf(job);

    if (index < 0) {
      throw new Error('request complete but not found');
    } else {
      this.active.splice(index, 1);
      this.activeCount--;
    }

    job.setState(false, 'complete');
    process.nextTick(this.checkQueue.bind(this));
  }

  queueJob = (job) => {
    this.queue.push(job);
    job.setState(false, 'queue');

    return job;
  };

  rejectJob(job) {
    job.setState(true, 'reject');
    return job;
  }

  cancelJob(job) {
    this.dequeueJob(job);
    job.setState(false, 'cancel');

    return job;
  }

  checkQueue() {
    if (this.canStart() && this.queue.length > 0) {
      const job = this.dequeueJob();
      this.startJob(job);
    }
  }

  canQueue() {
    return this.getLength() < this.config.queueLimit;
  }

  canStart() {
    return this.activeCount < this.config.activeLimit;
  }
}

export default Queue;
