const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
 showLoadingSpinner();
  // Pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field id blank and replace it with unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  }
  else {
    authorText.textContent = quote["author"];
  }

  // Check Quote lenght to determine styling
  if (quote.quote.length > 150) {
    quoteText.classList.remove("long-quote");
    quoteText.classList.remove("longer-quote");
    quoteText.classList.add("longest-quote");

  }
  else if (quote.quote.length > 100) {
    quoteText.classList.remove("long-quote");
    quoteText.classList.remove("longest-quote");
    quoteText.classList.add("longer-quote");
  }
  else if (quote.quote.length > 50){
    quoteText.classList.remove("longer-quote");
    quoteText.classList.remove("longest-quote");
    quoteText.classList.add("long-quote");
  }
  else {
    quoteText.classList.remove("long-quote");
    quoteText.classList.remove("longer-quote");
    quoteText.classList.remove("longest-quote");
  }

  // Set Quote, Hide Loader
  removeLoadingSpinner();

  quoteText.textContent = quote["quote"];
}

// Get Quotes from API
async function getQuotes() {
 showLoadingSpinner();
  const apiUrl = "https://dummyjson.com/quotes";
  try {
    const response = await fetch(apiUrl);
    resp = await response.json();
    apiQuotes = resp["quotes"]
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(xUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
xBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();



