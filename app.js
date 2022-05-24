"use strict";
let 
    cont1 = document.getElementById('continue1'),
    cont2 = document.getElementById('continue2'),
    reSelect = document.getElementById('reselect-players'),
    playAgain = document.getElementById('start-again'),
    initiate = document.getElementById('start-battle');

// Function that activate the start button
function getStarted() {
    let startPage = document.getElementById('firstPage'),
        startBtn = document.getElementById('start-button');
    startBtn.onclick = function() {
        startPage.style.display = "none";
        player1.style.display = "block";
    };
};
getStarted();

// Function that initiates player 1 input
let     player1 = document.getElementById('first-player'),
        player2 = document.getElementById('second-player'),  
        users = document.getElementsByClassName('username'),
        form1 = document.getElementById('form1'),
        player = [];
        
function firstForm() {
    // Function that fetches users data from input
    (async() => {
        let response = await fetch("https://api.github.com/users/" + users[0].value);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        player1.style.display = "none";
        player2.style.display = "block";
        return response.json()
            .then((data) => {
                // Log the data to the console
                console.log(data);
                player[0] = data;
            });

    })().catch(function(err) {
        document.getElementById("error-message").innerHTML=(`User not found, Please try again!`);
        form1.reset();
        console.log(err);
    })
    return false;
};

// Function that initiates player 2 input
function secondForm() {
    let confirmPage = document.getElementById('confirm-page'),
    form2 = document.getElementById('form2');
// Function that fetches users data from input
    (async() => {
        let response = await fetch("https://api.github.com/users/" + users[1].value);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        player2.style.display = "none";
        confirmPage.style.display = "block";
        return response.json()
            .then((data) => {
                // Log the data to the console
                console.log(data);
                player[1] = data;
            });

    })().catch(function(err) {
        document.getElementById("error-message2").innerHTML=(`User not found, Please try again!`);
        form2.reset();
        console.log(err);
    });

    //function that calculate users scores
    function calculateScores(data) {
        return (1 * data.followers + 1 * data.following + 0.5 * data.public_repos);
    };

    //function that create user profile
    function userProfile(data, num) {
        return `<div id="user-container" class="myUser"></div>
                            <ul>
                                <p class="playersDetails"> Player ${num} </p>
                                <li class="score">Score: <span class="totalScr"> ${calculateScores(data)}</span> </li>
                                <li><img class="avatar" src="${data.avatar_url}"></li>
                                <li class="detail">Name: ${data.name} </li>
                                <li class="detail">Username: ${data.login} </li>
                                <li class="detail">Following: ${data.following} </li>
                                <li class="detail">Followers: ${data.followers} </li>
                                <li class="details">Public repo: ${data.public_repos} </li>
                            </ul>
                        </div>`;
    }

    setTimeout(function() {
            document.getElementById('result').innerHTML = userProfile(player[0], 1) + userProfile(player[1], 2);
            document.getElementById('control-buttons').style.display = "block";
        },
        2000);
    playAgain.style.display = "none";
    return false;
};

//Function that assign users score and winner
initiate.onclick = function() {
    document.getElementById("confirm-players").innerHTML = "Winner";
    initiate.style.display = "none";
    reSelect.style.display = "none";
    playAgain.style.display = "block";

    let totalScr = document.getElementsByClassName("totalScr"),
        totalScr1 = parseFloat(totalScr[0].innerText),
        totalScr2 = parseFloat(totalScr[1].innerText);

    if (totalScr1 > totalScr2) {
        document.getElementsByClassName("playersDetails")[0].innerHTML = "Winner";
        document.getElementsByClassName("playersDetails")[1].innerHTML = "Loser";

    } else if (totalScr1 < totalScr2) {
        document.getElementsByClassName("playersDetails")[0].innerHTML = "Loser";
        document.getElementsByClassName("playersDetails")[1].innerHTML = "Winner";
    } else {
        confirm("DRAW, PLAY AGAIN");
    };


    let scores = document.querySelectorAll(".score");
    scores[0].style.display = "block";
    scores[1].style.display = "block";
};

reSelect.onclick = function() {
    document.getElementById('confirm-page').style.display = "none";
    player1.style.display = "block";
    users[0].value = null;
    users[1].value = null;
};

playAgain.onclick = function() {
    //Make this function start the game again, following the usual pattern
    location.reload();
}