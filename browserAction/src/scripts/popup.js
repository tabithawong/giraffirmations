function isFrogHidden() {
    const frog = document.getElementById('frog')
    const style = window.getComputedStyle(frog)
    frog.style.display = (style.display === 'none') ? 'block' : 'none'
}

function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {fireContentScript: true, type: 'fireContentScript' })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clickMe').addEventListener("click", isFrogHidden)
    document.getElementById('fireContentScript').addEventListener("click", fireContentScript)
})

// array of quotes
var quotes = ["I am grateful for...", "What would make today great?", "Daily affirmations: I am...", "3 Amazing things that happened today", "How could I have made today better?",
"What am I best at?", "What do I love doing the most?", "What are you excited about?", "LWhat do you love most about yourself?", "Who do you admire most in the world and why?", "What are 5 bucket list items for this year?", "What is your favourite food?", "What is your favourite song?", "What about your life makes you most proud?", "What is a challenge that you overcame?", "What three things could you give up that would give you more time, energy, and peace?"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];
