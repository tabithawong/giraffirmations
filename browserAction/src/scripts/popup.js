function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fireContentScript: true, type: 'fireContentScript' })
    })
}

var dayEntries = [];

function saveEntry() {
    if (document.getElementById("saveEntry").innerHTML != "Saved") {
        // creating variables for the entry, prompt, and current date
        document.getElementById("saveEntry").innerHTML = "Saved";
        var entry = document.getElementById("entry").value;
        var prompt = document.getElementById("quote").innerHTML;
        var date = new Date();
        var currentdate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getUTCFullYear();
        dayEntries.push("<strong>" + "(" + currentdate + ")" + " " + prompt + "</strong>" + "<br>" + entry);
        // resetting the text area value
        document.getElementById("entry").value = "";
        // chrome storage sync
        chrome.storage.sync.set({"entryList": dayEntries}, function() {
            console.log("added to list");
            console.log(dayEntries)
        });
    }
}

// printing each entry
function printEntries(entries) {
    entries.map(entry => {
        var div = document.createElement('div');
        div.innerHTML = entry
        document.getElementById("blanket").appendChild(div); // adding entry to blanket div
        dayEntries.unshift(entry);
        console.log(dayEntries)
    })
}

function viewPast() {
    var buttontext = document.getElementById("viewPast").innerHTML;
    // if "view past entries"
    if (buttontext === "View Past Entries") {
        document.getElementById("viewPast").innerHTML = "Hide Past Entries";
        var blanketdiv = document.createElement('div'); // creating "blanket" div to easily hide
        blanketdiv.setAttribute("id", "blanket");
        document.getElementById("Journal").appendChild(blanketdiv);
        var space = document.createElement('br');
        document.getElementById("blanket").appendChild(space); // adding a blank line after entry
        // saving the entryList
        chrome.storage.sync.get("entryList", function(items) {
            console.log(items);
            printEntries(items.entryList);
        })
    }
    // if "hide entries"
    else {
        var blanketdiv = document.getElementById("blanket");
        blanketdiv.style.display = "none";
        document.getElementById("viewPast").innerHTML = "Thanks for Viewing! 🦒";
    }  
}

// click events for buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveEntry').addEventListener("click", saveEntry)
    document.getElementById('viewPast').addEventListener("click", viewPast)
})

// array of quotes
var quotes = ["I am grateful for...", "What would make today great?", "Daily affirmations: I am...", "What are 3 amazing things that happened today?", "How could you have made today better?",
"What are you best at?", "What do you love doing the most?", "What are you excited about?", "What do you love most about yourself?", "Who do you admire most in the world and why?", "What are 5 bucket list items for this year?", "What is your favourite food?", "What is your favourite song?", "What about your life makes you most proud?", "What is a challenge that you overcame?", "What three things could you give up that would give you more time, energy, and peace?", "Who are you grateful for?", "What activities and hobbies would you miss if you were unable to do them?", "What skills or abilities are you thankful to have?", "What about the city you live in are you grateful for?", "How are things in your life today different than a year ago? What positive changes are you thankful for?"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];



var links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://open.spotify.com/playlist/4Sqm46mbSLrVK3u3E071MW?si=oPvMdSLuQm68AQISooURPA", "https://open.spotify.com/playlist/2loXjDqVyJ4rhSrsQSp6Mc?si=ic5tOFjqR5uo7X1eLO7-_g", "https://www.youtube.com/watch?v=NGC8IS4gjpM", "https://www.youtube.com/watch?v=Sdkwu2FvFfI", "https://www.youtube.com/watch?v=8rDNZ5Ebwsc"]

const links_i = Math.floor(Math.random() * links.length);
document.getElementById("links").setAttribute("href", links[links_i]);