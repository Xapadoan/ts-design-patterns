import { CrankShaft, Engine, Piston, SparkPlug } from "../src/Composite";

describe("Composites behaviour", () => {
  it("Engine Composite", () => {
    expect(new Piston().numberOfScrews()).toEqual(3);
    expect(new CrankShaft().numberOfScrews()).toEqual(4);
    expect(new SparkPlug().numberOfScrews()).toEqual(1);

    expect(new Engine(8).numberOfScrews()).toEqual(8 * (3 + 4 + 1));
  });
});
