import { EventEmitter } from 'events';
import * as osu from 'node-os-utils';
import Job from './requestJob';

const { cpu, mem } = osu;

class Queue extends EventEmitter {
  config: { queueLimit: number, activeLimit: number, cpuUsage: number };
  private activeLimit: number;
  private queueLimit: number;
  private activeCount: number;
  queue: Job[];
  active: Job[];

  constructor(config) {
    super();
    this.config = config;
    this.activeLimit = config.activeLimit;
    this.queueLimit = config.queueLimit;
    this.activeCount = 0;
    this.queue = [];
    this.active = [];
  }

  getLength() {
    return this.queue.length;
  }

  async setActiveLimit() {
    const cpuUsage = await cpu.usage();
    if (this.activeLimit > 0) {
      if (cpuUsage < this.config.cpuUsage) this.activeLimit += 1;
    }
  }

  async setQueueLimit() {
    const { totalMemMb, freeMemMb } = await mem.free();
    if (freeMemMb < 0) {
      this.queueLimit = 0;
    }
  }

  createJob(data) {
    this.setQueueLimit();
    this.setActiveLimit();
    console.log(this.activeLimit, this.queueLimit);
    const job = new Job(this, data);

    process.nextTick(() => {
      if (!this.canQueue()) return job.setState(true, 'reject');
      if (this.canStart() && this.queue.length === 0) return this.startJob(job);
      return this.queueJob(job);
    });

    process.nextTick(this.checkQueue.bind(this));
    return job;
  }

  startJob(job) {
    this.activeCount += 1;
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
      this.activeCount -= 1;
    }

    job.setState(false, 'complete');
    process.nextTick(this.checkQueue.bind(this));
  }

  queueJob = (job) => {
    this.queue.push(job);
    job.setState(true, 'queue');

    return job;
  };

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
    return this.getLength() < this.queueLimit;
  }

  canStart() {
    return this.activeCount < this.activeLimit;
  }
}

export default Queue;
