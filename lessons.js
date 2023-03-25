MemberStack.onReady.then(async function (member) {
  //On load page
  let primaryBtn = $("#starQuiz"),
    questionItem = $(".question__item"),
    starQuiz = $("#nextQuiz"),
    bigMessage = $("#bigMessage"),
    correctTest = $(".quiz__message--text"),
    timerClock = $(".quiz__timer--wrapper"),
    mobileTimerClock = $(".quiz__mobile--progress--div"),
    mobileFillTimer = $("#mobileTimer"),
    restart = $("#restart"),
    thumbnail = $(".left__card--img"),
    winnerPointText = $("#totalPoints"),
    winBanner = $("#winBanner"),
    anwsersListWrapper = $("#quizList"),
    slug = $("#lessonSlug").val(),
    lessonName = $("#lessonName").val(),
    nextUrl = $("#nextLesson").val(),
    courseStatus = $("#coursesStatus").val(),
    courseMetadata = $("#courseMetadata").val(),
    freemium = $("#lessonPublic").val(),
    academyPro = member["pro"] || "false",
    starter = member["starter"] || "false";

  //Set Next lesson Btn
  if (nextUrl !== "") {
    restart.val("Próxima lección");
  }

  //Get card info
  let totalQuestions = questionItem.length;
  let duration = Math.round((+totalQuestions * 30) / 60);
  $("#durations").text(`${duration} minutos`);
  $("#ctaLock").text(`Aprende más sobre ${lessonName}`);
  $("#questionsNum").text(`${totalQuestions} Ejercicios`);
  if (courseStatus === "false") {
    $(".lesson__courses--card").addClass("is--lock");
  }

  setTimeout(() => {
    $(".lesson__main--wrapper,.fs-toc_link-content").toggleClass("none");
  }, 400);
  setTimeout(() => {
    $("#starBtn2,#starBtn3,#fakeBtn").toggleClass("none");
  }, 400);

  //On Click
  $(".dashboard__nav--btn").on("click", function () {
    $(this).addClass("w--current");
  });

  //Open & Close Mobile Nabvar
  $("#mobileNavBtn").on("click", function () {
    $(this).find(".icon").toggleClass("none");
    $(".dashboard__nav--wrapper").toggleClass("show");
    $("body").toggleClass("no-scroll");
  });

  $("#mobileClose").on("click", function () {
    $("#mobileNavBtn").click();
  });

  $("#closeDestopNav").on("click", function () {
    $(".sidebar__spacer").toggleClass("open");
  });

  //Check if member is login
  if (member.loggedIn) {
    //Get Member data
    const metadata = await member.getMetaData();
    const course = (metadata[`${courseMetadata}`] =
      metadata[`${courseMetadata}`] || []);
    let studentPoints = +member["points"] || 0;

    if (freemium === "true" || academyPro === "true" || starter === "true") {
      $("#lessonGlossary").removeClass("is--lock");
      $(".fs-toc_link").removeClass("is--disable");
      $("#starBtn1,#starBtn2").removeAttr("href");
    }

    //Show Quiz animation
    $("#starBtn1,#starBtn2").on("click", function () {
      setTimeout(() => {
        $("body").toggleClass("play");
        $("#quizInfoBlock").css({
          opacity: 0,
          transform: "translate(0px, 20px)"
        });
        setTimeout(() => {
          $("#quizInfoBlock").css({
            opacity: 1,
            transform: "translate(0px, 0px)",
            "-ms-transform": "translate(0px, 0px)",
            "-webkit-transform": "translate(0px, 0px)"
          });
        }, 400);
        setTimeout(() => {
          $("#backBtn").removeClass("is--fake").addClass("hover--link");
          primaryBtn.removeClass("is--fake").addClass("is--green");
          primaryBtn.text("Comenzar");
        }, 1000);
      }, 400);
    });

    //Saved Module
    let module = metadata.module || [];
    let likeBtn = $(".like-btn");
    let moduleSlug = slug;
    if (module.includes(moduleSlug)) {
      likeBtn.addClass("saved");
    }
    //Get All Lesson Saved
    if (!module) module = [];

    $(".like-btn").on("click", function () {
      if (!module.includes(slug)) {
        module.push(slug);
      } else {
        let index = module.indexOf(slug);
        if (index > -1) {
          module.splice(index, 1);
        }
      }
      member.updateMetaData({
        module: module
      });
      $(this).toggleClass("saved");
    });

    //Show the first question
    questionItem.eq(0).addClass("is--current-question");
    let currentLink = questionItem.eq(0).find(".quiz__link");
    currentLink.attr("key-status", "current");

    let answeredQuestions,
      quizTimer,
      timer = 30,
      points = totalQuestions * 10,
      wrongAnswers = 0;

    //Check if the user has completed the lesson
    if (course.includes(slug)) {
      points = 0;
      $("#lessonComplete").addClass("show");
      $("#pointsWrapper").hide();
      $("#starBtn1,#starBtn2")
        .removeClass("is--green")
        .addClass("__light--grey")
        .text("Reanudar práctica");
    }

    //Set Correct Message
    function random_item(correctMessage) {
      return correctMessage[Math.floor(Math.random() * correctMessage.length)];
    }

    let correctMessage = [
      "¡Genial!",
      "¡Bien hecho!",
      "¡Fantástico!",
      "¡Excelente!",
      "¡Correcto!"
    ];

    //Set Sound
    let rightSound = document.getElementById("right");
    let wrongSound = document.getElementById("wrong");
    let typeSound = document.getElementById("type");
    let endGame = document.getElementById("endGame");
    rightSound.load();
    wrongSound.load();
    typeSound.load();
    endGame.load();
    typeSound.volume = 0.4;

    $(".quiz__link").on("mouseenter", function () {
      typeSound.currentTime = 0;
      typeSound.play();
    });

    $(".total-questions").text(totalQuestions);
    $(".answered-questions").text(answeredQuestions);
    $("#lessonPoints").text(`+${points}`);
    $("#totalQuestions").text(
      `${totalQuestions} Ejercicios • ${duration} minutos`
    );

    //Ramdomly print answers
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex) + 1;
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }

      return array;
    }

    $(".quiz__options").each(function () {
      let quizChildrens = $(this).find(".quiz__link");
      let div = quizChildrens.toArray();
      let randomAnwsers = shuffle(div);
      $(this).append(randomAnwsers);

      quizChildrens.each(function () {
        let numQuiz = $(this).index() + 1;
        let textNum = $(this).find(".quiz__answer__num");
        textNum.text(numQuiz);
        $(this).attr("key-name", numQuiz);
      });
    });

    function updateAnswerCount() {
      answeredQuestions = $(".answered-correct").length;
      $(".answered-questions").text(answeredQuestions);
      let progressWidth = (answeredQuestions / totalQuestions) * 100;
      $("#quizProgress").fadeIn("slow").css("width", `${progressWidth}%`);

      if (points < 0) {
        points = 0;
      }

      //Show Score
      let percentage = (100 / answeredQuestions) * answeredQuestions,
        totalDecimal = answeredQuestions / totalQuestions,
        grantTotal = Math.round(percentage),
        studentTotalPoints = points + studentPoints;
      $(".answers--correct").text(answeredQuestions);
      $(".answers--total").text(totalQuestions);
      $(".quiz__points").text(`${grantTotal}%`);
      $("#wrongAnswers").text(wrongAnswers);

      //Reload the page or go to the next lesson

      restart.on("click", function () {
        $("#formPoints").val(studentTotalPoints);
        if (nextUrl !== "") {
          setTimeout(() => {
            window.location = nextUrl;
          }, 500);
        } else {
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      });
      winnerPointText.text(`${points}pts.`);

      //Display Complete Banner
      if (answeredQuestions === totalQuestions) {
        if (!course.includes(slug)) {
          metadata[`${courseMetadata}`].push(slug);
          member.updateMetaData(metadata);
        }

        //Update MM in MS
        setTimeout(() => {
          starQuiz.addClass("none");
          winBanner.fadeOut(500).addClass("show");
          $("#progressNav").removeClass("active");
          $("#formWrapper, #restart").removeClass("none");
          $("#quizInfoBlock,#allQuestions,#bigMessage")
            .fadeOut(500)
            .removeClass("show");
          endGame.play();
        }, 1800);

        $("#totalPoint").val(totalDecimal);
      }
    }
    updateAnswerCount();

    //Set Timer
    var upDateTimer = function () {
      quizTimer = setInterval(function () {
        if (timer > 0) {
          timer = timer - 1;
          $("#timerNum").text(timer);
          $("#quizTimer").css(
            "animation",
            "practiceViewTimerAnimation 30s linear"
          );
          mobileFillTimer.addClass("animate");
        } else {
          //Timeout
          let questionParent = $(".question__item.is--current-question");
          questionParent.find("[answer-value=true]").addClass("is--correct");
          let quizExplanation = questionParent.find(
            ".quiz__explanation--wrapper"
          );
          let anwserList = questionParent.find(".question__wrapper");
          correctTest.text("¡Tiempo terminado!");
          bigMessage.addClass("show is--incorrect");
          timerClock.removeClass("show").hide();
          mobileFillTimer.removeClass("animate");
          mobileTimerClock.removeClass("show");
          starQuiz.removeClass("is--fake is--green");
          starQuiz.addClass("is--red");
          clearInterval(quizTimer);
          wrongSound.play();

          points = points - 10;

          updateAnswerCount();
          setTimeout(() => {
            quizExplanation.toggleClass("none");
            anwserList.fadeOut(500).toggleClass("none");
          }, 1300);
        }
      }, 1000);
    };

    //Star Quiz
    $(primaryBtn).on("click", function () {
      $("#introPlayer,#starPlayer").toggleClass("none");

      setTimeout(() => {
        $(".quiz__timer--wrapper,.quiz__mobile--progress--div").toggleClass(
          "show"
        );
        $("#quizInfoBlock,#allQuestions").fadeOut(500).toggleClass("show");
      }, 150);
      setTimeout(() => {
        thumbnail.addClass("show");
      }, 200);
      upDateTimer();
    });

    //Answer Selected
    $(".quiz__link").on("click", function () {
      clearInterval(quizTimer);
      timer = 0;

      let parent = $(this).closest(".question__item");
      let quizExplanation = parent.find(".quiz__explanation--wrapper");
      let anwserList = parent.find(".question__wrapper");
      let answerSelect = $(this),
        aSibling = answerSelect.siblings(".quiz__link"),
        answerVal = answerSelect.attr("answer-value");

      //Show Explanation
      setTimeout(() => {
        quizExplanation.toggleClass("none");
        anwserList.toggleClass("none");
        starQuiz.removeClass("is--fake is--red").addClass("is--green");
        $("html, body").animate(
          {
            scrollTop: anwserList.offset().top
          },
          300
        );
      }, 2000);

      //If Select Answer is true
      if (answerVal === "true" && answeredQuestions === 0) {
        parent.addClass("answered-correct").removeClass("answered-incorrect");
        answerSelect.addClass("is--correct");
        aSibling.siblings("[answer-value=false]").addClass("is--false");
        correctTest.text(random_item(correctMessage));
        bigMessage.addClass("show is--correct");
        mobileFillTimer.removeClass("animate");
        timerClock.removeClass("show").hide();
        mobileTimerClock.removeClass("show");
        rightSound.play();

        //If Select Answer if true & gameOver is false
      } else if (answerVal === "true" && answeredQuestions > 0) {
        parent.addClass("answered-correct").removeClass("answered-incorrect");
        answerSelect.addClass("is--correct");
        $(this).siblings("[answer-value=true]").addClass("is--correct");
        aSibling.siblings("[answer-value=false]").addClass("is--false");
        correctTest.text(random_item(correctMessage));
        bigMessage.addClass("show is--correct");
        mobileFillTimer.removeClass("animate");
        timerClock.removeClass("show").hide();
        mobileTimerClock.removeClass("show");
        rightSound.play();

        //If Select Answer if false & GameOver is false
      } else if (answerVal === "false" && answeredQuestions > 0) {
        parent.addClass("answered-incorrect");
        answerSelect.addClass("is--incorrect");
        $(this).siblings("[answer-value=true]").addClass("is--correct");
        aSibling.siblings("[answer-value=false]").addClass("is--false");
        correctTest.text("¡Incorrecto!");
        bigMessage.addClass("show is--incorrect");
        mobileFillTimer.removeClass("animate");
        timerClock.removeClass("show").hide();
        mobileTimerClock.removeClass("show");
        wrongSound.play();

        points = points - 10;
        wrongAnswers = wrongAnswers + 1;

        //If Select Answer if false
      } else if (answerVal === "false" && answeredQuestions === 0) {
        parent.addClass("answered-incorrect");
        answerSelect.addClass("is--incorrect");
        $(this).siblings("[answer-value=true]").addClass("is--correct");
        aSibling.siblings("[answer-value=false]").addClass("is--false");
        correctTest.text("¡Incorrecto!");
        bigMessage.addClass("show is--incorrect");
        mobileFillTimer.removeClass("animate");
        timerClock.removeClass("show").hide();
        mobileTimerClock.removeClass("show");
        wrongSound.play();

        points = points - 10;
        wrongAnswers = wrongAnswers + 1;
      }

      updateAnswerCount();
    });

    //Next Question
    starQuiz.on("click", function () {
      //Reset Timer
      upDateTimer();
      timer = 30;

      $("html, body").animate(
        {
          scrollTop: anwsersListWrapper.offset().top - $(window).height() / 2
        },
        300
      );

      let currentQuestion = $(".question__item.is--current-question");
      let firstQuestion = $(
        ".question__item.answered-incorrect:first:not(.answered-correct)"
      );

      //Get Next Questions
      if (currentQuestion.next().not(".answered-correct").length > 0) {
        let currentNext = currentQuestion.next().not(".answered-correct");
        let quizExplanation = currentQuestion.find(
          ".quiz__explanation--wrapper"
        );
        let anwserList = currentQuestion.find(".question__wrapper");
        let newLink = currentNext.find(".quiz__link");
        let oldLink = currentQuestion.find(".quiz__link");
        oldLink.attr("key-status", "");
        newLink.attr("key-status", "current");
        thumbnail.removeClass("show");

        setTimeout(() => {
          currentQuestion.removeClass("is--current-question");
          currentNext.addClass("is--current-question");
          anwserList.toggleClass("none");
        }, 300);
        setTimeout(() => {
          thumbnail.addClass("show");
        }, 400);
        quizExplanation.toggleClass("none");

        //Get repeated question
      } else if (currentQuestion.not(".answered-correct").length === 1) {
        let quizExplanation = currentQuestion.find(
          ".quiz__explanation--wrapper"
        );
        let anwserList = currentQuestion.find(".question__wrapper");
        let newLink = currentQuestion.find(".quiz__link");
        let oldLink = currentQuestion.find(".quiz__link");
        oldLink.attr("key-status", "");
        newLink.attr("key-status", "current");
        $(".quiz__link").removeClass("is--correct is--incorrect is--false");
        thumbnail.removeClass("show");

        setTimeout(() => {
          currentQuestion.removeClass("is--current-question");
          currentQuestion.addClass("is--current-question");
          anwserList.toggleClass("none");
        }, 300);
        setTimeout(() => {
          thumbnail.addClass("show");
        }, 400);
        quizExplanation.toggleClass("none");

        //Get Preview Questions
      } else {
        let quizExplanation = currentQuestion.find(
          ".quiz__explanation--wrapper"
        );
        let anwserList = currentQuestion.find(".question__wrapper");
        let anwserListPrev = firstQuestion.find(".question__wrapper");
        let newLink = firstQuestion.find(".quiz__link");
        let oldLink = currentQuestion.find(".quiz__link");
        oldLink.attr("key-status", "");
        newLink.attr("key-status", "current");
        $(".quiz__link").removeClass("is--correct is--incorrect is--false");
        thumbnail.removeClass("show");

        setTimeout(() => {
          currentQuestion.removeClass("is--current-question");
          anwserListPrev.removeClass("none");
          firstQuestion.addClass("is--current-question");
          anwserList.toggleClass("none");
        }, 300);
        setTimeout(() => {
          thumbnail.addClass("show");
        }, 400);
        quizExplanation.toggleClass("none");
      }
      $("#mobileTimer").addClass("animate");
      timerClock.show().addClass("show");
      mobileTimerClock.addClass("show");
      bigMessage.removeClass("show is--incorrect is--correct");
      $(this).addClass("is--fake");
    });

    //Connect Answer with key
    $(document).on("keydown", function (myEvent) {
      let anwserKey = $(`[key-name='${myEvent.key}'][key-status='current']`);
      anwserKey.click();
    });

    // on toggle click
    const memberSound = localStorage.getItem("sound") || "false";
    if (memberSound === "true") {
      $("audio").prop("muted", true);
      $("#soundToggle").attr("sound", "false");
      $("#soundToggle").removeClass("active");
    } else {
      $("audio").prop("muted", false);
      $("#soundToggle").attr("sound", "true");
      $("#soundToggle").addClass("active");
    }

    //Get Sound Status
    $("#soundToggle").click(function (e) {
      let dataValue = $(this).attr("sound");

      $(this).toggleClass("active");

      if (dataValue === "true") {
        $(this).attr("sound", "false");
        localStorage.setItem("sound", "true");
        $("audio").prop("muted", true);
      } else {
        $(this).attr("sound", "true");
        localStorage.setItem("sound", "false");
        $("audio").prop("muted", false);
      }
      e.preventDefault();
    });

    //Rating Form Radios (Emojis Btn)
    $(document).ready(function () {
      $(".lesson__rating--btn--wrapper").on("click", function () {
        $("#ratingLesson").submit();
        let ratingBtn = $(this).find(".lesson__emoji--btn");
        let radio = $(this).find(".lesson__rating--ration");
        radio.attr("checked", "checked");
        ratingBtn.addClass("is--active");
        setTimeout(() => {
          ratingBtn.removeClass("is--active");
        }, 300);
        setTimeout(() => {
          $(this).addClass("is--selected");
          $(this).siblings().addClass("is--disable");
        }, 200);
      });
    });
  } else {
    $("#lessonGlossary").addClass("is--lock");
    $(".fs-toc_link").addClass("is--disable");
    $("#starBtn1,#starBtn2").attr("href", "https://www.seedlawpr.com/precio");
  }
});

//Open Lesson Chat
$("#chatBtn").on("click", function () {
  $("body").addClass("no__scroll-mobile");
  $(".lesson__chat--container").addClass("is--active");
  setTimeout(() => {
    $(".lesson__side--div").addClass("is--open");
  }, 200);
  setTimeout(() => {
    $(".lesson__chat--wrapper").addClass("is--active");
  }, 1000);
});

//Close Lesson Chat
$("#closeChatBtn,.lesson__chat--bg").on("click", function () {
  $(".lesson__side--div").removeClass("is--open xpand");
  setTimeout(() => {
    $(".lesson__chat--wrapper").removeClass("is--active");
    $(".lesson__chat--container").removeClass("is--active");
    $("body").removeClass("no__scroll-mobile");
  }, 300);
});

//Xpand Chat
$("#xpandBtn").on("click", function () {
  $(".lesson__side--div").toggleClass("xpand");
});
