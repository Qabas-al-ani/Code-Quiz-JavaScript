// Declaring questions array that have an object for each question.
var questionsArray = [
  {
    question:
      "What is the HTML tag under which one can write the JavaScript code?",
    answers: [`<javascript>`, `<scripted>`, `<script>`, `<js>`],
    correctAnswer: `<script>`,
  },
  {
    question: `Choose the correct JavaScript syntax to change the content of the following HTML code.
    <p id="programmer">programmers are awesome!</p>`,
    answers: [
      `document.getElement("programmer").innerHTML="I am a programmer";`,
      `document.getElementById("programmer").innerHTML="I am a programmer";`,
      `document.getId("programmer")="I am a programmer";`,
      `document.getElementById("programmer").innerHTML=I am a programmer;`,
    ],
    correctAnswer: `document.getElementById("programmer").innerHTML="I am a programmer";`,
  },
  {
    question: `Which of the following is the correct syntax to display "programmers are awesome!" in an alert box using JavaScript?`,
    answers: [
      `alertbox("programmers are awesome!");`,
      `msg("programmers are awesome!");`,
      ` msgbox("programmers are awesome!")`,
      `alert("programmers are awesome!");`,
    ],
    correctAnswer: `alert("programmers are awesome!");`,
  },
  {
    question: `What is the correct syntax for referring to an external script called "programmer.js"?`,
    answers: [
      `<script src="programmer.js">`,
      `<script href="programmer.js">`,
      `<script ref="programmer.js">`,
      ` <script name="programmer.js">`,
    ],
    correctAnswer: `<script src=”programmer.js”>`,
  },
];

// Declaring global variables
var score = 0;
var questionIndex = 0;
var penalty = 25;
timeInterval = 0;
var timeLeft = 100;
var remainingTime = 0;

// Declaring variables for elements that will be used
var timerSpanElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var questionsDivElement = document.getElementById("questions-div");
var highScoresDivElement = document.getElementById("high-scores");

// Gave some styling to the main div using bootstrap
questionsDivElement.setAttribute(
  "class",
  "w-50 position-absolute top-50 start-50 translate-middle h3"
);

// I created elements for the questions
var quizUlElement = document.createElement("ul");
var h1Element = document.createElement("h1");
var inputElement = document.createElement("input");

quizUlElement.setAttribute("class", "ps-0 mt-3");

// Added an event listener to the start button
startButton.addEventListener("click", startGame);

// This function will start the game and trigger the timer.
function startGame() {
  timeInterval = setInterval(() => {
    if (timeLeft > 1) {
      timerSpanElement.textContent = "Time: " + timeLeft + " Seconds Seft";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerSpanElement.textContent = "Time: " + timeLeft + " Second Left";
      timeLeft--;
    } else {
      timerSpanElement.textContent = "";
      clearInterval(timeInterval);
      finishGame();
    }
  }, 1000);
  renderQuestionsAndAnswers(questionIndex);
}

// This function will render the questions and answers
function renderQuestionsAndAnswers(questionIndex) {
  questionsDivElement.textContent = "";
  quizUlElement.textContent = "";

  //  Using for loop to go through all the info in the array
  for (var i = 0; i < questionsArray.length; i++) {
    var userQuestion = questionsArray[questionIndex].question;
    var userChoices = questionsArray[questionIndex].answers;

    questionsDivElement.textContent = userQuestion;
  }
  //  For each was used to create, append and add an event listener to each of the li's.
  userChoices.forEach((item) => {
    var liElement = document.createElement("li");

    liElement.setAttribute("class", "p-2 mb-2 bg-primary text-white fs-5");
    liElement.textContent = item;
    questionsDivElement.appendChild(quizUlElement);
    quizUlElement.appendChild(liElement);

    liElement.addEventListener("click", compareAnswers);
  });
}

