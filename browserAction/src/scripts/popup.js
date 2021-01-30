function fireContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fireContentScript: true, type: 'fireContentScript' })
    })
}

var dayEntries = [];

function saveEntry() {
    if (document.getElementById("saveEntry").innerHTML != "Saved") {
        document.getElementById("saveEntry").innerHTML = "Saved";
        var entry = document.getElementById("entry").value;
        var prompt = document.getElementById("quote").innerHTML;
        var date = new Date();
        var currentdate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getUTCFullYear();
        dayEntries.push("<strong>" + "(" + currentdate + ")" + " " + prompt + "</strong>" + "<br>" + entry);
        console.log(dayEntries);
        document.getElementById("entry").value = "";
    }
}

function viewPast() {
    var buttontext = document.getElementById("viewPast").innerHTML;
    if (buttontext === "View Past Entries") {
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
        document.getElementById("viewPast").innerHTML = "Thanks for Viewing! 🦒";
    }  
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveEntry').addEventListener("click", saveEntry)
    document.getElementById('viewPast').addEventListener("click", viewPast)
})

// array of quotes
var quotes = ["I am grateful for...", "What would make today great?", "Daily affirmations: I am...", "What are 3 amazing things that happened today?", "How could you have made today better?",
"What am you best at?", "What do you love doing the most?", "What are you excited about?", "What do you love most about yourself?", "Who do you admire most in the world and why?", "What are 5 bucket list items for this year?", "What is your favourite food?", "What is your favourite song?", "What about your life makes you most proud?", "What is a challenge that you overcame?", "What three things could you give up that would give you more time, energy, and peace?", "Who are you grateful for?", "What activities and hobbies would you miss if you were unable to do them?", "What skills or abilities are you thankful to have?", "What about the city you live in are you grateful for?", "How are things in your life today different than a year ago? What positive changes are you thankful for?", "What elements of nature are you grateful for and why?", "What's something you're grateful to have learned this week?", "When was the last time you laughed uncontrollably? Relive the memory!", "Describe your happiest childhood memory?", "What is the biggest accomplishment in your life?", "Describe your favourite pet, or favourite animal!", "Who is a teacher or mentor that has made an impact on your life and how did they help you?", "Describe your favourite location in your house and why?", "What is your favourite book and why?", "What made you smile in the last 24 hours and why?", "What is a recent purchase that has added value to your life?", "List 3 ways you can share your ggratitude with other people in the next 24 hours!", "Describe your favourite smell!", "Describe your favourite sound.", "My favourite sight is...", "My favourite taste is...", "My favourite feeling is...", "How can I pamper myself in the next 24 hours?", "Name and write about someone you've never met, but who has helped your life in some way.", "What do people like about you?", "Name 3 skills you have that most people don't possess.", "What is your favourite holiday and why?", "My favourite movie is ... because ...", "What is your favourite TV show and why?", "What do you love most about your country?", "What is today's weather and what is something positive about it?", "Write about a time when a stranger did something nice for you.", "What is the hardest thing you've had to do, which led to a major personal accomplishment?", "List 3 things you take for granted, which might not be available to people in other parts of the world!", "What is your favourite habbit and why is it part of your routine?", "Describe a 'perfect day' that you recently had.", "Describe a funny YouTube video that you recently watched.", "What was something you did for the first time recently?"];

// random quote index
const quotes_i = Math.floor(Math.random() * quotes.length);
// set a quote
document.getElementById("quote").innerHTML = quotes[quotes_i];
