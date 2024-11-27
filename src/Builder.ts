import {
  ChainMail,
  Helmet,
  LightArmorSmith,
  MediumArmorSmith,
} from "./AbstractFactory";
import { SwordSmith, Weapon, WeaponSmith } from "./Factory";

export class Warrior {
  weapon: Weapon;
  helmet: Helmet | null;
  chainMail: ChainMail | null;

  constructor(weapon: Weapon) {
    this.weapon = weapon;
    this.helmet = null;
    this.chainMail = null;
  }

  equipHelmet(helmet: Helmet) {
    this.helmet = helmet;
  }

  equipChainMail(chainMail: ChainMail) {
    this.chainMail = chainMail;
  }
}

interface WarriorBuilder {
  reset: () => void;
  buildWeapon: () => void;
  buildHelmet: () => void;
  buildChainMail: () => void;
  getWarrior: () => Warrior;
}

/*
 * At this point I want to introduce a new Weapon, the staff
 * Let's create it's factory
 */

export class Staff implements Weapon {
  name = "Staff";
  attacks = ["Heal allies", "Repel Undeads"];
  value = 100;
}

class StaffCarver extends WeaponSmith {
  magicStones: number;

  constructor() {
    super();
    this.magicStones = 100;
  }

  createWeapon(): Weapon {
    this.woodAmount -= 30;
    this.magicStones -= 5;

    return new Staff();
  }
}

export class ClercBuilder implements WarriorBuilder {
  staff: Weapon | null = null;
  chainMail: ChainMail | null = null;

  reset() {
    this.chainMail = null;
    this.staff = null;
  }

  buildWeapon() {
    this.staff = new StaffCarver().createWeapon();
  }

  buildHelmet() {}

  buildChainMail() {
    this.chainMail = new LightArmorSmith().createChainMain();
  }

  getWarrior() {
    if (!this.staff || !this.chainMail) {
      throw new Error("Tried to get Clerc before running builder steps");
    }
    let warrior = new Warrior(this.staff);
    warrior.equipChainMail(this.chainMail);

    return warrior;
  }
}

export class SpadassinBuilder implements WarriorBuilder {
  sword: Weapon | null = null;
  cloak: Helmet | null = null;
  chainMail: ChainMail | null = null;

  reset() {
    this.sword = null;
    this.cloak = null;
    this.chainMail = null;
  }

  buildWeapon() {
    this.sword = new SwordSmith().createWeapon();
  }

  buildHelmet() {
    this.cloak = new LightArmorSmith().createHelmet();
  }

  buildChainMail() {
    this.chainMail = new MediumArmorSmith().createChainMain();
  }

  getWarrior() {
    if (!this.sword || !this.chainMail || !this.cloak) {
      throw new Error("Tried to get Spadassin before running builder steps");
    }
    let warrior = new Warrior(this.sword);
    warrior.equipChainMail(this.chainMail);
    warrior.equipHelmet(this.cloak);

    return warrior;
  }
}

export class WarriorBuildDirector {
  builder: WarriorBuilder;

  constructor(builder: WarriorBuilder) {
    this.builder = builder;
  }

  make(): Warrior {
    this.builder.reset();
    this.builder.buildWeapon();
    this.builder.buildChainMail();
    this.builder.buildHelmet();

    return this.builder.getWarrior();
  }
}
