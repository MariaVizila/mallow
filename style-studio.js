/* =========================
   MALLOW — STYLE STUDIO JS
========================= */

const styleData = {
  vibe: null,
  color: null,
  accessories: []
};


/* =========================
   ELEMENTS
========================= */

const vibeChoices =
  document.querySelectorAll('[data-type="vibe"]');

const colorChoices =
  document.querySelectorAll('[data-type="color"]');

const accessoryChoices =
  document.querySelectorAll('[data-type="accessory"]');

const previewTitle =
  document.getElementById("previewTitle");

const previewDescription =
  document.getElementById("previewDescription");

const previewTags =
  document.getElementById("previewTags");

const styleScore =
  document.getElementById("styleScore");

const scoreBar =
  document.getElementById("scoreBar");

const selectionCount =
  document.getElementById("selectionCount");

const saveButton =
  document.getElementById("saveStyle");


/* =========================
   VIBE SELECTION
========================= */

vibeChoices.forEach(choice => {

  choice.addEventListener("click", () => {

    vibeChoices.forEach(item => {
      item.classList.remove("selected");
    });

    choice.classList.add("selected");

    styleData.vibe =
      choice.dataset.value;

    updatePreview();

  });

});


/* =========================
   COLOR SELECTION
========================= */

colorChoices.forEach(choice => {

  choice.addEventListener("click", () => {

    colorChoices.forEach(item => {
      item.classList.remove("selected");
    });

    choice.classList.add("selected");

    styleData.color =
      choice.dataset.value;

    updatePreview();

  });

});


/* =========================
   ACCESSORIES
========================= */

accessoryChoices.forEach(choice => {

  choice.addEventListener("click", () => {

    const value =
      choice.dataset.value;

    const index =
      styleData.accessories.indexOf(value);


    if (index === -1) {

      styleData.accessories.push(value);

      choice.classList.add("selected");

    } else {

      styleData.accessories.splice(index, 1);

      choice.classList.remove("selected");

    }

    updatePreview();

  });

});


/* =========================
   UPDATE PREVIEW
========================= */

function updatePreview() {

  const selectedItems = [];

  if (styleData.vibe) {
    selectedItems.push(styleData.vibe);
  }

  if (styleData.color) {
    selectedItems.push(styleData.color);
  }

  selectedItems.push(
    ...styleData.accessories
  );


  /* Count */

  selectionCount.textContent =
    `${selectedItems.length} selected`;


  /* Title */

  if (styleData.vibe) {

    previewTitle.textContent =
      `${styleData.vibe} vibe`;

  } else {

    previewTitle.textContent =
      "Your vibe";

  }


  /* Description */

  if (selectedItems.length === 0) {

    previewDescription.textContent =
      "Start choosing things on the left to create your personal style.";

  } else {

    previewDescription.textContent =
      "A little collection of things that feel like you.";

  }


  /* Tags */

  previewTags.innerHTML = "";

  if (selectedItems.length === 0) {

    const empty =
      document.createElement("span");

    empty.className = "empty-tag";

    empty.textContent =
      "Nothing selected yet";

    previewTags.appendChild(empty);

  } else {

    selectedItems.forEach(item => {

      const tag =
        document.createElement("span");

      tag.textContent =
        item;

      previewTags.appendChild(tag);

    });

  }


  /* Score */

  const score =
    Math.min(
      100,
      selectedItems.length * 15
    );

  styleScore.textContent =
    `${score}%`;

  scoreBar.style.width =
    `${score}%`;
}


/* =========================
   SAVE STYLE
========================= */

saveButton.addEventListener("click", () => {

  if (
    !styleData.vibe &&
    !styleData.color &&
    styleData.accessories.length === 0
  ) {

    showToast(
      "Choose a few things first!",
      "✦"
    );

    return;
  }


  localStorage.setItem(
    "mallowStyle",
    JSON.stringify(styleData)
  );


  showToast(
    "Your style has been saved!",
    "♡"
  );

});


/* =========================
   LOAD SAVED STYLE
========================= */

function loadSavedStyle() {

  const saved =
    localStorage.getItem("mallowStyle");

  if (!saved) {
    return;
  }

  try {

    const parsed =
      JSON.parse(saved);

    styleData.vibe =
      parsed.vibe || null;

    styleData.color =
      parsed.color || null;

    styleData.accessories =
      Array.isArray(parsed.accessories)
        ? parsed.accessories
        : [];


    /* Restore vibe */

    vibeChoices.forEach(choice => {

      if (
        choice.dataset.value ===
        styleData.vibe
      ) {

        choice.classList.add("selected");

      }

    });


    /* Restore color */

    colorChoices.forEach(choice => {

      if (
        choice.dataset.value ===
        styleData.color
      ) {

        choice.classList.add("selected");

      }

    });


    /* Restore accessories */

    accessoryChoices.forEach(choice => {

      if (
        styleData.accessories.includes(
          choice.dataset.value
        )
      ) {

        choice.classList.add("selected");

      }

    });


    updatePreview();

  } catch (error) {

    console.log(
      "Could not load saved Mallow style."
    );

  }

}


