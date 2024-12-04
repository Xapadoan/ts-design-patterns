export class Flight {
  number: string;
  terminal: string;
  destination: string;

  constructor(number: string, terminal: string, destination: string) {
    this.number = number;
    this.terminal = terminal;
    this.destination = destination;
  }
}

// Implementation
export interface FlightsDisplayDevice {
  printFlights(flights: Flight[]): void;
  printSpecialAnnonce(annonce: string): void;
}

// Concrete Devices
export class WebAppFlightsDisplay implements FlightsDisplayDevice {
  protected allFlightsHTML: string = "";
  protected specialAnnounceHTML: string = "";

  protected flightToHtml(flight: Flight): string {
    return `<div class="flight">
      <h3 class="flight_destination>${flight.destination}</h3>
      <div class="flight_details">
        <span class="flight_number">No: ${flight.number}</span>
        <span class="flight_terminal">Terminal: ${flight.terminal}</span>
      </div>
    </div>`;
  }

  printFlights(flights: Flight[]): void {
    this.allFlightsHTML = `<div class="all_flights">
      ${flights.map((flight) => this.flightToHtml(flight))}
    </div>`;

    // Update some ref in the DOM
  }

  printSpecialAnnonce(annonce: string): void {
    this.specialAnnounceHTML = `<p class="special_announce">${annonce}</p>`;

    // Update an other ref
  }

  htmlOutput(): string {
    return `<div id="flights_display>${this.specialAnnounceHTML}${this.allFlightsHTML}</div>`;
  }
}

export class FIDS implements FlightsDisplayDevice {
  static FLIGHT_NUMBER_INDEX = 0;
  static TERMINAL_INDEX = 21;
  static DESTINATION_INDEX = 6;

  lines: number[][];

  constructor() {
    this.lines = new Array(10).fill(new Array(25).fill(" ".charCodeAt(0)));
  }

  protected formatFlight(flight: Flight): number[] {
    let line = new Array(25).fill(" ".charCodeAt(0));
    for (let i = 0; i < 6; i++) {
      line[FIDS.FLIGHT_NUMBER_INDEX + i] = flight.number.charCodeAt(i);
    }
    for (let i = 0; i < 15; i++) {
      line[FIDS.DESTINATION_INDEX + i] = flight.destination.charCodeAt(i);
    }
    for (let i = 0; i < 4; i++) {
      line[FIDS.TERMINAL_INDEX + i] = flight.terminal.charCodeAt(i);
    }

    return line;
  }

  printFlights(flights: Flight[]): void {
    let i = 0;
    while (i < 9 && flights[i] != undefined) {
      this.lines[i + 1] = this.formatFlight(flights[i]);
      i++;
    }
  }

  printSpecialAnnonce(annonce: string): void {
    for (let i = 0; i < 25; i++) {
      this.lines[0][i] = annonce.charCodeAt(i);
    }
  }

  outputLines(): number[][] {
    return this.lines;
  }
}

// Abstraction
export class FlightsCoordinator {
  arrivingFlights: Flight[] = new Array();
  displayDevice: FlightsDisplayDevice;

  constructor(displayDevice: FlightsDisplayDevice) {
    this.displayDevice = displayDevice;
  }

  addFlight(flight: Flight) {
    this.arrivingFlights.push(flight);

    this.displayDevice.printSpecialAnnonce(
      `Incoming flight ${flight.number} from ${flight.destination} annonced for landing in terminal ${flight.terminal}`
    );
    this.displayDevice.printFlights(this.arrivingFlights);
  }

  removeFlight(flightNumber: string) {
    let index = this.arrivingFlights.findIndex(
      (flight) => flight.number === flightNumber
    );
    if (index == -1) {
      return;
    }

    let [removedFlight] = this.arrivingFlights.splice(index, 1);

    this.displayDevice.printSpecialAnnonce(
      `Flight ${removedFlight.number} from ${removedFlight.destination} landed in terminal ${removedFlight.terminal}`
    );
    this.displayDevice.printFlights(this.arrivingFlights);
  }
}
