
let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const scoreboard=document.querySelectorAll(".score-board")
const user_scorepara = document.querySelector("#user-score");
const com_scorepara = document.querySelector("#comp-score");
const message = document.querySelector("#msg");
const restart=document.querySelector("button");
restart.classList.add("hidden");

// Generate computer's choice
const gencomchoice = () => {
    const tchoice = ["rock", "scissor", "paper"];
    let compchoice = tchoice[Math.floor(Math.random() * 3)];
    console.log("Computer choice is =", compchoice);
    return compchoice;
};
//end game!!

const start=()=>{
    restart.style.display="inline";
    restart.addEventListener("click",()=>{
        choices.forEach(choice => choice.classList.remove("hidden")); 
        scoreboard.forEach(score => score.classList.remove("hidden")); 
        userscore=0;
        compscore=0;
        user_scorepara.innerText="0";
        com_scorepara.innerText="0";
        restart.style.display="none";
        choices();
        
    })
}

const end = (winner) => {
    choices.forEach(choice => choice.classList.add("hidden")); 
    scoreboard.forEach(score => score.classList.add("hidden")); 
    console.log(winner, "wins the game !!!");
    message.innerText = `${winner} wins the Game !!!`;
    start();
};

// Display winner
const showwinner = (userwin) => {
    if (userwin) {
        userscore++;
        user_scorepara.innerText = userscore;
        message.innerText = "User wins!";
        console.log("User wins");
    }else {
        compscore++;
        com_scorepara.innerText = compscore;
        message.innerText = "Computer wins!";
        console.log("Computer wins");
    }
    let winner="none";
    if (userscore === 5){
        winner = "User";
        end(winner);
    }else if (compscore === 5){
        winner = "Computer";
        end(winner);
    }

};

// Handle draw
const draw = (userchoice, compchoice) => {
    console.log("Draw! Both chose:", userchoice);
    message.innerText = "It's a draw!";
};

// Game logic
const check = (userchoice, compchoice) => {
    if (userchoice === compchoice) {
        draw(userchoice, compchoice);
        return;
    }

    let userwin = false;

    if (userchoice === "rock") {
        userwin = compchoice === "scissor";
    } else if (userchoice === "paper") {
        userwin = compchoice === "rock";
    } else if (userchoice === "scissor") {
        userwin = compchoice === "paper";
    }

    showwinner(userwin);
};

// Handle user choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        let userchoice = choice.getAttribute("id");
        console.log("User choice is:", userchoice);
        let compchoice = gencomchoice();
        check(userchoice, compchoice);
    });
});
