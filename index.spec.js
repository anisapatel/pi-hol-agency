const { expect } = require("chai");
const { getPossibleRoutes } = require("./index.js");

describe("getPossibleRoutes", () => {
  it("if passed no flights, return empty routes array", () => {
    let flights = [];
    let departureAirport = "B20";
    let destinationAirport = "D";
    expect(
      getPossibleRoutes(flights, departureAirport, destinationAirport)
    ).to.eql([]);
  });
  it("if passed flights, matches the destination and departure airport to flight route", () => {
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
    let departureAirport = "A20";
    let destinationAirport = "B";
    expect(
      getPossibleRoutes(flights, departureAirport, destinationAirport)
    ).to.eql(["AB800"]);
  });
  it("if passed flights, matches the destination and departure airport to flight route with the lowest distance", () => {
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
    let departureAirport = "C20";
    let destinationAirport = "E";
    expect(
      getPossibleRoutes(flights, departureAirport, destinationAirport)
    ).to.eql(["CE200"]);
  });
  it("if passed flights, return possible connecting routes", () => {
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
    let departureAirport = "B20";
    let destinationAirport = "D";
    expect(
      getPossibleRoutes(flights, departureAirport, destinationAirport)
    ).to.eql(["BF400", "FD200"]);
  });
});
