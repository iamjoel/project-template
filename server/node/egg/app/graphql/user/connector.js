class Connector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  fetchById(id) {
    return {
      id: 3,
      name: 'Joel'
    }
  }
  
}

module.exports = Connector;

