/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { EventEmitter } from 'events';
import { RequestHandler } from 'src/@types';
import Job from './requestJob';

class Queue extends EventEmitter {
  private config: { queueLimit: number, activeLimit: number };
  private activeCount: number;
  private queue: any[];
  private active: any[];
  private totalCount: number;

  constructor(config) {
    super();
    this.config = config || {};
    this.activeCount = 0;
    this.queue = [];
    this.active = [];
    this.totalCount = 0;
  }

  getLength() {
    return this.queue.length;
  }

  generateId() {
    this.totalCount++;
    if (this.totalCount > Number.MAX_SAFE_INTEGER) { this.totalCount = 0; }
    return this.totalCount;
  }

  processJob(data) {
    console.log('create');
    const job = new Job(this.generateId(), this, data);

    process.nextTick(() => {
      if (!this.canQueue()) return this.rejectJob(job);
      if (this.canStart() && this.queue.length === 0) return this.startJob(job);
      return this.queueJob(job);
    });

    process.nextTick(this.checkQueue.bind(this));
    return job;
  }

  startJob(job) {
    console.log('start');
    this.activeCount++;
    this.active.push(job);
    this.emit('process', job, (...args) => {
      this.completeJob(job, ...args);
    });
    return job;
  }

  dequeueJob(job = false) {
    if (job) {
      const i = this.queue.indexOf(job);
      if (i < 0) {
        console.log('not found');
      } else {
        this.queue.splice(i, 1);
      }
    } else {
      job = this.queue.shift();
    }

    this.emit('dequeue');

    return job;
  }
  completeJob(job, ...args) {
    console.log('complete');
    const i = this.active.indexOf(job);
    if (i < 0) {
      console.log('not found');
    } else {
      this.active.splice(i, 1);
      this.activeCount--;
    }
    this.emit('complete');
    process.nextTick(this.checkQueue.bind(this));
  }

  queueJob = (job) => {
    console.log('queue');
    this.queue.push(job);
    job.state = 'queue';
    this.emit('queue');

    return job;
  };

  rejectJob(job) {
    job.state = 'reject';
    this.emit('reject', job);
    return job;
  }

  cancelJob(job) {
    console.log('cancel');
    this.dequeueJob(job);
    job.state = 'cancel';
    this.emit('cancel');
    return job;
  }

  checkQueue() {
    console.log('check');
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
