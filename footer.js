//Star footer code
//Password Revealer
$("#open,#open-s").click(function () {
  $(".password").attr("type", "text");
});
$("#close,#close-s").click(function () {
  $(".password").attr("type", "password");
});

//Typpy code here
tippy(".tippy", {
  // Use class or id
  animation: "shift-away", // See docs for more options
  duration: 300, // Duration for ToolTip Animation
  arrow: true, // Add ToolTip Arrow
  delay: [120, 30], // First # = delay in, second # = delay out
  arrowType: "sharpe", // Sharp or 'round' or remove for none
  maxWidth: 220, // Max width in pixels for the tooltip
  interactive: true,
  allowHTML: true
});

//Open & Close acordeon style
$('[data-click="faq"]').click(function () {
  if (!$(this).is(".open")) {
    $('[data-click="faq"].open').each((i, item) => {
      item.click();
    });
    $(this).addClass("open");
  } else {
    $(this).removeClass("open");
  }
});

//NiceSelect code here
$(document).ready(function () {
  $(".select-drop, .style-select").niceSelect();
});

//Footer Year
let todaysYear = new Date().getFullYear();
let $dateEl = $(".year");
$dateEl.text(todaysYear);

// Set a cookie
Cookies.set("cookieName", "cookieValue", {
  expires: 365
});
// Get a cookie
Cookies.get("cookieName");
// Check a cookie
if (Cookies.get("cookieName") === "cookieValue") {
  // do something
}
// Delete a cookie
Cookies.remove("cookieName");
// Loop through each item with a class
$(".cms_item").each(function (index) {
  console.log($(this).index());
});
//HIDE COOKIEADVISE
if (Cookies.get("cookieAdvise") === "close") {
  $(".popup-container").toggleClass("none");
}
$(".close-modal-bg").on("click", function () {
  Cookies.set("cookieAdvise", "close", {
    expires: 3650
  });
  $(".popup-container").toggleClass("none");
});

//HIDE ADS BANNER
if (Cookies.get("tallerR3") === "adsclose") {
  $(".ads__banner__cookie__div").toggleClass("none");
}
$(".close__ads__icon").on("click", function () {
  Cookies.set("tallerR3", "adsclose", {
    expires: 30
  });
  setTimeout(function () {
    $(".ads__banner__cookie__div").toggleClass("none");
  }, 2000);
});
//Flash sale banner
if (Cookies.get("flashbanner") === "bannerclose") {
  $("#cFlashDiv").css("display", "none");
}
$("#flashSlaseClose, #promoDialogCancelBtn, #flashLink").on(
  "click",
  function () {
    Cookies.set("flashbanner", "bannerclose", {
      expires: 30
    });
  }
);

//Get the Superpoder cookie
if (Cookies.get("firstVisit") !== "") {
  let superpoder = Cookies.get("superpoder");
  $("#superpoder").val(superpoder).niceSelect("update");
}

//Lock body on movil open
$(
  "#checkoutBtn,.nav-movil-open, .link-log, .open-rform, .courses__filter__btn, .mm__avatare__wrapper"
).on("click", function () {
  $("body").addClass("no-scroll");
});
//Unlock body on movil open
$(
  ".nav-movil-close,.close__div,.open-rform,.r--table--close,.mm__upload__close"
).on("click", function () {
  $("body").removeClass("no-scroll");
});

//Email Validator
if ($("#email-status").length) {
  $(document).ready(function () {
    $("#email").on("input", function () {
      var email = $(this).val();
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (pattern.test(email)) {
        $("#singupBtn").removeClass("is--disable");
        $("#email-status").text("");
      } else {
        $("#email-status").text("Correo Invalido");
        $("#singupBtn").addClass("is--disable");
      }
    });
  });
}

if ($("#internet-alert").length) {
  // Show Offline Banner
  const ooUpdate = $("#internet-alert");
  if (navigator.onLine) {
    ooUpdate.text("Se restableció tu conexión a Internet.");
  }
  // Add Event Listeners
  window.addEventListener("online", function () {
    $("#ooUpdate").css("display", "flex");
    $("#online").css("display", "block");
    $("#reload,#offline").css("display", "none");
    ooUpdate.text("Se restableció tu conexión a Internet.");
  });
  window.addEventListener("offline", function () {
    $("#ooUpdate").css("display", "flex");
    $("#offline,#reload").css("display", "block");
    $("#online").css("display", "none");
    ooUpdate.text("Actualmente estas desconectado.");
  });
}
// Reload Link
$("#reload").click(function () {
  location.reload();
});

//Close login on body
$(
  ".log-bg, .r-button.dash, .r-button.is-logout, .singup-container, .login-container, .vote--log"
).on("click", function () {
  $(".log-open-close-button").click();
});

