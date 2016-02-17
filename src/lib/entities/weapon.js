import Entity from './entity';

class Weapon extends Entity {
  constructor(game, name, damage) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game, name, Entity.TYPE.weapon, emptyTile);

    this._damage = damage;
  }

  // getters
  get damage() {
    return this._damage;
  }
}

export default Weapon;
