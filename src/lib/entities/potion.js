import Entity from './entity';

const DEFAULT_POTION_HEALTH = 40;

class Potion extends Entity {
  constructor(game) {
    const emptyTile = game.map.getRandomEmptyTile();
    super(game, 'Health Potion', Entity.TYPE.potion, emptyTile);

    this.restoresHealth = DEFAULT_POTION_HEALTH;
  }
}

Potion.createRandom = function createRandom(game) {
  return new Potion(game);
};

export default Potion;
