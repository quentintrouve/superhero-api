/*** CONFIG API ***/

const URL_CORS: string = "https://cors-anywhere.herokuapp.com/"; // Fix l'erreur "Access-Control-Allow-Origin"
const URL_API: string = "https://superheroapi.com/api/";
const ACCESS_TOKEN: string = "10218347135043962";

/*** ELEMENTS ***/

/* Call to action */
const $searchButton = document.getElementById("searchButton") as HTMLElement;
const $addButton = document.getElementById("addButton") as HTMLElement;
const $refreshButton = document.getElementById("refreshButton") as HTMLElement;
const $imgButtonHero = document.getElementById("imgButtonHero") as HTMLElement;
const $imgButtonTeam = document.getElementById("imgButtonTeam") as HTMLElement;

/* Image */
const $imgHeroContainer = document.getElementById("imgHero") as HTMLElement;
const $img = document.querySelector(".card__img img") as HTMLElement;
const $imgTeamContainer = document.getElementById("imgTeam") as HTMLElement;

const $svgArrowHero = document.querySelector(
  "#imgButtonHero .svg--arrow"
) as HTMLElement;
const $svgArrowTeam = document.querySelector(
  "#imgButtonTeam .svg--arrow"
) as HTMLElement;

/* Bloc content */
const $contentPresentation = document.querySelector(
  ".card__content--presentation"
) as HTMLElement;
const $contentIdentity = document.querySelector(
  ".card__content--hero"
) as HTMLElement;
const $logoContainer = document.querySelector(
  ".card__containerLogo"
) as HTMLElement;
const $nameContainer = document.getElementById("heroNameTeam") as HTMLElement;

/* Caracteristic */
const $name = document.getElementById("name") as HTMLElement;
const $id = document.getElementById("id") as HTMLElement;
const $realName = document.getElementById("realName") as HTMLElement;
const $race = document.getElementById("race") as HTMLElement;
const $poids = document.getElementById("poids") as HTMLElement;
const $intelligence = document.getElementById("intelligence") as HTMLElement;
const $force = document.getElementById("force") as HTMLElement;
const $vitesse = document.getElementById("vitesse") as HTMLElement;
const $puissance = document.getElementById("puissance") as HTMLElement;
const $combat = document.getElementById("combat") as HTMLElement;

const $intelligenceTeam = document.getElementById(
  "intelligenceTeam"
) as HTMLElement;
const $forceTeam = document.getElementById("forceTeam") as HTMLElement;
const $vitesseTeam = document.getElementById("vitesseTeam") as HTMLElement;
const $puissanceTeam = document.getElementById("puissanceTeam") as HTMLElement;
const $combatTeam = document.getElementById("combatTeam") as HTMLElement;

/** TEAM OBJECT **/

let herosOnMyTeam: {
  count: number;
  imgHero: string;
  name: string;
};

herosOnMyTeam = {
  count: 0,
  imgHero: "",
  name: "",
};

/** ACTIONS **/

/* Récupère la valeur d'entré de l'utilisateur */
function getHeroName(): string {
  return (document.querySelector('input[name="nameHero"]') as HTMLInputElement)
    .value;
}

/* Lance une requête à l'API SuperHero avec l'entrée de l'utlisateur */

// Si erreur : le contenu de présentation reste en place et son contenu est changé avec l'erreur renvoyé par l'API
function searchHeroByName(): Promise<any> {
  $contentPresentation.textContent = "Recherche en cours";
  return axios
    .get(`${URL_CORS}${URL_API}${ACCESS_TOKEN}/search/${getHeroName()}`)
    .then(function (response) {
      if (response.data["error"]) {
        $contentPresentation.style.display = "flex";
        $contentIdentity.style.display = "none";
        $contentPresentation.textContent = `Erreur lors du chargement de ton Super Héro : ${response.data["error"]}`;
      } else {
        getHeroInfo(response);
        $contentPresentation.style.display = "none";
        $contentIdentity.style.display = "flex";
      }
    })
    .catch(function (error) {
      $contentPresentation.textContent = `Erreur lors du chargement de ton Super Héro : ${error}`;
    });
}

/* Récupère les infos de la reponse API et les affiches dans le DOM */

// Suppression des logos réseaux sociaux sur l'image de présentation
function getHeroInfo(response): void {
  $logoContainer.style.display = "none";

  const result = response.data.results[0];
  $img.setAttribute("src", result.image["url"]);
  $name.textContent = result.name;
  $id.textContent = `#${result.id}`;
  $realName.textContent = result.biography["full-name"];
  $race.textContent = result.appearance["race"];
  $poids.textContent = result.appearance["weight"][1];
  $intelligence.textContent = result.powerstats["intelligence"];
  $force.textContent = result.powerstats["strength"];
  $vitesse.textContent = result.powerstats["speed"];
  $puissance.textContent = result.powerstats["power"];
  $combat.textContent = result.powerstats["combat"];
}

