// Need a "tree" logic, otherwise, useless

export interface HasScrews {
  numberOfScrews(): number;
}

export class MechanicalPiece implements HasScrews {
  components: HasScrews[];

  constructor(components: HasScrews[]) {
    this.components = components;
  }

  numberOfScrews(): number {
    return this.components.reduce(
      (screws, component) => (screws += component.numberOfScrews()),
      0
    );
  }
}

export class Wheel implements HasScrews {
  numberOfScrews(): number {
    return 6;
  }
}

export class RollingWindow implements HasScrews {
  numberOfScrews(): number {
    return 12;
  }
}

export class BodyWork implements HasScrews {
  screws: number;

  constructor(screws: number) {
    this.screws = screws;
  }
  numberOfScrews(): number {
    return this.screws;
  }
}

export class Hinge implements HasScrews {
  numberOfScrews(): number {
    return 4;
  }
}

export class SideDoor extends MechanicalPiece {
  constructor() {
    super([new BodyWork(4), new RollingWindow(), new Hinge(), new Hinge()]);
  }
}

export class Piston implements HasScrews {
  numberOfScrews(): number {
    return 3;
  }
}

export class CrankShaft implements HasScrews {
  numberOfScrews(): number {
    return 4;
  }
}

export class SparkPlug implements HasScrews {
  numberOfScrews(): number {
    return 1;
  }
}

export class Engine extends MechanicalPiece {
  constructor(combustionRooms: number) {
    let components = [];
    for (let i = 0; i < combustionRooms; i++) {
      components.push(new Piston(), new CrankShaft(), new SparkPlug());
    }
    super(components);
  }
}

export class Car extends MechanicalPiece {
  constructor() {
    super([
      new Wheel(),
      new Wheel(),
      new Wheel(),
      new Wheel(),
      new Engine(8),
      new SideDoor(),
      new SideDoor(),
      new BodyWork(14),
    ]);
  }
}
