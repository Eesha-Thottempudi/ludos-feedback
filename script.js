let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".progress");

function showStep(index) {
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");

  progress.style.width = (index / (steps.length - 1)) * 100 + "%";
}

function nextStep() {

  // Step 2 validation
  if (currentStep === 1) {
  let name = document.querySelector('input[name="name"]').value;
  let profession = document.querySelector('select[name="profession"]').value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  if (!profession) {
    alert("Please select your profession");
    return;
  }
}

  // Step 3 validation (project)
  if (currentStep === 2) {
    let project = document.querySelector('input[name="project"]:checked');
    if (!project) {
      alert("Please select a project");
      return;
    }
  }

  // Step 4 validation (stars)
  if (currentStep === 3) {
    let ratings = ["innovation","tech","presentation","impact","overall"];
    for (let r of ratings) {
      let el = document.querySelector(`[data-name="${r}"]`);
      if (!el || !el.getAttribute("data-value")) {
        alert("Please rate all fields");
        return;
      }
    }
  }

  currentStep++;
  showStep(currentStep);
}

// Stars
document.querySelectorAll(".stars").forEach(container => {
  for (let i = 1; i <= 5; i++) {
    let star = document.createElement("span");
    star.innerHTML = "★";
    star.dataset.value = i;

    star.onclick = () => {
      container.setAttribute("data-value", i);
      Array.from(container.children).forEach(s => s.classList.remove("active"));
      for (let j = 0; j < i; j++) container.children[j].classList.add("active");
    };

    container.appendChild(star);
  }
});

document.getElementById("feedbackForm").addEventListener("submit", function(e) {

  let selected = document.querySelectorAll('input[name="topProjects[]"]:checked');

  if (selected.length !== 3) {
  alert("Please select exactly 3 projects");
  e.preventDefault();
  return;
}

  // ✅ Set star values
  document.getElementById("innovationInput").value =
    document.querySelector('[data-name="innovation"]').getAttribute("data-value");

  document.getElementById("techInput").value =
    document.querySelector('[data-name="tech"]').getAttribute("data-value");

  document.getElementById("presentationInput").value =
    document.querySelector('[data-name="presentation"]').getAttribute("data-value");

  document.getElementById("impactInput").value =
    document.querySelector('[data-name="impact"]').getAttribute("data-value");

  document.getElementById("overallInput").value =
    document.querySelector('[data-name="overall"]').getAttribute("data-value");

  // ✅ Show Thank You + Confetti
  setTimeout(() => {
    document.getElementById("feedbackForm").style.display = "none";
    document.getElementById("thankYou").style.display = "block";
    confetti();
  }, 500);
});

// Confetti effect
function confetti() {
  for (let i = 0; i < 80; i++) {
    let conf = document.createElement("div");
    conf.style.position = "fixed";
    conf.style.width = "8px";
    conf.style.height = "8px";
    conf.style.background = ["#ff7a18","#4facfe","#28a745"][Math.floor(Math.random()*3)];
    conf.style.top = "0";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.opacity = "0.8";
    conf.style.zIndex = "9999";

    document.body.appendChild(conf);

    let fall = conf.animate([
      { transform: "translateY(0px)" },
      { transform: "translateY(100vh)" }
    ], {
      duration: 2000 + Math.random()*1000
    });

    fall.onfinish = () => conf.remove();
  }
}

// Restart
function restart() {
  location.reload();
}

// Initialize
showStep(currentStep);

document.querySelectorAll('input[name="topProjects[]"]').forEach(box => {
  box.addEventListener("change", () => {
    let selected = document.querySelectorAll('input[name="topProjects[]"]:checked');

    if (selected.length > 3) {
      box.checked = false;
      alert("You can select only 3 projects");
    }
  });
});
