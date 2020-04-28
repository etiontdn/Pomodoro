//Configuration tab transitions

document.querySelector(".config-container").style.height = "0";
document.querySelector(".config-container").style.display = "none";
document.querySelector(".options-button").addEventListener("click", () => {
  let configPage = document.querySelector(".config-container")
  if (configPage.style.display == "none") {
    configPage.style.display = "flex";
    setTimeout(function () {
      configPage.style.height = "100vh";
    }, 10);
    document.querySelector(".options-button").style.backgroundImage = "url(images/return.svg)";
  }
  else {
    configPage.style.height = "0";
    setTimeout(function () {
      configPage.style.display = "none";
    }, 200);
    document.querySelector(".options-button").style.backgroundImage = "url(images/menu.svg)";
  }
});


//Main functionality;

class PotatoTimer {
  constructor (pomodoro, shortbreak, longbreak, screenTime) {
    this.pomodoro = pomodoro;
    this.shortbreak = shortbreak;
    this.longbreak = longbreak;
    this.breakCounter = 0;
    this.time = 0;
    this.timeSec = 0;
    this.current = "pomodoro";
    this.screenTime = screenTime;
    this.screenCurrent = document.querySelector(".timer-type > h1")
    this.timeLooper = window.setInterval(() => this.timeLoop(), 1000);
    this.running = true;
    this.sound = document.querySelector(".audio-alarm");
    this.resetTime();
  }

  updateToScreen () {
    if (this.current != this.screenCurrent.innerText.toLowerCase()) {
      this.screenCurrent.innerText = this.current.slice(0,1).toUpperCase() +
          this.current.slice(1);
    }

    let timerType = {"pomodoro": this.pomodoro, "shortbreak": this.shortbreak,
        "longbreak": this.longbreak}[this.current];

    if (String(this.timeSec).length > 1) {
      this.screenTime.innerText = timerType - this.time + ":"+this.timeSec;
    } else {
      this.screenTime.innerText = timerType - this.time + ":0"+this.timeSec;
    }
  }

  resetTime () {
    this.time = 0;
    this.timeSec = 0;
    this.breakCounter = 0;
    this.current = "pomodoro";
    this.screenTime.innerText = this.pomodoro+":00";
    this.running = true;
    this.pause()
  }

  timeLoop () {
    this.timeSec--;
    if (this.timeSec < 0) {
      this.timeSec = 59;
      this.time++;
    }

    if (this.current == "pomodoro") {
      if (this.time > this.pomodoro) {
        this.breakCounter += 1;
        if (this.breakCounter == 4) {
          this.current = "longbreak";
          this.breakCounter = 0;
        } else this.current = "shortbreak";
        this.time = 0;
        this.timeSec = 0;
        this.sound.play();
      }
    }

    if (this.current == "shortbreak") {
      if (this.time == this.shortbreak) {
        this.current = "pomodoro"
        this.time = 0;
        this.timeSec = 0;
        this.sound.play();
      }
    }

    if (this.current == "longbreak") {
      if (this.time == this.longbreak) {
        this.current = "pomodoro"
        this.time = 0;
        this.timeSec = 0;
        this.sound.play();
      }
    }

    this.updateToScreen();
  }

  pause () {
    if (this.running) {
      window.clearInterval(this.timeLooper);
      this.running = false;
    }
  }

  play () {
    if (!this.running) {
      this.timeLooper = window.setInterval(() => this.timeLoop(), 1000);
      this.running = true;
    }
  }

  setConfig () {
    this.pomodoro = Number(document.querySelector(".pomodoro-option")
        .innerText)
    this.shortbreak = Number(document.querySelector(".shortbreak-option")
        .innerText)
    this.longbreak = Number(document.querySelector(".longbreak-option")
        .innerText)
    this.resetTime();
  }


}



let potato = new PotatoTimer (25, 5, 15, document.querySelector(".timer > .time"));


//Buttons functionality

document.querySelector(".pause-button").addEventListener("click",
    () => potato.pause());
document.querySelector(".start-button").addEventListener("click",
    () => potato.play());
document.querySelector(".reset-button").addEventListener("click",
    () => potato.resetTime());

for (let button of document.querySelectorAll(".up-button")) {
  let type = button.getAttribute("data-optiontype");
  let option = document.querySelector("."+type+"-option");
  button.addEventListener("click", () => {
    option.innerText = Number(option.innerText) + 1;
    potato.setConfig();
  });
}

for (let button of document.querySelectorAll(".down-button")) {
  let type = button.getAttribute("data-optiontype");
  let option = document.querySelector("."+type+"-option");
  button.addEventListener("click", () => {
    let currentNum = Number(option.innerText);
    if (currentNum > 1) {
      option.innerText = currentNum - 1;
    }
    potato.setConfig();
  });
}
