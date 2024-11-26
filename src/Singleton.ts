import { v4 as uuid } from "uuid";

export class Singleton {
  private static instance: Singleton | null;

  readonly uuid: String;

  private constructor() {
    this.uuid = uuid();
  }
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}
