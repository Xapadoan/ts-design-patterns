interface TakeDamages {
  takeDamages(amount: number): void;
}

export class Victim implements TakeDamages {
  health: number = 100;

  takeDamages(amount: number): void {
    this.health -= amount;
  }
}

export class AnyVictim implements TakeDamages {
  wrappee: TakeDamages;

  constructor(wrappee: TakeDamages) {
    this.wrappee = wrappee;
  }

  takeDamages(amount: number): void {
    this.wrappee.takeDamages(amount);
  }
}

export class ScaredVictim extends AnyVictim {
  runAway() {
    console.log("Run away");
  }

  takeDamages(amount: number): void {
    super.takeDamages(amount);
    this.runAway();
  }
}

export class AngryVictim extends AnyVictim {
  insults() {
    console.log("Yells many very bad words");
  }

  takeDamages(amount: number) {
    super.takeDamages(amount);
    this.insults();
  }
}
