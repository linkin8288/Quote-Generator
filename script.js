// Create Interactive Listeners to connect the HTML element by ID
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quotes From API
let apiQuotes = [];
// Show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show New Quote
function generateNewQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author value is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    // store the author data from request of API in content of author in HTML
    authorText.textContent = quote.author;
  }
  // Check Qutoe length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // store the quote data in content from request of API of author in HTML
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get request from API
async function getApiQuotes() {
  showLoadingSpinner();

  const apiUrl = "https://type.fit/api/quotes";
  try {
    // response only return when there are something exist
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    generateNewQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote and open it at new window
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners (click and trigger the function)
newQuoteBtn.addEventListener("click", generateNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getApiQuotes();
