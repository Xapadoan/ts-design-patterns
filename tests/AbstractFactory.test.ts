import {
  Customer,
  HeavyArmorSmith,
  HeavyChainMail,
  HeavyHelmet,
  LightArmorSmith,
  LightChainMail,
  LightHelmet,
  MediumArmorSmith,
  MediumChainMail,
  MediumHelmet,
} from "../src/AbstractFactory";

describe("Abstract Factory Behaviour", () => {
  it("Should produce same variants", () => {
    let warrior = new Customer(new HeavyArmorSmith());

    warrior.buyFullArmor();
    expect(warrior.helmet).toBeInstanceOf(HeavyHelmet);
    expect(warrior.chainMail).toBeInstanceOf(HeavyChainMail);
  });

  it("Customer should be able to use any factory", () => {
    let warrior = new Customer(new HeavyArmorSmith());
    let ranger = new Customer(new MediumArmorSmith());
    let witch = new Customer(new LightArmorSmith());

    warrior.buyFullArmor();
    ranger.buyFullArmor();
    witch.buyFullArmor();

    expect(warrior.helmet).toBeInstanceOf(HeavyHelmet);
    expect(warrior.chainMail).toBeInstanceOf(HeavyChainMail);
    expect(ranger.helmet).toBeInstanceOf(MediumHelmet);
    expect(ranger.chainMail).toBeInstanceOf(MediumChainMail);
    expect(witch.helmet).toBeInstanceOf(LightHelmet);
    expect(witch.chainMail).toBeInstanceOf(LightChainMail);
  });
});
