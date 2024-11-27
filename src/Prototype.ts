export interface WeaponPrototype {
  clone: () => WeaponPrototype;
}

export class Hammer implements WeaponPrototype {
  private name: string = "Hammer";
  private attacks: string[] = ["Crush", "Smash"];
  private value: number = 70;

  clone(): Hammer {
    let weapon = new Hammer();
    weapon.name = this.name;
    weapon.attacks = this.attacks;
    weapon.value = this.value;

    return weapon;
  }
}

export class Sword implements WeaponPrototype {
  private _name: string;
  private _attacks: string[];
  private _value: number;
  private _bleeding_damages;

  constructor(
    name: string = "Sword",
    value: number = 50,
    bleeding_damages: number = 5
  ) {
    this._name = name;
    this._attacks = ["Stab", "Slash"];
    this._value = value;
    this._bleeding_damages = bleeding_damages;
  }

  clone(): Sword {
    let sword = new Sword();
    sword._attacks = this._attacks;
    sword._bleeding_damages = this._bleeding_damages;
    sword._name = this._name;
    sword._value = this._value;

    return sword;
  }

  name(): string {
    return this._name;
  }
  value(): number {
    return this._value;
  }
}

export class SwordCloset {
  private swords: { [key: string]: Sword } = {};

  addSwordClone(sword: Sword) {
    this.swords[sword.name()] = sword.clone();
  }

  takeSwordClone(name: string): Sword | null {
    let sword = this.swords[name];
    if (sword) {
      return sword.clone();
    }
    return null;
  }

  addSword(sword: Sword) {
    this.swords[sword.name()] = sword;
  }

  takeSword(name: string): Sword | null {
    let sword = this.swords[name];
    if (sword) {
      return sword;
    }
    return null;
  }
}
