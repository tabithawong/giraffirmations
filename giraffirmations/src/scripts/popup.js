function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fireContentScript: true, type: 'fireContentScript' })
    })
}

var dayEntries = [];

// date format option constants
const options = {
    year: "2-digit",
    month:"2-digit",
    day:"2-digit",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit"
}


// saves a new entry
function saveEntry() {
    if (document.getElementById("saveEntry").innerHTML != "Saved") {
        // creating variables for the entry, prompt, and current date
        document.getElementById("saveEntry").innerHTML = "Saved";
        var entry = document.getElementById("entry").value;
        var prompt = document.getElementById("quote").innerHTML;
        var date = new Date();
        var currentdate = date.toLocaleDateString("en-US",options);
        dayEntries.push("<strong>" + "(" + currentdate + ")" + " " + prompt + "</strong>" + "<br>" + entry);
        // resetting the text area value
        document.getElementById("entry").value = "";
        // chrome storage sync
        chrome.storage.sync.get({"entryList": dayEntries}, function() {
            console.log(dayEntries);
        })
        chrome.storage.sync.set({"entryList": dayEntries}, function() {
            console.log(dayEntries);
        })
    }
}

// printing each entry
function printEntries(entries) {
    entries.map(entry => {
        var div = document.createElement('div');
        div.setAttribute("id", "blanketchild");
        div.innerHTML = entry;
        document.getElementById("blanket").appendChild(div); // adding entry to blanket div
        dayEntries.unshift(entry);
        console.log(dayEntries);
    })
}

// viewing past entry
function viewPast() {
    var buttontext = document.getElementById("viewPast").innerHTML;
    // if "view past entries"
    if (buttontext === "View Last Entry") {
        document.getElementById("viewPast").innerHTML = "Hide Last Entry";
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
    else if (buttontext === "Hide Last Entry") {
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
"What are you best at?", "What do you love doing the most?", "What are you excited about?", "What do you love most about yourself?", "Who do you admire most in the world and why?", "What are 5 bucket list items for this year?", "What is your favourite food?", "What is your favourite song?", "What about your life makes you most proud?", "What is a challenge that you overcame?", "What three things could you give up that would give you more time, energy, and peace?", "Who are you grateful for?", "What activities and hobbies would you miss if you were unable to do them?", "What skills or abilities are you thankful to have?", "What about the city you live in are you grateful for?", "How are things in your life today different than a year ago? What positive changes are you thankful for?", "What elements of nature are you grateful for and why?", "What's something you're grateful to have learned this week?", "When was the last time you laughed uncontrollably? Relive the memory!", "Describe your happiest childhood memory.", "What is the biggest accomplishment in your life?", "Describe your favourite pet, or favourite animal", "Who is a teacher or mentor that has made an impact on your life and how did they help you?", "Describe your favourite location in your house and why?", "What is your favourite book and why?", "What made you smile in the last 24 hours and why?", "What is a recent purchase that has added value to your life?", "List 3 ways you can share your ggratitude with other people in the next 24 hours!", "Describe your favourite smell!", "Describe your favourite sound.", "My favourite sight is...", "My favourite taste is...", "My favourite feeling is...", "How can I pamper myself in the next 24 hours?", "Name and write about someone you've never met, but who has helped your life in some way.", "What do people like about you?", "Name 3 skills you have that most people don't possess.", "What is your favourite holiday and why?", "My favourite movie is ... because ...", "What is your favourite TV show and why?", "What do you love most about your country?", "What is today's weather and what is something positive about it?", "Write about a time when a stranger did something nice for you.", "What is the hardest thing you've had to do, which led to a major personal accomplishment?", "List 3 things you take for granted, which might not be available to people in other parts of the world!", "What is your favourite habbit and why is it part of your routine?", "Describe a 'perfect day' that you recently had.", "Describe a funny YouTube video that you recently watched.", "What was something you did for the first time recently?"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];


var links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://open.spotify.com/playlist/4Sqm46mbSLrVK3u3E071MW?si=oPvMdSLuQm68AQISooURPA", "https://open.spotify.com/playlist/2loXjDqVyJ4rhSrsQSp6Mc?si=ic5tOFjqR5uo7X1eLO7-_g", "https://www.youtube.com/watch?v=NGC8IS4gjpM", "https://www.youtube.com/watch?v=Sdkwu2FvFfI", "https://www.youtube.com/watch?v=8rDNZ5Ebwsc", "https://open.spotify.com/playlist/1NCJd5pQ36pG3ve875SS67?si=WW4SJrlSTtmYvdMmPNU7lw", "https://www.youtube.com/watch?v=kewXtkGmDtw", "https://www.youtube.com/watch?v=dwdCNhrljeM", "https://www.youtube.com/watch?v=4DcGBE-F9hk"]

const links_i = Math.floor(Math.random() * links.length);
document.getElementById("links").setAttribute("href", links[links_i]);