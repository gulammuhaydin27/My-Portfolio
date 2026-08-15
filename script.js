/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   EXPERIENCE CARDS
========================================================= */

const cards =
  document.querySelectorAll(".card");


const counters =
  document.querySelectorAll(".counter");


/* =========================================================
   CARD 3D TILT EFFECT
========================================================= */

cards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        card.getBoundingClientRect();


      const mouseX =
        event.clientX - rect.left;


      const mouseY =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;


      const centerY =
        rect.height / 2;


      const rotateX =
        ((mouseY - centerY) / centerY) * -4;


      const rotateY =
        ((mouseX - centerX) / centerX) * 4;


      card.style.transform = `
        translateY(-12px)
        scale(1.02)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;


      card.style.boxShadow = `
        0 22px 55px rgba(139, 92, 246, 0.20),
        0 0 35px rgba(139, 92, 246, 0.18)
      `;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = `
        translateY(-12px)
        scale(1.02)
        rotateX(0deg)
        rotateY(0deg)
      `;


      card.style.boxShadow = "";

    }
  );

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

let countersStarted = false;


/* =========================================================
   START COUNTERS
========================================================= */

function startCounters() {

  if (countersStarted) {
    return;
  }


  countersStarted = true;


  counters.forEach((counter) => {

    const target =
      parseFloat(
        counter.dataset.target
      );


    const decimals =
      parseInt(
        counter.dataset.decimals || "0",
        10
      );


    const duration = 2200;


    const startTime =
      performance.now();


    /* -----------------------------------------
       ANIMATE NUMBER
    ----------------------------------------- */

    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /* Smooth Ease-Out */
      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          4
        );


      const currentValue =
        target * easedProgress;


      counter.textContent =
        currentValue.toFixed(
          decimals
        );


      /* Continue */
      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      }

      /* Final Value */
      else {

        counter.textContent =
          target.toFixed(
            decimals
          );

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  });

}


/* =========================================================
   SCROLL INTO VIEW
========================================================= */

const skillsSection =
  document.querySelector(".skills");


if (skillsSection) {

  const counterObserver =
    new IntersectionObserver(

      (entries) => {

        const entry =
          entries[0];


        if (
          entry.isIntersecting
        ) {

          startCounters();


          counterObserver.disconnect();

        }

      },

      {
        threshold: 0.25
      }

    );


  counterObserver.observe(
    skillsSection
  );

}