// This function will compare if the answers are correct or Wrong!
function compareAnswers(event) {
  var choice = event.target;

  if (choice.matches("li")) {
    var notificationElement = document.createElement("div");
    notificationElement.setAttribute("id", "notificationElement");
    notificationElement.setAttribute("class", "fs-5");

    // to check the correct answer
    if (choice.textContent === questionsArray[questionIndex].correctAnswer) {
      score++;
      notificationElement.textContent = "Correct!";
    } else {
      // if the answer is wrong will take off 25 seconds of the remaning time
      timeLeft -= penalty;
      notificationElement.textContent = "Wrong!";
    }
  }
  // To increment question index
  questionIndex++;

  //To check if there are no more questions and finish the game
  if (questionIndex >= questionsArray.length) {
    finishGame();
    notificationElement.textContent =
      "You answered all questions, and you got " +
      score +
      " Out of " +
      questionsArray.length +
      ".";
  } else {
    renderQuestionsAndAnswers(questionIndex);
  }
  questionsDivElement.appendChild(notificationElement);
}

//  To finish the game
function finishGame() {
  questionsDivElement.textContent = "";
  timerSpanElement.textContent = "";
  highScoresDivElement.textContent = "";
  highScoresDivElement.setAttribute("class", "d-none");

  // To create the heading

  h1Element.setAttribute("id", "h1Element");
  h1Element.textContent = "All done!";

  questionsDivElement.appendChild(h1Element);

  // To check if there is any time left and save as a variables
  if (timeLeft >= 0) {
    remainingTime = timeLeft;
    clearInterval(timeInterval);

    // to creat a paragraph
    var pElement = document.createElement("p");
    pElement.setAttribute("id", "pElement");

    pElement.textContent = "Your final score is: " + remainingTime + ".";

    questionsDivElement.appendChild(pElement);
  }

  //  To create the form
  var labelElement = document.createElement("label");
  var submitButton = document.createElement("button");

  labelElement.setAttribute("id", "labelElement");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("id", "user-name");
  inputElement.setAttribute("class", "form-control w-75 flex");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "submit");
  submitButton.setAttribute("class", "btn btn-primary");

  labelElement.textContent = "Enter initials: ";
  inputElement.textContent = "";
  submitButton.textContent = "Submit";

  questionsDivElement.appendChild(labelElement);
  questionsDivElement.appendChild(inputElement);
  questionsDivElement.appendChild(submitButton);

  // Added an event listiner to capture initials and save them with the score to the local storage.
  submitButton.addEventListener("click", saveGame);
  // This Function will save the initials and scores to the local storage and triggers the render score function
  function saveGame() {
    var initials = inputElement.value;

    if (initials === "") {
      document.getElementById("user-name").placeholder =
        "Enter your initials please";
    } else {
      var finalScore = {
        initials: initials,
        score: remainingTime,
      };

      var highScores = localStorage.getItem("highScores");
      if (highScores === null) {
        highScores = [];
      } else {
        highScores = JSON.parse(highScores);
      }

      highScores.push(finalScore);

      var newScore = JSON.stringify(highScores);
      localStorage.setItem("highScores", newScore);

      renderHighScores();
    }
  }
}
// This function will render high score page
function renderHighScores() {
  highScoresDivElement.textContent = "";
  questionsDivElement.textContent = "";
  quizUlElement.textContent = "";
  timerSpanElement.textContent = "";

  highScoresDivElement.setAttribute("class", "d-none");
  clearInterval(timeInterval);

  var goBackButton = document.createElement("button");
  var clearButton = document.createElement("button");

  goBackButton.setAttribute("onclick", "goBack()");
  goBackButton.setAttribute("class", "btn btn-primary me-5");

  clearButton.setAttribute("onclick", "clearHighScores()");
  clearButton.setAttribute("class", "btn btn-primary");

  h1Element.textContent = "Highscores";
  goBackButton.textContent = "Go Back";
  clearButton.textContent = "Clear Highscores";

  questionsDivElement.appendChild(h1Element);
  questionsDivElement.appendChild(quizUlElement);

  questionsDivElement.appendChild(goBackButton);
  questionsDivElement.appendChild(clearButton);

  let highScores = localStorage.getItem("highScores");
  highScores = JSON.parse(highScores);

  if (highScores !== null) {
    for (let i = 0; i < highScores.length; i++) {
      var liForHighScores = document.createElement("li");
      liForHighScores.textContent =
        highScores[i].initials + " " + highScores[i].score;
      liForHighScores.setAttribute(
        "class",
        "p-2 mb-2 bg-primary text-white fs-5"
      );

      quizUlElement.appendChild(liForHighScores);
    }
  }
}
// This function will restart the game
function goBack() {
  location.reload();
}
// This function will clear the local storage
function clearHighScores() {
  localStorage.clear();
  renderHighScores();
}
