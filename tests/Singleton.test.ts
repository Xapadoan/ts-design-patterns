import { Singleton } from "../src/Singleton";

describe("Tests for Singleton class", () => {
  it("Should not recreate an instance", () => {
    let instance = Singleton.getInstance();
    let second_ref = Singleton.getInstance();

    expect(instance.uuid).toEqual(second_ref.uuid);
  });
});
