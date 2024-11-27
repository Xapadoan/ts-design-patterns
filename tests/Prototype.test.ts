import { Hammer, Sword, SwordCloset, WeaponPrototype } from "../src/Prototype";

describe("Prototype pattern", () => {
  test("Cloning should retreive correct class", () => {
    let array: Array<WeaponPrototype> = [new Hammer(), new Sword()];

    let hammerCopy = array[0].clone();
    expect(hammerCopy).toBeInstanceOf(Hammer);
    let swordCopy = array[1].clone();
    expect(swordCopy).toBeInstanceOf(Sword);
  });

  test("Cloning is irrelevant regarding classes", () => {
    let array: Array<WeaponPrototype> = [new Hammer(), new Sword()];

    let hammerCopy = array[0];
    expect(hammerCopy).toBeInstanceOf(Hammer);
    let swordCopy = array[1];
    expect(swordCopy).toBeInstanceOf(Sword);
  });

  test("Cloning should be nice for pre-configured objects", () => {
    let closet = new SwordCloset();
    let bigSword = new Sword("Big Sword", 100, 20);
    let smallSword = new Sword("Small Sword", 30, 5);

    closet.addSwordClone(bigSword);
    closet.addSwordClone(smallSword);

    let clonedBigSword = closet.takeSwordClone("Big Sword");
    expect(clonedBigSword?.value()).toEqual(100);
  });

  test("There is not need for an explicit clone method", () => {
    let closet = new SwordCloset();
    let bigSword = new Sword("Big Sword", 100, 20);
    let smallSword = new Sword("Small Sword", 30, 5);

    closet.addSword(bigSword);
    closet.addSword(smallSword);

    let newBigSword = closet.takeSword("Big Sword");
    expect(newBigSword?.value()).toEqual(100);
  });
});
