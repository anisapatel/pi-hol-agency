const Graph = require("./Dijikstra");

class Flight {
  constructor() {
    this.departureAirport = "";
    this.destinationAirport = "";
    this.flights = [];
    this.nodes = [];
  }

  getDepartureAirport(departureJourney) {
    this.departureAirport = departureJourney[0];
    return this.departureAirport;
  }

  getDestinationAirport(destinationAirport) {
    this.destinationAirport = destinationAirport;
    return this.destinationAirport;
  }

  addFlights(flights) {
    flights.forEach((flight) => {
      let flightObj = {
        airportPair: flight.slice(0, 2),
        distance: Number(flight.slice(2)),
      };
      this.flights.push(flightObj);
    });
    return this.flights;
  }

  getUniqueFlights() {
    return Object.values(
      this.flights.reduce((flight, currentObj) => {
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

  getShortestFlightRoute() {
    let routes = new Graph();
    this.nodes.forEach((node) => {
      routes.addNode(node);
    });
    let flightEdges = this.getUniqueFlights(this.flights);
    flightEdges.map((flight) => {
      routes.addEdge(
        flight.airportPair[0],
        flight.airportPair[1],
        flight.distance
      );
    });

    let outboundRoute = routes.findPathWithDijikstra(
      this.departureAirport,
      this.destinationAirport
    );
    let inboundRoute = routes.findPathWithDijikstra(
      this.destinationAirport,
      this.departureAirport
    );
    console.log(outboundRoute, inboundRoute);
  }

  getNodes(flights) {
    flights.forEach((flight) => {
      if (!this.nodes.includes(flight[0] || flight[1])) {
        this.nodes.push(flight[0] || flight[1]);
      }
    });
    return this.nodes;
  }
}

// let map = new Graph();
// map.addNode("A");
// map.addNode("B");
// map.addNode("C");
// map.addNode("D");
// map.addNode("E");
// map.addNode("F");
// map.addEdge("A", "B", 800);
// map.addEdge("B", "C", 900);
// map.addEdge("C", "D", 400);
// map.addEdge("D", "E", 300); //also have 400
// map.addEdge("B", "F", 400);
// map.addEdge("C", "E", 200); //also has 300
// map.addEdge("E", "B", 500); //also has 600
// map.addEdge("D", "C", 700);
// map.addEdge("F", "D", 200);

// console.log(map.adjacencyList, "<--");
// console.log(map.findPathWithDijikstra("B", "D"), "<--result");

let flight = new Flight();
flight.getDepartureAirport("D20");
flight.getDestinationAirport("B");
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
flight.addFlights(flights);
flight.getNodes(flights);
console.log(flight.getShortestFlightRoute());
