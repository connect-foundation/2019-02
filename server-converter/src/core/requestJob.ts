class Job {
  queue: any;
  data: any;
  state: any;

  constructor(queue, data) {
    this.queue = queue;
    this.data = data;
    this.setState(false, 'new');
  }

  setState(emit, state, ...args) {
    this.state = state;
    if (emit) this.queue.emit(state, this, ...args);

    return this;
  }
}

export default Job;
