function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fireContentScript: true, type: 'fireContentScript' })
    })
}
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// array of quotes
var quotes = ["I am grateful for...", "What would make today great?", "Daily affirmations: I am...", "3 Amazing things that happened today", "How could I have made today better?",
"What am I best at?", "What do I love doing the most?", "What are you excited about?", "LWhat do you love most about yourself?", "Who do you admire most in the world and why?", "What are 5 bucket list items for this year?", "What is your favourite food?", "What is your favourite song?", "What about your life makes you most proud?", "What is a challenge that you overcame?", "What three things could you give up that would give you more time, energy, and peace?"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];

