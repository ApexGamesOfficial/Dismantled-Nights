const STORAGE_KEYS = {
  library: "dismantledNightsLibrary",
  reduceMotion: "dismantledNightsReduceMotion",
  effects: "dismantledNightsEffects"
};

const GAME_ID = "tnf-reopened";

const pages = {
  home: document.getElementById("homePage"),
  store: document.getElementById("storePage"),
  library: document.getElementById("libraryPage"),
  about: document.getElementById("aboutPage"),
  settings: document.getElementById("settingsPage")
};

const navLinks =
  document.querySelectorAll(".nav-link");

const accountModal =
  document.getElementById("accountModal");

const launcherModal =
  document.getElementById("launcherModal");

const gameModal =
  document.getElementById("gameModal");

const profileButton =
  document.getElementById("profileButton");

const launcherButton =
  document.getElementById("launcherButton");

const libraryLauncherButton =
  document.getElementById(
    "libraryLauncherButton"
  );

const settingsSignInButton =
  document.getElementById(
    "settingsSignInButton"
  );

const libraryEmpty =
  document.getElementById("libraryEmpty");

const libraryGames =
  document.getElementById("libraryGames");

const addLibraryButtons =
  document.querySelectorAll(
    ".add-library-button"
  );

const removeLibraryButton =
  document.querySelector(
    ".remove-library-button"
  );

const installGameButton =
  document.querySelector(
    ".install-game-button"
  );

const gameDetailsButtons =
  document.querySelectorAll(
    ".game-details-button"
  );

const storeSearch =
  document.getElementById("storeSearch");

const gameGrid =
  document.getElementById("gameGrid");

const searchEmpty =
  document.getElementById("searchEmpty");

const authTabs =
  document.querySelectorAll(".auth-tab");

const accountModalTitle =
  document.getElementById(
    "accountModalTitle"
  );

const accountModalText =
  document.getElementById(
    "accountModalText"
  );

const apexAuthText =
  document.getElementById(
    "apexAuthText"
  );

const googleAuthText =
  document.getElementById(
    "googleAuthText"
  );

const apexAuthButton =
  document.getElementById(
    "apexAuthButton"
  );

const googleAuthButton =
  document.getElementById(
    "googleAuthButton"
  );

const motionToggle =
  document.getElementById(
    "motionToggle"
  );

const effectsToggle =
  document.getElementById(
    "effectsToggle"
  );

const toast =
  document.getElementById("toast");

const recommendedRail =
  document.getElementById(
    "recommendedRail"
  );

const recommendedPrev =
  document.getElementById(
    "recommendedPrev"
  );

const recommendedNext =
  document.getElementById(
    "recommendedNext"
  );

const featuredPrev =
  document.getElementById(
    "featuredPrev"
  );

const featuredNext =
  document.getElementById(
    "featuredNext"
  );

let toastTimer = null;


/* =============================
   PAGE NAVIGATION
============================= */

function navigateTo(pageName) {

  if (!pages[pageName]) {
    return;
  }

  Object.entries(pages).forEach(
    ([name, page]) => {

      page.classList.toggle(
        "active",
        name === pageName
      );

    }
  );

  navLinks.forEach((navLink) => {

    navLink.classList.toggle(
      "active",
      navLink.dataset.page === pageName
    );

  });

  window.scrollTo({
    top: 0,

    behavior:
      document.body.classList.contains(
        "reduce-motion"
      )
        ? "auto"
        : "smooth"
  });

  if (pageName === "library") {
    renderLibrary();
  }
}


document
  .querySelectorAll("[data-page]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {
        navigateTo(
          button.dataset.page
        );
      }
    );

  });


/* =============================
   MODALS
============================= */

function openModal(modal) {

  if (!modal) {
    return;
  }

  modal.classList.remove("hidden");

  document.body.style.overflow =
    "hidden";
}


function closeModal(modal) {

  if (!modal) {
    return;
  }

  modal.classList.add("hidden");

  const anyModalOpen = [
    accountModal,
    launcherModal,
    gameModal
  ].some(
    (item) =>
      item &&
      !item.classList.contains("hidden")
  );

  if (!anyModalOpen) {
    document.body.style.overflow = "";
  }
}


document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        closeModal(
          document.getElementById(
            button.dataset.closeModal
          )
        );

      }
    );

  });


