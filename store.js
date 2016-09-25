"use strict";

function statement(customer, movies, format) {
  if(format === 'text'){
    return statementText();
  }

  if(format === 'html'){
    return statementHtml();
  }

  function statementText(){
    let result = `Rental Record for ${customer.name}\n`;

    for (let rental of customer.rentals) {
      result += `\t${getMovie(rental).title}\t${getAmount(rental)}\n`;
    }
    result += addFooterLines(getTotalAmount(customer), getFrequentTotalRenterPoints(customer));
    return result;
  }

  function statementHtml(){
    let result = `<h1>Rental Record for ${customer.name}</h1>\n`;
    result += '<table>\n';
    for (let rental of customer.rentals) {
      result += `<tr><td>${getMovie(rental).title}</td><td>${getAmount(rental)}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<p>Amount owed is<em>${getTotalAmount(customer)}</em></p>\n`;
    result += `<p>You earned<em>${getFrequentTotalRenterPoints(customer)}</em></p>\n`;
    return result;
  }

  function getAmount(rental){
    let thisAmount = 0;

    switch (getMovie(rental).code) {
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

  function getMovie(rental){
    return movies[rental.movieID];
  }

  function getFrequentRenterPoints(rental){
    return (getMovie(rental).code === "new" && rental.days > 2) ? 2 : 1;
  }

  function addFooterLines(totalAmount, frequentTotalRenterPoints){
    let result = "";
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentTotalRenterPoints} frequent renter points\n`;
    return result;
  }

  function getTotalAmount(customer){
    let totalAmount = 0;
    for (let rental of customer.rentals) {

      totalAmount += getAmount(rental);
    }
    return totalAmount;
  }

  function getFrequentTotalRenterPoints(customer){
    let frequentTotalRenterPoints = 0;
    for (let rental of customer.rentals) {
      frequentTotalRenterPoints += getFrequentRenterPoints(rental);
    }
    return frequentTotalRenterPoints;
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

console.log(statement(customer, movies, 'text'));
console.log(statement(customer, movies, 'html'));