// MemberStack on ready
MemberStack.onReady.then(async function (member) {
  let memberEmail = member["email"],
    academyPro = member["pro"] || "false",
    starter = member["starter"] || "false",
    country = member["country"] || "",
    studentPoints = +member["points"] || 0;

  if ($("#upgradeWrapper").length) {
    if (academyPro !== "true") {
      $("#upgradeWrapper").removeClass("none");
    }
  }

  //Set Member Points
  //Set MM Points
  if ($("#printPoints").length) {
    function kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    }
    let pointsFix = kFormatter(studentPoints);

    $("#printPoints").text(`Pt ${pointsFix}`);
  }

  //Get MM Flag
  if ($("#myMemberFlag").length) {
    //Select country code
    if (country !== "") {
      //Get MM flag select
      let lowCode = country.toLowerCase();
      let flag = `https://hatscripts.github.io/circle-flags/flags/${lowCode}.svg`;
      $("#myMemberFlag").attr({ src: flag, href: flag });
    } else {
      $("#flagWrapper").hide();
    }
  }

  //Display PRO badge
  if ($("#circleIcon1").length) {
    if (academyPro === "true") {
      $("#circleIcon1").css("display", "flex");
    } else {
      $("#circleIcon1").css("display", "none");
    }
  }

  //Display special offer banner
  if ($("#flashSalseBanner").length || $("#promoDialog").length) {
    if (academyPro === "true") {
      $("#flashSalseBanner").css("display", "none");
    } else {
      //Set div top

      var promo = false, // true if active, false if not
        promoEndDate = 1678632900, // Set the end date
        disCountCP = "SPD23", // Set coupon name
        promoDicount = 20, // Set the discount number
        planNum = 1, // Set plan type - default is 1 year
        discountBannerText = "🍀 Oferta 20% Dto. –– termina:"; // Set banner Text

      if (promo !== false) {
        $("#flashSalseBanner").fadeIn("slow").css("display", "flex");
        $("#flashSalseBanner").attr({
          "data-status": promo,
          "data-discount": promoDicount
        });
        $("#flashLink").attr(
          "href",
          `/mycart/star-checkout?pro+offer=${disCountCP}&amp;odn=${promoDicount}%&amp;promo+pro+close=${promoEndDate}&amp;plan=${planNum}&amp;source=Seed+Webpage`
        );

        $("#flashSlaseClose").click(function () {
          $("#flashSalseBanner").fadeOut().height("0px");
          setTimeout(function () {
            $("#flashSalseBanner").css("display", "none");
          }, 300);
        });
        setTimeout(function () {
          $("#timerLoading2").css("display", "none");
          $("#tcTextDate").css("display", "flex");
        }, 1000);

        function makeTimer() {
          let endTime = new Date(promoEndDate * 1000);
          endTime = Date.parse(endTime) / 1000;

          let now = new Date();
          now = Date.parse(now) / 1000;

          let timeLeft = endTime - now;

          let days = Math.floor(timeLeft / 86400);
          let hours = Math.floor((timeLeft - days * 86400) / 3600);
          let minutes = Math.floor(
            (timeLeft - days * 86400 - hours * 3600) / 60
          );
          let seconds = Math.floor(
            timeLeft - days * 86400 - hours * 3600 - minutes * 60
          );

          if (hours < "10") {
            hours = "0" + hours;
          }
          if (minutes < "10") {
            minutes = "0" + minutes;
          }
          if (seconds < "10") {
            seconds = "0" + seconds;
          }

          //Prevent negative numbers
          days = days < 0 ? 0 : days;

          let daysP = `${days}d • ${hours}:${minutes}:${seconds}`;
          $("#flasahText").text(`${discountBannerText} ${daysP} • `);

          //Dashboard Offer
          if ($("#promoDialog").length) {
            setTimeout(() => {
              $("#promoDialog").removeClass("none");
            }, 300);
            $("#offerLabelPrice").text(`${promoDicount}% off`);
            $("#offerTimer").text(daysP);
          }

          if (timeLeft < 0) {
            $("#flashSalseBanner").attr("data-status", false);
            $("#flashSalseBanner").css("display", "none");
          }
        }

        setInterval(function () {
          makeTimer();
        }, 1000);
      }
    }
  } else {
    $("#flashSalseBanner").css("display", "none");
    $("#flashSalseBanner").attr("data-status", promo);
  }

  //Display Ads PRO banner
  if ($("#seedProAds").length) {
    if (academyPro === "true") {
      $("#seedProAds,#seedProAds2,#seedProAds3").css("display", "none");
    } else {
      $("#seedProAds,#seedProAds2,#seedProAds3").css("display", "block");
    }
  }
  if ($(".update__student--btn").length) {
    if (academyPro === "true" || starter === "true") {
      $(".update__student--btn").addClass("none");
    }
  }

  //Open Become PRO Prompt
  if ($("#lockPro").length || $(".update__student--btn").length) {
    $("#lockPro,.update__student--btn").on("click", function () {
      $("#proProntContainer").toggleClass("active");
      setTimeout(() => {
        $("#proProntCard").toggleClass("active");
      }, 100);
    });

    $("#becomeProBtnclose").on("click", function () {
      $("#proProntCard").toggleClass("active");
      setTimeout(() => {
        $("#proProntContainer").toggleClass("active");
      }, 100);
    });
  }

  //Set member Avatar
  if (member.loggedIn) {
    const metadata = await member.getMetaData();

    let update = (metadata.update = metadata.update || []);

    //Update Banner
    if ($("#itroBanner-20").length) {
      //Show Upadte Banner
      if (Cookies.get("tourBanner_20") === "tourclose" || update.length !== 0) {
        $(".tour_cookies_div").addClass("none");
      }
      $("#itroBanner-20").on("click", function () {
        let updateNum = "Update 2.0";
        update.push(updateNum);
        member.updateMetaData(metadata);
      });
      //Update Platform
      $("#itroBanner-20").on("click", function () {
        $(this).addClass("is--disable").text("Actualizando...");

        setTimeout(() => {
          location.reload();
        }, 1800);
      });
    }
  }

  //ActiveCampaign Code
  //vgo("setEmail", memberEmail);
  //vgo("process");
});
