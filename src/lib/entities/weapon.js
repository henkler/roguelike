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

const WEAPON_LIST = [
  {
    name: 'Claw of Death',
    damage: 10,
  },
  {
    name: 'Rubber Chicken',
    damage: 2,
  },
  {
    name: 'Pecan Pie',
    damage: 3,
  },
  {
    name: 'Ninja Star',
    damage: 4,
  },
  {
    name: 'Some sort of gun',
    damage: 5,
  },
  {
    name: 'Fancy Pants',
    damage: 4,
  },
  {
    name: 'The Deathinator',
    damage: 10,
  },
  {
    name: 'Doombringer',
    damage: 8,
  },
  {
    name: 'Beehive',
    damage: 3,
  },
  {
    name: 'Hurtful Words',
    damage: 2,
  },
];

Weapon.createRandom = function createRandom(game) {
  const randomWeaponStats = WEAPON_LIST[Math.floor(Math.random() * WEAPON_LIST.length)];
  return new Weapon(game, randomWeaponStats.name, randomWeaponStats.damage);
};

export default Weapon;
