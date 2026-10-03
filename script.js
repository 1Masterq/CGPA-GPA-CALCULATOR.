const subjectsEl = document.getElementById("subjects");
    const addBtn = document.getElementById("add-subject");
    const removeBtn = document.getElementById("remove-subject");
    const calculateBtn = document.getElementById("calculate");
    const outputEl = document.getElementById("output");

    const gradeOptions = [
  { label: "A (70–100) - 5", value: 5 },
  { label: "B (60–69) - 4", value: 4 },
  { label: "C (50–59) - 3", value: 3 },
  { label: "D (45–49) - 2", value: 2 },
  { label: "E (40–44) - 1", value: 1 },
  { label: "F (0–39) - 0", value: 0 }
];

    function createSubjectRow(index) {
      const wrapper = document.createElement("div");
      wrapper.className = "card";
      wrapper.dataset.index = index;

      wrapper.innerHTML = `
        <h2>Subject ${index + 1}</h2>
        <label>Credit unit.</label>
        <input type="number" class="credit" step="1" min="0" value="3" />
        <label>Grade Point</label>
        <select class="grade">
          ${gradeOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join("")}
        </select>
      `;
      return wrapper;
    }

    function renderSubjects(count = 4) {
      subjectsEl.innerHTML = "";
      for (let i = 0; i < count; i += 1) {
        subjectsEl.appendChild(createSubjectRow(i));
      }
    }

    function getSubjectData() {
      const cards = subjectsEl.querySelectorAll(".card");
      return Array.from(cards).map(card => {
        const credit = parseFloat(card.querySelector(".credit").value) || 0;
        const grade = parseFloat(card.querySelector(".grade").value) || 0;
        return { credit, grade };
      });
    }

    function calculateGPA(subjects) {
      const totalCredits = subjects.reduce((sum, s) => sum + s.credit, 0);
      const totalPoints = subjects.reduce((sum, s) => sum + s.credit * s.grade, 0);
      return totalCredits ? totalPoints / totalCredits : 0;
    }
    

    function calculateCGPA(currentGpa, currentCredits, prevCgpa, prevCredits) {
      const combinedPoints = currentGpa * currentCredits + prevCgpa * prevCredits;
      const totalCredits = currentCredits + prevCredits;
      return totalCredits ? combinedPoints / totalCredits : 0;
    }
    function getClassification(cgpa) {
  if (cgpa >= 4.50) {
    return "🥇 First Class";
  } else if (cgpa >= 3.50) {
    return "🥈 Second Class Upper (2:1)";
  } else if (cgpa >= 2.40) {
    return "🥉 Second Class Lower (2:2)";
  } else if (cgpa >= 1.50) {
    return "🎓 Third Class";
  } else if (cgpa >= 1.00) {
    return "📘 Pass";
  } else {
    return "❌ Fail";
  }
}
    addBtn.addEventListener("click", () => {
      const currentCount = subjectsEl.children.length;
      subjectsEl.appendChild(createSubjectRow(currentCount));
    });

    removeBtn.addEventListener("click", () => {
      const currentCount = subjectsEl.children.length;
      if (currentCount > 1) {
        subjectsEl.removeChild(subjectsEl.lastElementChild);
      }
    });

    calculateBtn.addEventListener("click", () => {
      const subjects = getSubjectData();
      const currentCredits = subjects.reduce((sum, s) => sum + s.credit, 0);
      const currentGpa = calculateGPA(subjects);
      const prevCgpa = parseFloat(document.getElementById("prev-cgpa").value) || 0;
      const prevCredits = parseFloat(document.getElementById("prev-credits").value) || 0;
      const cgpa = prevCredits > 0
        ? calculateCGPA(currentGpa, currentCredits, prevCgpa, prevCredits)
        : currentGpa;
     const classification = getClassification(cgpa);
     
      outputEl.hidden = false;
      outputEl.innerHTML = `
  <strong>Current GPA:</strong> ${currentGpa.toFixed(2)}<br />
  <strong>Total Credits This Term:</strong> ${currentCredits}<br />
  <strong>Combined CGPA:</strong> ${cgpa.toFixed(2)}<br /><br />
  <strong>Degree Classification:</strong> ${classification}
`;
    });

    renderSubjects();
    
    const themeBtn = document.getElementById("theme-toggle");
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
}

// Toggle theme
themeToggle.addEventListener("change", function(){

    if(this.checked){

        document.body.classList.add("dark-mode");
        localStorage.setItem("theme","dark");

    }else{

        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme","light");

    }

});
