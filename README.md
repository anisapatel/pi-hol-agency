# pi-hol-agency

## Getting Started

Clone this repo:

```bash
git clone https://github.com/anisapatel/pi-hol-agency.git


```

Install the dependencies:

`npm i`

Run tests

`npm run test`

## What went well

- Calculates shortest flight path outbound and inbound flight route BF400 --> FD200
- Calculates Taxi/Car depending on vehicle input
- Returns total cost

## Improvements to do/Next Steps with more time

- Extract error handling functionality out before shortest path recieved from the algorithm
- Refactor the error handling for getting no routes and distances
- Refactor error handling for total cost
- Merge outbound/inbound data to pass into the get connecting flights and flight costs function -> DRY code
- Test and extract data manipulation utility functions out of classes
- Add tests for the individual methods and properties of the Flight Class
- Test Transport class
- Create a command line tool interface or alternatively a web interface to get inputs
