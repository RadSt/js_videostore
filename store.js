"use strict";

function statementText(customer, movies) {

  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
    result += `\t${getMovie(rental, movies).title}\t${getAmount(rental, movies)}\n`;
  }
  result += addFooterLines(getTotalAmount(customer, movies), getFrequentTotalRenterPoints(customer, movies));
  return result;
}

function statementHtml(customer, movies) {

  let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
  result += '<table>\n';
  for (let rental of customer.rentals) {
    result += `<tr><td>${getMovie(rental, movies).title}</td><td>${getAmount(rental, movies)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is<em>${getTotalAmount(customer, movies)}</em></p>\n`;
  result += `<p>You earned<em>${getFrequentTotalRenterPoints(customer, movies)}</em></p>\n`;
  return result;
}

function getMovie(rental, movies){
  return movies[rental.movieID];
}

function getAmount(rental, movies){
  let thisAmount = 0;

  switch (getMovie(rental, movies).code) {
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

function getFrequentRenterPoints(rental, movies){
  return (getMovie(rental, movies).code === "new" && rental.days > 2) ? 2 : 1;
}

function addFooterLines(totalAmount, frequentTotalRenterPoints){
  let result = "";
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentTotalRenterPoints} frequent renter points\n`;
  return result;
}

function getTotalAmount(customer, movies){
  let totalAmount = 0;
  for (let rental of customer.rentals) {

    totalAmount += getAmount(rental, movies);
  }
  return totalAmount;
}

function getFrequentTotalRenterPoints(customer, movies){
  let frequentTotalRenterPoints = 0;
  for (let rental of customer.rentals) {
    frequentTotalRenterPoints += getFrequentRenterPoints(rental, movies);
  }
  return frequentTotalRenterPoints;
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

console.log(statementText(customer, movies));
console.log(statementHtml(customer, movies));