import {
  FIDS,
  Flight,
  FlightsCoordinator,
  WebAppFlightsDisplay,
} from "../src/Bridge";

const flights = [
  new Flight("A45C2E", "A032", "Marseille"),
  new Flight("7B15C4", "A004", "NY City"),
  new Flight("98AC6F", "A104", "Berlin"),
];

function flightIsInBothAnnounceAndTab(flight: Flight, html: string) {
  let numberIndexInSpecialAnnounce = html.indexOf(flight.number);
  let destinationIndexInSpecialAnnounce = html.indexOf(flight.destination);
  let terminalIndexInSpecualAnnounce = html.indexOf(flight.terminal);
  expect(numberIndexInSpecialAnnounce).not.toEqual(-1);
  expect(destinationIndexInSpecialAnnounce).not.toEqual(-1);
  expect(terminalIndexInSpecualAnnounce).not.toEqual(-1);

  let numberIndexInFlightsTab = html.indexOf(
    flight.number,
    numberIndexInSpecialAnnounce + 1
  );
  let destinationIndexInFlightsTab = html.indexOf(
    flight.destination,
    destinationIndexInSpecialAnnounce + 1
  );
  let terminalIndexInFlightsTab = html.indexOf(
    flight.terminal,
    terminalIndexInSpecualAnnounce + 1
  );
  expect(numberIndexInFlightsTab).not.toEqual(-1);
  expect(destinationIndexInFlightsTab).not.toEqual(-1);
  expect(terminalIndexInFlightsTab).not.toEqual(-1);
}

function flightIsOnlyInTab(flight: Flight, html: string) {
  let allFlightsIndex = html.indexOf("all_flights");

  let numberIndexInTab = html.indexOf(flight.number);
  let destinationIndexInTab = html.indexOf(flight.destination);
  let terminalIndexInTab = html.indexOf(flight.terminal);

  expect(numberIndexInTab).toBeGreaterThanOrEqual(allFlightsIndex);
  expect(destinationIndexInTab).toBeGreaterThanOrEqual(allFlightsIndex);
  expect(terminalIndexInTab).toBeGreaterThanOrEqual(allFlightsIndex);
}

function flightIsOnlyInAnnounce(flight: Flight, html: string) {
  let allFlightsIndex = html.indexOf("all_flights");

  let numberIndexInSpecialAnnounce = html.indexOf(flight.number);
  let destinationIndexInSpecialAnnounce = html.indexOf(flight.destination);
  let terminalIndexInSpecualAnnounce = html.indexOf(flight.terminal);

  expect(numberIndexInSpecialAnnounce).toBeLessThan(allFlightsIndex);
  expect(destinationIndexInSpecialAnnounce).toBeLessThan(allFlightsIndex);
  expect(terminalIndexInSpecualAnnounce).toBeLessThan(allFlightsIndex);

  let numberIndexInFlightsTab = html.indexOf(
    flight.number,
    numberIndexInSpecialAnnounce + 1
  );
  let destinationIndexInFlightsTab = html.indexOf(
    flight.destination,
    destinationIndexInSpecialAnnounce + 1
  );
  let terminalIndexInFlightsTab = html.indexOf(
    flight.terminal,
    terminalIndexInSpecualAnnounce + 1
  );
  expect(numberIndexInFlightsTab).toEqual(-1);
  expect(destinationIndexInFlightsTab).toEqual(-1);
  expect(terminalIndexInFlightsTab).toEqual(-1);
}

function flightIsNotDisplayed(flight: Flight, html: string) {
  let numberIndexInTab = html.indexOf(flight.number);
  let destinationIndexInTab = html.indexOf(flight.destination);
  let terminalIndexInTab = html.indexOf(flight.terminal);
  expect(numberIndexInTab).toEqual(-1);
  expect(destinationIndexInTab).toEqual(-1);
  expect(terminalIndexInTab).toEqual(-1);
}

describe("FlightCoordinator", () => {
  it("Should work with WebApp", () => {
    let display = new WebAppFlightsDisplay();
    let coordinator = new FlightsCoordinator(display);

    coordinator.addFlight(flights[0]);
    let html = display.htmlOutput();

    // New Flight should be in both special Announce and flight tabs;
    flightIsInBothAnnounceAndTab(flights[0], html);

    coordinator.addFlight(flights[1]);
    html = display.htmlOutput();
    flightIsInBothAnnounceAndTab(flights[1], html);
    flightIsOnlyInTab(flights[0], html);

    coordinator.removeFlight(flights[0].number);
    html = display.htmlOutput();
    flightIsOnlyInAnnounce(flights[0], html);
    flightIsOnlyInTab(flights[1], html);

    coordinator.addFlight(flights[2]);
    html = display.htmlOutput();
    flightIsInBothAnnounceAndTab(flights[2], html);
    flightIsOnlyInTab(flights[1], html);
    flightIsNotDisplayed(flights[0], html);
  });

  it("Should also work with FIDS", () => {
    let display = new FIDS();
    let coordinator = new FlightsCoordinator(display);

    coordinator.addFlight(flights[0]);
    let lines = display.outputLines();

    expect(lines[0]).toEqual([
      // I   n    c   o    m    i    n    g    SP
      73,
      110,
      99,
      111,
      109,
      105,
      110,
      103,
      32,
      // f   l     i    g    h    t    SP
      102,
      108,
      105,
      103,
      104,
      116,
      32,
      // Flight number
      flights[0].number.charCodeAt(0),
      flights[0].number.charCodeAt(1),
      flights[0].number.charCodeAt(2),
      flights[0].number.charCodeAt(3),
      flights[0].number.charCodeAt(4),
      flights[0].number.charCodeAt(5),
      // SP f r EOL
      32,
      102,
      114,
    ]);
  });
});
