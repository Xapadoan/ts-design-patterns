import {
  LightChainMail,
  LightHelmet,
  MediumChainMail,
} from "../src/AbstractFactory";
import {
  ClercBuilder,
  SpadassinBuilder,
  Staff,
  WarriorBuildDirector,
} from "../src/Builder";
import { Sword } from "../src/Factory";

describe("Builder behaviour with director", () => {
  test("Director should be able to make a clerc", () => {
    let director = new WarriorBuildDirector(new ClercBuilder());
    let clerc = director.make();

    expect(clerc.weapon).toBeInstanceOf(Staff);
    expect(clerc.helmet).toBeNull();
    expect(clerc.chainMail).toBeInstanceOf(LightChainMail);
  });

  test("Director should be able to make a spadassin", () => {
    let director = new WarriorBuildDirector(new SpadassinBuilder());
    let spadassin = director.make();

    expect(spadassin.weapon).toBeInstanceOf(Sword);
    expect(spadassin.helmet).toBeInstanceOf(LightHelmet);
    expect(spadassin.chainMail).toBeInstanceOf(MediumChainMail);
  });
});
