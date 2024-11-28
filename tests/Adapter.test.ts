import {
  ConsoleOutput,
  ConsoleOutputAdapter,
  Writer,
  WriterFormat,
} from "../src/Adapter";

describe("Adapter Implementation", () => {
  it("Should work I guess", () => {
    let spy = jest.spyOn(console, "log");
    let writer = new Writer();

    writer.pushData({ format: WriterFormat.Bold, text: "This is a big title" });
    writer.pushData({
      format: WriterFormat.Thin,
      text: "Here is an optionnal part like a disclaime or something",
    });
    writer.pushData({ format: WriterFormat.Regular, text: "Now the content" });

    let formater = new ConsoleOutputAdapter(new ConsoleOutput());

    writer.flushData(formater);

    expect(spy).toHaveBeenCalledTimes(3);
  });
});
