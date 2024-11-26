import { SwordSmith, HammerSmith } from "../src/Factory";

describe("Weapons Smiths have coherent behaviour", () => {
  test("SwordSwith should sell swords", () => {
    let swordSmith = new SwordSmith();

    swordSmith.runShop();

    let remainingStocks = swordSmith.storage();

    expect(remainingStocks.iron).toEqual(60);
    expect(remainingStocks.leather).toEqual(80);
    expect(remainingStocks.wood).toEqual(100);
    expect(remainingStocks.gold).toEqual(50);
  });

  test("HammerSwith should sell hammers", () => {
    let hammerSmith = new HammerSmith();

    hammerSmith.runShop();

    let remainingStocks = hammerSmith.storage();

    expect(remainingStocks.iron).toEqual(70);
    expect(remainingStocks.leather).toEqual(90);
    expect(remainingStocks.wood).toEqual(80);
    expect(remainingStocks.gold).toEqual(70);
  });
});
