const Graph = require("./Dijikstra");
const Transport = require("./Transport");

class Flight {
  constructor(passengers, departureJourney, destination, vehicle) {
    this.departureJourney = departureJourney;
    this.destinationAirport = destination;
    this.passengers = passengers;
    this.vehicle = vehicle;
    this.departureAirport = "";
    this.transportMiles = 0;
    this.totalCost = 0;
    this.flights = [];
    this.nodes = [];
    this.returnJourney = {};
  }

  getDepartureData() {
    this.departureAirport = this.departureJourney[0];
    this.transportMiles = parseInt(this.departureJourney.slice(1));
  }

  addFlights(flights) {
    //method to transform flights input
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
    //removes highest distance direct duplicate flights
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
    //outputs journey data in object
    this.initialiseGraph();
    let transport = new Transport(
      this.transportMiles,
      this.passengers,
      this.vehicle
    );
    let transportCost = transport.getTransportCost();
    this.returnJourney = {
      ...this.returnJourney,
      ...transportCost,
      totalCost:
        this.totalCost === 0
          ? 0
          : this.totalCost + transportCost.vehicleReturnCost,
    };
    return this.returnJourney;
  }

  initialiseGraph() {
    //initialise data to input in Dijikstra's algorithm, add nodes
    let routes = new Graph();
    this.nodes.forEach((node) => {
      routes.addNode(node);
    });

    this.flights.map((flight) => {
      //adds all the possible edges from the nodes with the distance to reach them
      routes.addEdge(
        flight.airportPair[0],
        flight.airportPair[1],
        flight.distance
      );
    });
    //gets outbound and inbound shortest paths
    let outbound = routes.findPathWithDijikstra(
      //refactor this section
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

    this.returnJourney = {
      outboundRoute: outboundConnects,
      outboundCost: outboundFlightCost,
      inboundRoute: inboundConnects,
      inboundCost: inboundFlightCost,
    };
  }

  getConnectingFlights(routes) {
    //data is received back in ["AB", "BC"] format so gets distance based on the airport pair key to get data in "AB800" --> "BC900"
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
    //get flight cost per passenger per mile
    if (typeof distance === "number") {
      let cost = distance * 0.1 * this.passengers;
      return cost;
    }
    return 0;
  }

  getNodes(flights) {
    //creates a array of possible nodes from the depature
    flights.forEach((flight) => {
      if (!this.nodes.includes(flight[0])) {
        this.nodes.push(flight[0]);
      }
    });
  }
}

module.exports = Flight;
