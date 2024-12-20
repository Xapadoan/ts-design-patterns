import { AngryVictim, AnyVictim, ScaredVictim, Victim } from "../src/Decorator";

describe("Decorator behaviour", () => {
  test("Any Victim should take damages", () => {
    const victim = new Victim();
    const anyVictim = new AnyVictim(victim);

    expect(victim.health).toEqual(100);

    anyVictim.takeDamages(10);

    expect(victim.health).toEqual(90);
  });

  test("ScaredVictim should run away", () => {
    const victim = new Victim();
    const scaredVictim = new ScaredVictim(victim);
    const runAwaySpy = jest.spyOn(scaredVictim, "runAway");

    expect(victim.health).toEqual(100);

    scaredVictim.takeDamages(10);

    expect(victim.health).toEqual(90);
    expect(runAwaySpy).toHaveBeenCalledTimes(1);
  });

  test("AngryVictim should yell bad words", () => {
    const logSpy = jest.spyOn(console, "log");
    const victim = new Victim();
    const angryVictim = new AngryVictim(victim);
    const insultsSpy = jest.spyOn(angryVictim, "insults");

    expect(victim.health).toEqual(100);

    angryVictim.takeDamages(10);

    expect(victim.health).toEqual(90);
    expect(insultsSpy).toHaveBeenCalledTimes(1);
  });

  test("We can make a victim both scared and angry", () => {
    const victim = new Victim();
    const scaredVictim = new ScaredVictim(victim);
    const runAwaySpy = jest.spyOn(scaredVictim, "runAway");
    const scaredAndAngryVictim = new AngryVictim(scaredVictim);
    const insultsSpy = jest.spyOn(scaredAndAngryVictim, "insults");

    expect(victim.health).toEqual(100);

    scaredAndAngryVictim.takeDamages(10);

    expect(victim.health).toEqual(90);
    expect(runAwaySpy).toHaveBeenCalledTimes(1);
    expect(insultsSpy).toHaveBeenCalledTimes(1);
  });
});
