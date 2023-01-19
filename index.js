import questionsFoo from "./question.js";
let start = document.querySelector(".startBtn");

let clicked = false;
let answer;
let count = 0;
let win = 0;
let callCount = null;
let container = document.querySelector(".container");
let fiftys = document.querySelector(".fifty");
let help = document.querySelector(".audiance");

start.addEventListener("click", () => {
  container.setAttribute("class", "container active");
  const audio = new Audio("./sounds/start.mp3");
  audio.play();
  start.style.display = "none";
  setTimeout(() => {
    container.setAttribute("class", "container gameStart");
  }, 16000);
  setTimeout(() => {
    document.querySelector(".money").setAttribute("class", "money active");
    showQuestions(questionsFoo);
  }, 16000);
});

function showQuestions(questionsFoo) {
  document.querySelector(".audienceanswer").style.display = "none";
  let questionsArr;
  if (typeof questionsFoo === "function") {
    questionsArr = questionsFoo();
  } else if (Array.isArray(questionsFoo)) {
    questionsArr = questionsFoo;
  }
  callCount = questionsArr.length;
  if (questionsArr.length === 0 || answer === false) {
    container.style.width = "100vw";
    if (count > 0 && count < 1000000) {
      container.innerHTML = `<h1> You win ${win} AMD</h1>`;
     setTimeout(()=>location. reload(),2000) 
    } else if (count === 1000000) {
      container.setAttribute("class", "container gameEnd");
      container.innerHTML = `<h1> Congrats!!! You are the winner of the game "Who Wants To Be A Millionaire</h1>`;
      setTimeout(()=>location. reload(),3500) 
    } else {
      container.innerHTML = `<h1> You lose the game</h1>`;
      setTimeout(()=>location. reload(),2000) 
      
    }
  } else {
    fiftys.addEventListener("click", () => {
      deletetwoErrors(questionsArr);
      fiftys.innerHTML = `<img src="./images/Classic5050del.webp"/>`;
      fiftys.setAttribute("disabled", "true");
      const audio = new Audio("./sounds/fifty.mp3");
      audio.play();
      clicked = true;
    });
    help.addEventListener("click", () => {
      help.innerHTML = `<img src="./images/ClassicATAused.webp"/>`;
      help.setAttribute("disabled", "true");
      const audio = new Audio("./sounds/askAudience.mp3");
      audio.play();
      setTimeout(() => {
        audiancehelpFoo(questionsArr);
      }, 33400);
    });
    for (let i = 0; i < questionsArr.length; i++) {
      let version = document.querySelector(".versions");
      document.querySelector(".fifty").style.display = "block";
      document.querySelector(".audiance").style.display = "block";
      version.innerHTML = `<h2 class="question">${questionsArr[0].question}</h2>`;
      let answers = document.createElement("div");
      answers.setAttribute("class", "answers-div");

      questionsArr[0].content.forEach((item, index) => {
        let btn = document.createElement("button");
        btn.innerHTML = item;
        btn.setAttribute("class", "answerbtn");
        btn.addEventListener("click", () => {
          checkAnswer(questionsArr, item.slice(0,1));

          if (answer) {
            const audio = new Audio("./sounds/correct.mp3");
            audio.play();
            btn.style.backgroundColor = "green";
            document.querySelector(".money.active").innerHTML = "";
            document.querySelector(
              ".money.active"
            ).innerHTML += `You win ${questionsArr[0].val} AMD`;
            count = questionsArr[0].val;
            if (
              count === 1000 ||
              count === 8000 ||
              count === 64000 ||
              count === 500000 ||
              count === 1000000
            ) {
              setTimeout(() => {
                const audio = new Audio("./sounds/untouchable.mp3");
                audio.play();
                win = count;
                let untouchable = document.querySelector(".money.untouchable");
                untouchable.style.display = "block";
                untouchable.innerHTML = `Your untouchable money is ${win} AMD`;
              }, 50);
            }
          } else {
            const audio = new Audio("./sounds/lose.mp3");
            audio.play();
            btn.style.backgroundColor = "red";
          }
        });
        answers.append(btn);
        version.appendChild(answers);
      });
    }
  }
}
function checkAnswer(questionsArr, answ) {
  console.log(answ);
  if (answ === questionsArr[0].correctval) {
    answer = true;
  } else {
    answer = false;
  }

  setTimeout(() => {
    showQuestions(questionsArr.slice(1));
  }, 1000);
}

function deletetwoErrors(arr) {
  let newContent = [];

  let randomIndex = Math.floor(Math.random() * 4);

  if (arr[0].correct !== randomIndex) {
    newContent.push(arr[0].content[arr[0].correct]);
    if (!arr[0].content[randomIndex]) {
      if (arr[0].content[randomIndex - 1] !== arr[0].content[arr[0].correct]) {
        newContent.push(arr[0].content[randomIndex - 1]);
      } else if (
        arr[0].content[arr[0].correct] !== arr[0].content[randomIndex + 1]
      ) {
        newContent.push(arr[0].content[randomIndex + 1]);
      }
    } else {
      newContent.push(arr[0].content[randomIndex]);
    }

    if (newContent[0].slice(0, 1) > newContent[1].slice(0, 1)) {
      arr[0].content = newContent.reverse();
    } else {
      arr[0].content = newContent;
    }
  } else {
    newContent.push(arr[0].content[arr[0].correct]);

    if (arr[0].content[randomIndex - 1]) {
      newContent.push(arr[0].content[randomIndex - 1]);
    } else if (arr[0].content[randomIndex + 1]) {
      newContent.push(arr[0].content[randomIndex + 1]);
    }
    if (newContent[0].slice(0, 1) > newContent[1].slice(0, 1)) {
      arr[0].content = newContent.reverse();
    } else {
      arr[0].content = newContent;
    }
  }
  arr = [...arr];
  showQuestions(arr);
}
function audiancehelpFoo(arr) {
  if (callCount === arr.length) {
    callCount = null;
    let mydiv = document.querySelector(".audienceanswer");
    arr[0].content.forEach((elem) => {
      let answ = document.createElement("div");
      answ.setAttribute("class", "audansw");

      answ.innerHTML = elem.slice(0, 1);
      answ.style.height = `${Math.floor(Math.random() * 80 + 1)}px`;
      mydiv.appendChild(answ);
     
    });
 

    mydiv.style.display = "flex";
    let questions = document.querySelector(".versions");
    questions.style.display = "none";
    let spanBtn = document.querySelector(".del");
    let helper=document.querySelector(".helper");
    helper.style.display="none"
    spanBtn.addEventListener("click", () => {
      questions.style.display = "block";
      mydiv.style.display = "none";
      helper.style.display="flex"
    });
  }
}
