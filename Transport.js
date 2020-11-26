class Transport {
  constructor(journeyMiles, passengers, vehicle) {
    this.journeyMiles = journeyMiles;
    this.passengers = passengers;
    this.vehicle = vehicle;
    this.taxiCost = 0;
    this.carCost = 0;
  }

  calculateTaxiCost() {
    let miles = this.journeyMiles * 2;
    let costPerMile = 0.4;
    if (this.passengers <= 4) {
      this.transportCost = miles * costPerMile;
    } else {
      let taxis = Math.round(Math.ceil(this.passengers / 4));
      let totalMiles = taxis * miles;
      this.transportCost = totalMiles * costPerMile;
    }
  }

  calculateCarCost() {
    let miles = this.journeyMiles * 2;
    let costPerMile = 0.2;
    let parkingFee = 3;
    if (this.passengers <= 4) {
      this.transportCost = miles * costPerMile + parkingFee;
    } else {
      let cars = Math.round(Math.ceil(this.passengers / 4));
      let totalParking = cars * parkingFee;
      let totalMiles = cars * miles;
      this.transportCost = totalMiles * costPerMile + totalParking;
    }
  }

  getTransportCost() {
    if (this.vehicle === "Taxi") {
      this.calculateTaxiCost();
    } else {
      this.calculateCarCost();
    }

    return { vehicle: this.vehicle, vehicleReturnCost: this.transportCost };
  }
}

module.exports = Transport;
