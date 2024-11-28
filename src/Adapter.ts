export enum WriterFormat {
  Bold,
  Regular,
  Thin,
}

export type WriterData = {
  format: WriterFormat;
  text: string;
};

interface WriterOutput {
  processData: (data: WriterData) => void;
}

export class Writer {
  data: Array<WriterData> = [];

  pushData(data: WriterData) {
    this.data.push(data);
  }

  flushData(output: WriterOutput) {
    this.data.forEach((d) => output.processData(d));
  }
}

export class ConsoleOutput {
  writeToConsole(...str: Array<String>) {
    console.log(...str);
  }
}

export class ConsoleOutputAdapter implements WriterOutput {
  consoleOutput: ConsoleOutput;

  constructor(output: ConsoleOutput) {
    this.consoleOutput = output;
  }

  processData(data: WriterData) {
    let setWeight: string;
    switch (data.format) {
      case WriterFormat.Bold:
        setWeight = `\x1B[1m`;
        break;
      case WriterFormat.Regular:
        setWeight = `\x1B[0m`;
        break;
      case WriterFormat.Thin:
        setWeight = `\x1B[2m`;
        break;
    }

    this.consoleOutput.writeToConsole(`${setWeight}${data.text}\x1B[0m`);
  }
}
