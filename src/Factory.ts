interface Weapon {
  name: String;
  attacks: Array<String>;
  value: number;
}

class Sword implements Weapon {
  name = "Sword";
  attacks = ["Stab", "Slash"];
  value = 50;
}

class Hammer implements Weapon {
  name = "Hammer";
  attacks = ["Crush", "Smash"];
  value = 70;
}

abstract class WeaponSmith {
  protected leatherAmount: number;
  protected ironAmount: number;
  protected woodAmount: number;
  protected gold: number;

  protected constructor() {
    this.leatherAmount = 100;
    this.ironAmount = 100;
    this.woodAmount = 100;
    this.gold = 0;
  }

  protected abstract createWeapon(): Weapon;

  public runShop() {
    let newWeapon = this.createWeapon();
    console.log(`I just made this beautiful ${newWeapon.name} !`);
    console.log(
      `It can easily ${newWeapon.attacks[0]} or ${newWeapon.attacks[1]} any opponant you are facing !`
    );
    console.log(`I can sell it to you for only ${newWeapon.value} gold`);

    this.gold += newWeapon.value;

    console.log("Thank you very much !");
  }

  public storage() {
    return {
      leather: this.leatherAmount,
      iron: this.ironAmount,
      wood: this.woodAmount,
      gold: this.gold,
    };
  }
}

export class SwordSmith extends WeaponSmith {
  constructor() {
    super();
  }
  protected createWeapon(): Sword {
    this.ironAmount -= 40;
    this.leatherAmount -= 20;

    return new Sword();
  }
}

export class HammerSmith extends WeaponSmith {
  constructor() {
    super();
  }
  protected createWeapon(): Weapon {
    this.ironAmount -= 30;
    this.woodAmount -= 20;
    this.leatherAmount -= 10;

    return new Hammer();
  }
}
