class Transport {
  constructor(journeyMiles, passengers) {
    this.journeyMiles = journeyMiles;
    this.passengers = passengers;
    this.taxiCost = 0;
    this.carCost = 0;
  }

  calculateTaxiCost() {
    let miles = this.journeyMiles * 2;
    let costPerMile = 0.4;
    if (this.passengers <= 4) {
      this.taxiCost = miles * costPerMile;
    } else {
      let taxis = Math.round(Math.ceil(this.passengers / 4));
      let totalMiles = taxis * miles;
      this.carCost = totalMiles * costPerMile;
    }
  }

  calculateCarCost() {
    let miles = this.journeyMiles * 2;
    let costPerMile = 0.2;
    let parkingFee = 3;
    if (this.passengers <= 4) {
      this.carCost = miles * costPerMile + parkingFee;
    } else {
      let cars = Math.round(Math.ceil(this.passengers / 4));
      let totalParking = cars * parkingFee;
      let totalMiles = cars * miles;
      this.carCost = totalMiles * costPerMile + totalParking;
    }
  }

  getCheapestTransport() {
    if (this.calculateTaxiCost < this.calculateCarCost()) {
      return { vehicle: "Taxi", vehicleReturnCost: this.taxiCost };
    } else {
      return { vehicle: "Car", vehicleReturnCost: this.carCost };
    }
  }
}

module.exports = Transport;
