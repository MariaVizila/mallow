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

    selectedItems.push(
      styleData.vibe
    );

  }


  if (styleData.color) {

    selectedItems.push(
      styleData.color
    );

  }


  selectedItems.push(
    ...styleData.accessories
  );


  /* =========================
     COUNT
  ========================== */

  selectionCount.textContent =
    `${selectedItems.length} selected`;


  /* =========================
     TITLE
  ========================== */

  if (styleData.vibe) {

    previewTitle.textContent =
      `${styleData.vibe} vibe`;

  } else {

    previewTitle.textContent =
      "Your vibe";

  }


  /* =========================
     DESCRIPTION
  ========================== */

  if (selectedItems.length === 0) {

    previewDescription.textContent =
      "Start choosing things on the left to create your personal style.";

  } else {

    previewDescription.textContent =
      "A little collection of things that feel like you.";

  }


  /* =========================
     TAGS
  ========================== */

  previewTags.innerHTML = "";


  if (selectedItems.length === 0) {

    const empty =
      document.createElement("span");

    empty.className =
      "empty-tag";

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


  /* =========================
     SCORE
  ========================== */

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

        choice.classList.add(
          "selected"
        );

      }

    });


    /* Restore color */

    colorChoices.forEach(choice => {

      if (
        choice.dataset.value ===
        styleData.color
      ) {

        choice.classList.add(
          "selected"
        );

      }

    });


    /* Restore accessories */

    accessoryChoices.forEach(choice => {

      if (
        styleData.accessories.includes(
          choice.dataset.value
        )
      ) {

        choice.classList.add(
          "selected"
        );

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
