function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fireContentScript: true, type: 'fireContentScript' })
    })
}

var dayEntries = [];

function saveEntry() {
    if (document.getElementById("saveEntry").value === "Saved") {
    } else {
    document.getElementById("saveEntry").innerHTML = "Saved";
    var entry = document.getElementById("entry").value;
    dayEntries.push(entry);
    console.log(dayEntries);
    document.getElementById("entry").value = "";
    }
}

function viewPast() {
    var buttontext = document.getElementById("viewPast").innerHTML;
    if (buttontext != "Hide Past Entries") {
        document.getElementById("viewPast").innerHTML = "Hide Past Entries";
        var blanketdiv = document.createElement('div');
        blanketdiv.setAttribute("id", "blanket");
        document.getElementById("Journal").appendChild(blanketdiv);
        var space = document.createElement('br');
        document.getElementById("blanket").appendChild(space); //adding a blank line after
        for (i = 0; i < dayEntries.length; i++) {
            var div = document.createElement('div');
            div.innerHTML = dayEntries[i];
            document.getElementById("blanket").appendChild(div); //creating div with entry
        }
    }
    else {
        var blanketdiv = document.getElementById("blanket");
        blanketdiv.style.display = "none";
        document.getElementById("viewPast").innerHTML = "Thanks for Viewing!";
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveEntry').addEventListener("click", saveEntry)
    document.getElementById('viewPast').addEventListener("click", viewPast)
})

// array of quotes
var quotes = ["I am grateful for...", "What would make today great?", "Daily affirmations: I am...", "What are 3 amazing things that happened today?", "How could you have made today better?",
"What am you best at?", "What do you love doing the most?", "What are you excited about?", "What do you love most about yourself?", "Who do you admire most in the world and why?", "What are 5 bucket list items for this year?", "What is your favourite food?", "What is your favourite song?", "What about your life makes you most proud?", "What is a challenge that you overcame?", "What three things could you give up that would give you more time, energy, and peace?"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];