/* Ajoute les caractéristics du héro présenté dans le bloc team */

// Vérification que le nombre max de héro ne soit pas atteint
// Ajout de l'image et du nom du héro dans l'objet herosOnMyTeam
// MAJ du nombre de héros dans la team
function addToMyTeam(herosOnMyTeam): void {
  if (herosOnMyTeam.count < 4) {
    const $liElement = document.createElement("li");
    $liElement.textContent = $name.textContent;
    $nameContainer.appendChild($liElement);
    $intelligenceTeam.textContent = `${
      parseInt($intelligenceTeam.textContent) +
      parseInt($intelligence.textContent)
    }`;
    $forceTeam.textContent = `${
      parseInt($forceTeam.textContent) + parseInt($force.textContent)
    }`;
    $vitesseTeam.textContent = `${
      parseInt($vitesseTeam.textContent) + parseInt($vitesse.textContent)
    }`;
    $puissanceTeam.textContent = `${
      parseInt($puissanceTeam.textContent) + parseInt($puissance.textContent)
    }`;
    $combatTeam.textContent = `${
      parseInt($combatTeam.textContent) + parseInt($combat.textContent)
    }`;
    herosOnMyTeam.imgHero = $img.getAttribute("src");
    herosOnMyTeam.count += 1;
    herosOnMyTeam.name = $name.textContent;
    isAdd();
  } else {
    alert(
      "Ton équipe comprend déjà 4 Super Héros. Clic sur le bouton de rafraîssement pour remettre à zéro ta Team."
    );
  }
}

function toggleButton($button): void {
  $button.disabled = !$button.disabled;
}

function openImage(
  $button: HTMLElement,
  $container: HTMLElement,
  $svg: HTMLElement
): void {
  $button.addEventListener("click", () => {
    $container.classList.toggle("is-open");
    $svg.classList.toggle("is-rotate");
  });
}

/* Place l'image du héro au bon emplacement dans le bloc Team selon le nombre de héros déjà dans la Team */

//Ajout de la source et du nom du héro dans le alt récupérés dans l'objet herosOnMyTeam
function showImgTeam(team): void {
  const imgHero = team.imgHero;
  const nameHero = team.name;

  switch (team.count) {
    case 1:
      const $miniImg1 = document.getElementById("imgHero1");
      $miniImg1.setAttribute("src", imgHero);
      $miniImg1.setAttribute("alt", nameHero);
      break;
    case 2:
      const $miniImg2 = document.getElementById("imgHero2");
      $miniImg2.setAttribute("src", imgHero);
      $miniImg2.setAttribute("alt", nameHero);
      break;
    case 3:
      const $miniImg3 = document.getElementById("imgHero3");
      $miniImg3.setAttribute("src", imgHero);
      $miniImg3.setAttribute("alt", nameHero);
      break;
    case 4:
      const $miniImg4 = document.getElementById("imgHero4");
      $miniImg4.setAttribute("src", imgHero);
      $miniImg4.setAttribute("alt", nameHero);
      break;
    default:
      console.log("error");
  }
}

/* Remise à zéro de la Team */
function reset(): void {
  herosOnMyTeam.count = 0;
  $nameContainer.textContent = "";
  const $valuesTeam = document.querySelectorAll(".card__valuesTeam");
  $valuesTeam.forEach(($li) => {
    $li.textContent = "0";
  });
  const $imgHero = document.querySelectorAll(".imgHero");
  $imgHero.forEach(($img) => {
    $img.setAttribute("src", "");
    $img.setAttribute("alt", "");
  });
}

/* Transformation du bouton add en une notification lorqu'un héro à bien été ajouté à la Team */
function isAdd(): void {
  $addButton.classList.add("is-add");
  $addButton.textContent = "Héro Ajouté !";
}

function resetIsAdd(): void {
  $addButton.classList.remove("is-add");
  $addButton.textContent = "Ajouter à ma team";
}

/** ÉVÈNNEMENTS **/

$searchButton.addEventListener("click", () => {
  toggleButton($searchButton);
  toggleButton($addButton);
  searchHeroByName()
    .then(() => toggleButton($searchButton))
    .then(() => toggleButton($addButton));
  resetIsAdd();
});

$addButton.addEventListener("click", () => {
  addToMyTeam(herosOnMyTeam);
  showImgTeam(herosOnMyTeam);
});

$refreshButton.addEventListener("click", reset);

openImage($imgButtonHero, $imgHeroContainer, $svgArrowHero);
openImage($imgButtonTeam, $imgTeamContainer, $svgArrowTeam);
