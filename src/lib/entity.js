class Entity {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

Entity.TYPE = {
  player: 0,
  boss: 1,
  enemy: 2,
  weapon: 3,
  potion: 4
};

export default Entity;
