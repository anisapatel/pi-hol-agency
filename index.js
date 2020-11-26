const Graph = require("./Dijikstra");
const Transport = require("./Transport");

class Flight {
  constructor(passengers, departureJourney, destination) {
    this.departureJourney = departureJourney;
    this.destinationAirport = destination;
    this.passengers = passengers;
    this.departureAirport = "";
    this.transportMiles = 0;
    this.totalCost = 0;
    this.flights = [];
    this.nodes = [];
    this.flightJourney = {};
  }

  getDepartureData() {
    this.departureAirport = this.departureJourney[0];
    this.transportMiles = parseInt(this.departureJourney.slice(1));
  }

  addFlights(flights) {
    let flightArr = [];
    flights.forEach((flight) => {
      let flightObj = {
        airportPair: flight.slice(0, 2),
        distance: Number(flight.slice(2)),
      };
      flightArr.push(flightObj);
    });
    this.flights = this.getUniqueFlights(flightArr);
  }

  getUniqueFlights(flightArr) {
    return Object.values(
      flightArr.reduce((flight, currentObj) => {
        let airportPair = currentObj.airportPair;
        if (
          !flight[airportPair] ||
          flight[airportPair].distance > currentObj.distance
        ) {
          flight[airportPair] = currentObj;
        }
        return flight;
      }, {})
    );
  }

  getFlightJourney() {
    this.initialiseGraph();
    let transport = new Transport(this.transportMiles, this.passengers);
    let cheapestTransport = transport.getCheapestTransport();
    this.flightJourney = {
      ...this.flightJourney,
      ...cheapestTransport,
      totalCost:
        this.totalCost === 0
          ? 0
          : this.totalCost + cheapestTransport.vehicleReturnCost,
    };
    return this.flightJourney;
  }

  initialiseGraph() {
    let routes = new Graph();
    this.nodes.forEach((node) => {
      routes.addNode(node);
    });

    this.flights.map((flight) => {
      routes.addEdge(
        flight.airportPair[0],
        flight.airportPair[1],
        flight.distance
      );
    });

    let outbound = routes.findPathWithDijikstra(
      this.departureAirport,
      this.destinationAirport
    );

    let outboundConnects;
    let outboundFlightCost;

    if (outbound.routes.length) {
      outboundConnects = this.getConnectingFlights(outbound.routes);
      outboundFlightCost = this.getFlightCosts(outbound.distance);
    } else {
      outboundConnects = "No outbound flight";
      outboundFlightCost = 0;
    }

    let inbound = routes.findPathWithDijikstra(
      this.destinationAirport,
      this.departureAirport
    );

    let inboundConnects;
    let inboundFlightCost;

    if (inbound.routes.length) {
      inboundConnects = this.getConnectingFlights(inbound.routes);
      inboundFlightCost = this.getFlightCosts(inbound.distance);
    } else {
      inboundConnects = "No inbound flight";
      inboundFlightCost = 0;
    }

    this.totalCost =
      outboundFlightCost > 0 && inboundFlightCost > 0
        ? outboundFlightCost + inboundFlightCost
        : 0;

    this.flightJourney = {
      outboundRoute: outboundConnects,
      outboundCost: outboundFlightCost,
      inboundRoute: inboundConnects,
      inboundCost: inboundFlightCost,
    };
  }

  getConnectingFlights(routes) {
    let connects = [];
    routes.forEach((airport) => {
      this.flights.map((flight) => {
        if (flight.airportPair === airport) {
          connects.push(`${airport}${flight.distance}`);
        }
      });
    });
    return connects.join(" --> ");
  }

  getFlightCosts(distance) {
    if (typeof distance === "number") {
      let cost = distance * 0.1 * this.passengers;
      return cost;
    }
    return 0;
  }

  getNodes(flights) {
    flights.forEach((flight) => {
      if (!this.nodes.includes(flight[0] || flight[1])) {
        this.nodes.push(flight[0] || flight[1]);
      }
    });
  }
}

module.exports = Flight;
