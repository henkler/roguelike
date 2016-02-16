import Entity from './entity';

class Player extends Entity {
  constructor(world) {
    let emptyTile = world.map.getRandomEmptyTile();
    super(world, Entity.TYPE.player, emptyTile);
  }
}

export default Player;
