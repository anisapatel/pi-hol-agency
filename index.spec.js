const Flight = require("./index.js");

describe("Flight", () => {
  let flights = [
    "AB800",
    "BC900",
    "CD400",
    "DE400",
    "BF400",
    "CE300",
    "DE300",
    "EB600",
    "CE200",
    "DC700",
    "EB500",
    "FD200",
  ];
  test("getFlightJourney 1: 2 passengers, B20, D, Car", () => {
    const testFlight = new Flight(2, "B20", "D", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney()).toEqual({
      inboundCost: 160,
      inboundRoute: "DE300 --> EB500",
      outboundCost: 120,
      outboundRoute: "BF400 --> FD200",
      totalCost: 291,
      vehicle: "Car",
      vehicleReturnCost: 11,
    });
  });
  test("getFlightJourney 2: 1 passenger, B30, D, Car", () => {
    const testFlight = new Flight(1, "B30", "D", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "BF400 --> FD200"
    );
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "DE300 --> EB500"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(155);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(80);
  });
  test("getFlightJourney 3: 2 passengers, A20, D, Car", () => {
    const testFlight = new Flight(2, "A20", "D", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "AB800 --> BF400 --> FD200"
    );
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "No inbound flight"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(0);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(0);
  });
  test("getFlightJourney 4: 2 passengers, C30, A, Car", () => {
    const testFlight = new Flight(2, "C30", "A", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "No outbound flight"
    );
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "AB800 --> BC900"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(0);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(340);
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(15);
  });
  test("getFlightJourney 5: 2 passengers, B10, C, Taxi", () => {
    const testFlight = new Flight(2, "B10", "C", "Taxi");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual("BC900");
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "CE200 --> EB500"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(328);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(140);
    expect(testFlight.getFlightJourney().vehicle).toEqual("Taxi");
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(8);
  });
  test("getFlightJourney 6: 5 passengers, B10, C, Taxi", () => {
    const testFlight = new Flight(5, "B10", "C", "Taxi");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual("BC900");
    expect(testFlight.getFlightJourney().outboundCost).toEqual(450);
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "CE200 --> EB500"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(816);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(350);
    expect(testFlight.getFlightJourney().vehicle).toEqual("Taxi");
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(16);
  });
  test("getFlightJourney 7: 1 passenger, D25, B, Car", () => {
    const testFlight = new Flight(1, "D25", "B", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "DE300 --> EB500"
    );
    expect(testFlight.getFlightJourney().outboundCost).toEqual(80);
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "BF400 --> FD200"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(153);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(60);
    expect(testFlight.getFlightJourney().vehicle).toEqual("Car");
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(13);
  });
  test("getFlightJourney 8: 4 passengers, D40, A, Car", () => {
    const testFlight = new Flight(4, "D40", "A", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "No outbound flight"
    );
    expect(testFlight.getFlightJourney().outboundCost).toEqual(0);
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "AB800 --> BF400 --> FD200"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(0);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(560);
    expect(testFlight.getFlightJourney().vehicle).toEqual("Car");
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(19);
  });
  test("getFlightJourney 9: 2 passengers, B5, D, Car", () => {
    const testFlight = new Flight(2, "B5", "D", "Car");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "BF400 --> FD200"
    );
    expect(testFlight.getFlightJourney().outboundCost).toEqual(120);
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "DE300 --> EB500"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(285);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(160);
    expect(testFlight.getFlightJourney().vehicle).toEqual("Car");
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(5);
  });
  test("getFlightJourney 10: 9 passengers, B30, D, Taxi", () => {
    const testFlight = new Flight(9, "B30", "D", "Taxi");
    testFlight.addFlights(flights);
    testFlight.addNodes(flights);
    testFlight.addDepartureData();
    expect(testFlight.getFlightJourney().outboundRoute).toEqual(
      "BF400 --> FD200"
    );
    expect(testFlight.getFlightJourney().outboundCost).toEqual(540);
    expect(testFlight.getFlightJourney().inboundRoute).toEqual(
      "DE300 --> EB500"
    );
    expect(testFlight.getFlightJourney().totalCost).toEqual(1332);
    expect(testFlight.getFlightJourney().inboundCost).toEqual(720);
    expect(testFlight.getFlightJourney().vehicle).toEqual("Taxi");
    expect(testFlight.getFlightJourney().vehicleReturnCost).toEqual(72);
  });
});