[
  accountModal,
  launcherModal,
  gameModal
].forEach((modal) => {

  if (!modal) {
    return;
  }

  modal.addEventListener(
    "click",
    (event) => {

      if (event.target === modal) {
        closeModal(modal);
      }

    }
  );

});


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }

    [
      accountModal,
      launcherModal,
      gameModal
    ].forEach((modal) => {

      if (
        modal &&
        !modal.classList.contains(
          "hidden"
        )
      ) {
        closeModal(modal);
      }

    });

  }
);


/* =============================
   ACCOUNT UI
============================= */

function openAccountModal() {
  openModal(accountModal);
}


profileButton?.addEventListener(
  "click",
  openAccountModal
);


settingsSignInButton?.addEventListener(
  "click",
  openAccountModal
);


authTabs.forEach((tab) => {

  tab.addEventListener(
    "click",
    () => {

      const mode =
        tab.dataset.authMode;

      authTabs.forEach((item) => {

        item.classList.toggle(
          "active",
          item === tab
        );

      });


      if (mode === "signup") {

        accountModalTitle.textContent =
          "Create your account.";

        accountModalText.textContent =
          "Create a Dismantled Nights account using an existing identity.";

        apexAuthText.textContent =
          "Sign Up with Apex Games";

        googleAuthText.textContent =
          "Sign Up with Google";

      } else {

        accountModalTitle.textContent =
          "Welcome back.";

        accountModalText.textContent =
          "Sign in to access your library across Dismantled Nights.";

        apexAuthText.textContent =
          "Log in with Apex Games";

        googleAuthText.textContent =
          "Log in with Google";

      }

    }
  );

});


apexAuthButton?.addEventListener(
  "click",
  () => {

    showToast(
      "Apex Games authentication will be connected later."
    );

  }
);


googleAuthButton?.addEventListener(
  "click",
  () => {

    showToast(
      "Google authentication will be connected later."
    );

  }
);


/* =============================
   LAUNCHER
============================= */

function showLauncherModal() {
  openModal(launcherModal);
}


launcherButton?.addEventListener(
  "click",
  showLauncherModal
);


libraryLauncherButton?.addEventListener(
  "click",
  showLauncherModal
);


installGameButton?.addEventListener(
  "click",
  () => {

    openModal(
      launcherModal
    );

    showToast(
      "The Dismantled Nights Launcher will handle installations."
    );

  }
);


/* =============================
   GAME DETAILS
============================= */

gameDetailsButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {
        openModal(gameModal);
      }
    );

  }
);


/* =============================
   LIBRARY STORAGE
============================= */

function getLibrary() {

  try {

    const storedLibrary =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEYS.library
        )
      );

    return Array.isArray(
      storedLibrary
    )
      ? storedLibrary
      : [];

  } catch {

    return [];

  }

}


function saveLibrary(library) {

  localStorage.setItem(
    STORAGE_KEYS.library,
    JSON.stringify(library)
  );

}


function isGameInLibrary(gameId) {

  return getLibrary().includes(
    gameId
  );

}


function addGameToLibrary(gameId) {

  const library =
    getLibrary();


  if (
    library.includes(gameId)
  ) {

    showToast(
      "This game is already in your library."
    );

    return;

  }


  library.push(gameId);

  saveLibrary(library);

  renderLibrary();

  updateAddButtons();


  showToast(
    "Those Nights at Fredbear's: Reopened added to your library."
  );

}


function removeGameFromLibrary(
  gameId
) {

  const library =
    getLibrary().filter(
      (item) =>
        item !== gameId
    );

  saveLibrary(library);

  renderLibrary();

  updateAddButtons();


  showToast(
    "Game removed from your library."
  );

}


function renderLibrary() {

  const hasGame =
    isGameInLibrary(GAME_ID);


  libraryEmpty?.classList.toggle(
    "hidden",
    hasGame
  );


  libraryGames?.classList.toggle(
    "hidden",
    !hasGame
  );

}


function updateAddButtons() {

  const added =
    isGameInLibrary(GAME_ID);


  addLibraryButtons.forEach(
    (button) => {

      if (added) {

        button.textContent =
          "In Library";

      } else {

        button.textContent =
          button.classList.contains(
            "secondary-button"
          )
            ? "+ Add to Library"
            : "Add to Library";

      }

    }
  );

}


addLibraryButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        addGameToLibrary(
          GAME_ID
        );

      }
    );

  }
);


removeLibraryButton?.addEventListener(
  "click",
  () => {

    removeGameFromLibrary(
      GAME_ID
    );

  }
);


/* =============================
   STORE SEARCH
============================= */

storeSearch?.addEventListener(
  "input",
  () => {

    const query =
      storeSearch.value
        .trim()
        .toLowerCase();


    const cards =
      Array.from(
        gameGrid.querySelectorAll(
          ".game-card[data-name]"
        )
      );


    let visibleGames = 0;


    cards.forEach((card) => {

      const matches =
        card.dataset.name.includes(
          query
        );


      card.classList.toggle(
        "hidden",
        !matches
      );


      if (matches) {
        visibleGames += 1;
      }

    });


    searchEmpty?.classList.toggle(
      "hidden",
      visibleGames > 0
    );

  }
);


/* =============================
   HOME GAME RAIL
============================= */

function scrollRecommended(
  direction
) {

  if (!recommendedRail) {
    return;
  }


  const firstCard =
    recommendedRail.querySelector(
      ".storefront-game-card"
    );


  const amount =
    firstCard
      ? firstCard
          .getBoundingClientRect()
          .width + 18
      : 420;


  recommendedRail.scrollBy({

    left:
      direction * amount,

    behavior:
      document.body.classList.contains(
        "reduce-motion"
      )
        ? "auto"
        : "smooth"

  });

}


recommendedPrev?.addEventListener(
  "click",
  () => {

    scrollRecommended(-1);

  }
);


recommendedNext?.addEventListener(
  "click",
  () => {

    scrollRecommended(1);

  }
);


/* =============================
   FEATURED HERO CAROUSEL

   Only one featured game exists
   right now.

   The controls are already in
   place for future featured games.
============================= */

function singleFeaturedGameNotice() {

  showToast(
    "More featured games are coming soon."
  );

}


featuredPrev?.addEventListener(
  "click",
  singleFeaturedGameNotice
);


featuredNext?.addEventListener(
  "click",
  singleFeaturedGameNotice
);


/* =============================
   SETTINGS
============================= */

function setToggleState(
  toggle,
  enabled
) {

  if (!toggle) {
    return;
  }


  toggle.classList.toggle(
    "active",
    enabled
  );


  toggle.setAttribute(
    "aria-checked",
    String(enabled)
  );

}


function loadSettings() {

  const reduceMotion =
    localStorage.getItem(
      STORAGE_KEYS.reduceMotion
    ) === "true";


  const savedEffects =
    localStorage.getItem(
      STORAGE_KEYS.effects
    );


  const effectsEnabled =
    savedEffects === null
      ? true
      : savedEffects === "true";


  document.body.classList.toggle(
    "reduce-motion",
    reduceMotion
  );


  document.body.classList.toggle(
    "effects-disabled",
    !effectsEnabled
  );


  setToggleState(
    motionToggle,
    reduceMotion
  );


  setToggleState(
    effectsToggle,
    effectsEnabled
  );

}


motionToggle?.addEventListener(
  "click",
  () => {

    const enabled =
      !motionToggle.classList.contains(
        "active"
      );


    setToggleState(
      motionToggle,
      enabled
    );


    document.body.classList.toggle(
      "reduce-motion",
      enabled
    );


    localStorage.setItem(
      STORAGE_KEYS.reduceMotion,
      String(enabled)
    );

  }
);


effectsToggle?.addEventListener(
  "click",
  () => {

    const enabled =
      !effectsToggle.classList.contains(
        "active"
      );


    setToggleState(
      effectsToggle,
      enabled
    );


    document.body.classList.toggle(
      "effects-disabled",
      !enabled
    );


    localStorage.setItem(
      STORAGE_KEYS.effects,
      String(enabled)
    );

  }
);


/* =============================
   TOAST
============================= */

function showToast(message) {

  if (!toast) {
    return;
  }


  clearTimeout(
    toastTimer
  );


  toast.textContent =
    message;


  toast.classList.add(
    "visible"
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "visible"
        );

      },
      2800
    );

}


/* =============================
   INIT
============================= */

function init() {

  loadSettings();

  renderLibrary();

  updateAddButtons();

}


init();
