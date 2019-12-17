import { EventEmitter } from 'events';
import * as osu from 'node-os-utils';
import Job from './requestJob';

const { cpu, mem } = osu;

class Queue extends EventEmitter {
  config: {
    queueLimit: number,
    activeLimit: number,
    cpuUsage: number
  };
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

  async checkCPU() {
    const cpuUsage = await cpu.usage();

    return (cpuUsage < this.config.cpuUsage);
  }

  async checkMem(job) {
    const { freeMemMb } = await mem.free();

    if (freeMemMb <= 0) {
      job.setState(true, 'reject');
    }
  }

  createJob(data) {
    const job = new Job(this, data);

    this.checkMem(job);

    process.nextTick(() => {
      if (!this.canQueue()) return job.setState(true, 'reject');
      if (this.canStart() && this.queue.length === 0) return this.startJob(job);

      return this.enqueueJob(job);
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

  completeJob(job) {
    this.dequeueActive();
    job.setState(false, 'complete');
    process.nextTick(this.checkQueue.bind(this));
  }

  stopHandler(job) {
    const { req, _, next } = job.data;
    return {
      save: () => { next(); },
      saveComplete: () => { req.converter.clearInput(); },
      convert: () => { if (req.converter) req.converter.stop(true); },
      upload: () => { next(); },
      remove: () => { next(); },
    };
  }

  stopJob(job, stage = null) {
    const { req, res } = job.data;
    const stopHandler = this.stopHandler(job);

    if (req.converter) req.converter.isStop = true;

    this.dequeueActive();
    job.setState(true, 'stop');

    if (!stopHandler[stage]) res.end();
    else stopHandler[stage]();

    process.nextTick(this.checkQueue.bind(this));
  }

  dequeueActive() {
    if (this.active.length < 0) {
      throw new Error('request complete but not found');
    }
    this.active.pop();
    if (this.activeCount !== 0) this.activeCount -= 1;
  }

  dequeueJob(job = null) {
    const dequeueJob = job ? this.checkJobinQueue(job) : this.queue.shift();

    dequeueJob.setState(false, 'dequeue');

    return dequeueJob;
  }

  checkJobinQueue(job) {
    const index = this.queue.indexOf(job);

    if (index < 0) throw new Error('request not found in queue');
    else this.queue.splice(index, 1);

    return job;
  }

  enqueueJob = (job) => {
    this.queue.push(job);
    job.setState(false, 'queue');

    return job;
  };

  checkQueue() {
    if (this.canStart() && this.queue.length > 0) {
      const nextjob = this.dequeueJob();
      this.startJob(nextjob);
    }
  }

  cancelJob(job) {
    this.dequeueJob(job);
    job.setState(false, 'cancle-queue');

    return job;
  }

  canQueue() {
    return this.getLength() < this.queueLimit;
  }

  canStart() {
    return this.activeCount < this.activeLimit;
  }
}

export default Queue;
