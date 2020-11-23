const getPossibleRoutes = (flights, departureJourney, destinationAirport) => {
  if (!flights.length) return [];
  let departureAirport = departureJourney[0];
  let journeyToMatch = departureAirport + destinationAirport;
  let lowestDistance = "";
  let matches = [];
  flights.map((flight) => {
    let flightPair = flight.substring(0, 2);
    if (journeyToMatch === flightPair) {
      matches.push(flight);
      let lowestMiles = getLowestDistance(matches);
      lowestDistance = flightPair + lowestMiles;
    }
  });
  return [lowestDistance];
};

const getLowestDistance = (distanceArr) => {
  let intArr = distanceArr.map((distance) => Number(distance.slice(2)));
  return Math.min(...intArr);
};

module.exports = {
  getPossibleRoutes,
};
