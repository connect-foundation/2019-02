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
    console.log(state, this.data.req.params.channelId);
    this.state = state;
    if (emit) this.queue.emit(state, this, ...args);

    return this;
  }
}

export default Job;
