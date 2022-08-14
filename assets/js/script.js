var questions = [
	{
		name: 'What is the name of the Unitesd States of America president?',
		options: [
			'Amber rose',
			'Josephine Biden',
			'Joe biden',
			"Michael Blackson",
		],
		answer: 'Joe Biden',
	},
	{
		name: 'Where is Mamadou From?',
		options: ['Guinea Conakry', 'Jakarta', 'Mexico', 'Afganistan'],
		answer: 'Guinea Conakry',
	},
	{
		name: ' What is one responsibility that is only for United States citizens?',
		options: ['pay taxes', 'serve on a jury', 'eat Italian', 'act careless'],
		answer: 'serve on a jury',
	},
	{
		name: "The House of Representatives has how many voting members?",
		options: ['one hundred(100)', 'two hundred(200)', 'four hundred(400)', 'four hundred thirty-five (435)'],
		answer: 'four hundred thirty-five (435)',
	},
];

// variables 
var currentQuestionIndex = 0;

var time = questions.length * 25;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var optionsEl = document.getElementById('options');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

function startQuiz() {
	// hide start Quiz
	var startQuizEl = document.getElementById('start-quiz');
	startQuizEl.classList.add('hide');

	// un-hide questions section
	questionsEl.classList.remove('hide');

	// start timer
	timerId = setInterval(clockTick, 1000);

	// show starting time
	timerEl.textContent = time;

	// get question
	nextQuestion();
}

function nextQuestion() {
	// get current question object from array
	var currentQuestion = questions[currentQuestionIndex];

	// update name with current question
	var nameEl = document.getElementById('question-name');
	nameEl.textContent = currentQuestion.name;

	// clear out any old question options
	optionsEl.innerHTML = '';

	// going over options
	for (var i = 0; i < currentQuestion.options.length; i++) {
		// create new button for each option
		var option = currentQuestion.options[i];
		var optionSet = document.createElement('button');
		optionSet.setAttribute('class', 'option');
		optionSet.setAttribute('value', option);

		optionSet.textContent = option;

		// display on the page
		optionsEl.appendChild(optionSet);
	}
}

function questionClick(event) {
	var buttonEl = event.target;

	// if the clicked element is not a option button, do nothing.
	if (!buttonEl.matches('.option')) {
		return;
	}

	// check if user entered the wrong answer
	if (buttonEl.value !== questions[currentQuestionIndex].answer) {
		// penalize time
		time -= 15;

		// show feedback
		if (time < 0) {
			// if time is negative, stop the quiz.
			time = 0;
		}

		// Show new time.
		timerEl.textContent = time;

		feedbackEl.textContent = 'Wrong!';
	} else {
		feedbackEl.textContent = 'Correct!';
	}

	// Show right/wrong feedback on page for half a second
	feedbackEl.setAttribute('class', 'feedback');
	setTimeout(function () {
		feedbackEl.setAttribute('class', 'feedback hide');
	}, 500);

	// move to next question
	currentQuestionIndex++;

	// check if we've run out of questions
	if (time <= 0 || currentQuestionIndex === questions.length) {
		quizEnd();
	} else {
		nextQuestion();
	}
}

function quizEnd() {
	// stop timer
	clearInterval(timerId);

	// show end screen
	var endQuizEl = document.getElementById('end-quiz');
	endQuizEl.removeAttribute('class');

	// show final score
	var finalScoreEl = document.getElementById('final-score');
	finalScoreEl.textContent = time;

	// hide questions section
	questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
	// update time
	time--;
	timerEl.textContent = time;

	// check if user ran out of time
	if (time <= 0) {
		quizEnd();
	}
}

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
optionsEl.onclick = questionClick;
//Setting highest score 

//


var highestScoreEl = document.getElementById('high')


highestScoreEl.addEventListener("click",function() {

highestScoreEl.textContent = time;
localStorage.setItem("time", JSON.stringify(time));
var score = time ;
var highscore = localStorage.getItem("time");

    if (score > highscore) {
        localStorage.setItem("score", JSON.stringify(score)); 
		return score;     
    }

else{
    localStorage.setItem("highscore",JSON.stringify(time));
	return highscore;
}
});




