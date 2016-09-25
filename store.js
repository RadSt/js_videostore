"use strict";

function statement(customer, movies) {
  let totalAmount = 0;
  let frequentTotalRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of customer.rentals) {
    let movie = movies[rental.movieID];

    let thisAmount = getAmount(movie, rental);

    //add frequent renter points
    frequentTotalRenterPoints++;
    // add bonus for a two day new release rental
    if (movie.code === "new" && rental.days > 2) frequentTotalRenterPoints++;

    //print figures for this rental
    result += `\t${movie.title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentTotalRenterPoints} frequent renter points\n`;
  return result;

  function getAmount(movie, rental){
    let thisAmount = 0;

    switch (movie.code) {
      case "regular":
        thisAmount = 2;
        if (rental.days > 2) {
          thisAmount += (rental.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = rental.days * 3;
        break;
    }
    return thisAmount;
  }
}

let customer = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  }, ]
};

let movies = {
  "F001": {
    "title": "Ran",
    "code": "regular"
  },
  "F002": {
    "title": "Trois Couleurs: Bleu",
    "code": "regular"
  },
  // etc
};

console.log(statement(customer, movies));