/* =========================
   TOAST
========================= */

function showToast(message, icon) {

  const existing =
    document.querySelector(".studio-toast");

  if (existing) {
    existing.remove();
  }


  const toast =
    document.createElement("div");

  toast.className =
    "studio-toast";


  toast.innerHTML = `
    <div class="studio-toast-icon">
      ${icon}
    </div>

    <div>
      <strong>Mallow</strong>
      <span>${message}</span>
    </div>
  `;


  document.body.appendChild(toast);


  requestAnimationFrame(() => {
    toast.classList.add("show");
  });


  setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 3000);

}


/* =========================
   PROFILE BUTTON
========================= */

const profileButton =
  document.getElementById("profileButton");

if (profileButton) {

  profileButton.addEventListener(
    "click",
    () => {

      showToast(
        "Your Mallow profile is coming soon!",
        "♡"
      );

    }
  );

}


/* =========================
   INITIALIZE
========================= */

loadSavedStyle();


/* =========================
   MALLOW MOVEMENT
========================= */

const movementRoutines = {

  beginner: {
    title: "Gentle Beginner",
    steps: [
      ["Easy warm-up", "2 minutes"],
      ["March in place", "2 minutes"],
      ["Wall push-ups", "8–10 reps"],
      ["Chair-supported squats", "8–10 reps"],
      ["Gentle stretching", "2 minutes"]
    ]
  },

  strength: {
    title: "General Strength",
    steps: [
      ["Easy warm-up", "2 minutes"],
      ["Wall push-ups", "8–12 reps"],
      ["Bodyweight squats", "8–12 reps"],
      ["Glute bridges", "8–12 reps"],
      ["Gentle cool-down", "2 minutes"]
    ]
  },

  stretch: {
    title: "Stretch & Mobility",
    steps: [
      ["Shoulder rolls", "30 seconds"],
      ["Neck mobility", "30 seconds"],
      ["Gentle side stretch", "30 seconds each side"],
      ["Hamstring stretch", "30 seconds each side"],
      ["Easy breathing", "1–2 minutes"]
    ]
  },

  energy: {
    title: "Quick Energy",
    steps: [
      ["March in place", "1 minute"],
      ["Arm circles", "30 seconds"],
      ["Step side-to-side", "1 minute"],
      ["Wall push-ups", "8–10 reps"],
      ["Easy cool-down", "1 minute"]
    ]
  },

  relax: {
    title: "Wind Down",
    steps: [
      ["Slow breathing", "1 minute"],
      ["Shoulder rolls", "30 seconds"],
      ["Gentle neck mobility", "30 seconds"],
      ["Easy full-body stretch", "2 minutes"],
      ["Slow breathing", "1 minute"]
    ]
  }

};


const movementCards =
  document.querySelectorAll(".movement-card[data-routine]");

const routineDisplay =
  document.getElementById("routineDisplay");

const routineTitle =
  document.getElementById("routineTitle");

const routineList =
  document.getElementById("routineList");

const randomRoutine =
  document.getElementById("randomRoutine");

const closeRoutine =
  document.getElementById("closeRoutine");


function showRoutine(type) {

  const routine = movementRoutines[type];

  if (!routine) return;

  routineTitle.textContent = routine.title;

  routineList.innerHTML = "";

  routine.steps.forEach((step, index) => {

    const item = document.createElement("div");

    item.className = "routine-step";

    item.innerHTML = `
      <div class="routine-number">
        ${index + 1}
      </div>

      <div>
        <strong>${step[0]}</strong>
        <span>${step[1]}</span>
      </div>
    `;

    routineList.appendChild(item);

  });

  routineDisplay.hidden = false;

  routineDisplay.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


movementCards.forEach(card => {

  card.addEventListener("click", () => {

    const type =
      card.dataset.routine;

    showRoutine(type);

  });

});


if (randomRoutine) {

  randomRoutine.addEventListener("click", () => {

    const types =
      Object.keys(movementRoutines);

    const randomType =
      types[Math.floor(Math.random() * types.length)];

    showRoutine(randomType);

  });

}


if (closeRoutine) {

  closeRoutine.addEventListener("click", () => {

    routineDisplay.hidden = true;

  });

}
