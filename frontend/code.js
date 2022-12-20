
let loggedInOrNot = false;
let path = "http://localhost:3000/";
//let path = "http://172.21.7.125:8080/";
//lataa harrastukset ja tarkistaa onko sisäänkirjauduttu jo
function init() {
  let infoText = document.getElementById("infoText");
  infoText.innerHTML = "Ladataan tehtävälista palvelimelta, odota...";
  loadHobbies();
  tarkistaOnkoLogin();
}


//hakee palvelimelta loginit ja jos sieltä löytyy yksi, kutsutaan pysyKirjautuneena funktiota käyttäjätunnuksella
const tarkistaOnkoLogin = async () => {
  let response = await fetch(`${path}login`);
  let logins = await response.json();
  if (logins.length < 1) {
    loggedInOrNot = false;
    //console.log("Ei ole logannut sisään");
  }
  else {
    loggedInOrNot = true;
    //console.log("On logannut sisään");
    let meidanLogin = logins[0];
    pysyKirjautuneena(meidanLogin.username)

  }
}

//Poistutaan editointimoodista, eli nappi muutetaan takaisin "lisää"-nimiseksi ja vaihdetaan väriä.
function changeBackFromEditMode() {
  const addeditnamiska = document.getElementById("addeditnamiska");
  addeditnamiska.value = "Lisää";
  addeditnamiska.style.backgroundColor = "#F0F0F0";
  addeditnamiska.removeAttribute("editid");

}

//Tyhjätään lomakkeen kentät
function clearFields() {
  let newHobbyName = document.getElementById("newHobbyName");
  //  let donelkm = document.getElementById("done");
  let outsidehobbybool = document.getElementById("outsidehobbybool");
  //document.getElementById("outsidehobbybool").checked = false;
  let insidehobbybool = document.getElementById("insidehobbybool");
  let toolsbool = document.getElementById("toolsbool");
  let peopleneededbool = document.getElementById("peopleneededbool");
  let hobbytags = document.getElementById("hobbytags");
  newHobbyName.value = "";
  //donelkm.value = "";
  outsidehobbybool.checked = false;
  insidehobbybool.checked = false;
  toolsbool.checked = false;
  peopleneededbool.checked = false;
  hobbytags.value = "";

}


//Editoitaan harrastusta tietokannassa ja näytetään muuttuneen tiedot myös sen paikassa listassa
async function editHobby() {

  let newHobbyName = document.getElementById("newHobbyName");
  //let donelkm = document.getElementById("done");
  let outsidehobbybool = document.getElementById("outsidehobbybool");
  let insidehobbybool = document.getElementById("insidehobbybool");
  let toolsbool = document.getElementById("toolsbool");
  let peopleneededbool = document.getElementById("peopleneededbool");
  let hobbytags = document.getElementById("hobbytags");

  const data = {
    hobbyname: newHobbyName.value,
    //done: donelkm.value,
    outside: outsidehobbybool.checked,
    inside: insidehobbybool.checked,
    toolsneeded: toolsbool.checked,
    otherhumansneeded: peopleneededbool.checked,
    tags: hobbytags.value

  };


  const addeditnamiska = document.getElementById("addeditnamiska");
  let editid = addeditnamiska.getAttribute("editid");

  const response = await fetch(`${path}hobbies/${editid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  let editedHobby = await response.json();
  let editedLi = createHobbyListItem(editedHobby);



  let liToChange = document.getElementById(editid);
  const parent = liToChange.parentNode;
  parent.replaceChild(editedLi, liToChange);

  let infoText = document.getElementById("infoText");
  infoText.innerHTML = "";

  clearFields();
  changeBackFromEditMode();

}



//Laitetaan editoitavan harrastuksen tiedot paikoilleen lomakkeeseen näkyville
const changeIntoEditMode = (edithobby) => {
  const addeditnamiska = document.getElementById("addeditnamiska")
  addeditnamiska.value = "Tallenna"
  addeditnamiska.style.backgroundColor = "yellow"

  let newHobbyName = document.getElementById("newHobbyName");
  // let donelkm = document.getElementById("done");
  let outsidehobbybool = document.getElementById("outsidehobbybool");
  let insidehobbybool = document.getElementById("insidehobbybool");
  let toolsbool = document.getElementById("toolsbool");
  let peopleneededbool = document.getElementById("peopleneededbool");
  let hobbytags = document.getElementById("hobbytags");

  newHobbyName.value = edithobby.hobbyname;
  //donelkm.value = edithobby.done;
  outsidehobbybool.checked = edithobby.outside;
  insidehobbybool.checked = edithobby.inside;
  toolsbool.checked = edithobby.toolsneeded;
  peopleneededbool.checked = edithobby.otherhumansneeded;
  hobbytags.value = edithobby.tags;
  addeditnamiska.setAttribute("editid", edithobby._id);
  scrollTo(0, 0);
}


//Poistetaan harrastus tietokannasta ja ruudussa listasta
async function removeHobby(id) {
  const response = await fetch(`${path}hobbies/${id}`, {
    method: "DELETE"
  })
  let responseJson = await response.json();
  let li = document.getElementById(id);

  li.parentNode.removeChild(li);

  let hobbiesList = document.getElementById("hobbiesList");
  if (!hobbiesList.hasChildNodes()) {
    let infoText = document.getElementById("infoText");
    infoText.innerHTML = "Ei harrastuksia";
  }
}


//Lisätään harrastus tietokantaan ja ruudussa lista-alkioksi
async function addHobby() {

  let newHobbyName = document.getElementById("newHobbyName");
  //let donelkm = document.getElementById("done");
  let outsidehobbybool = document.getElementById("outsidehobbybool");
  let insidehobbybool = document.getElementById("insidehobbybool");
  let toolsbool = document.getElementById("toolsbool");
  let peopleneededbool = document.getElementById("peopleneededbool");
  let hobbytags = document.getElementById("hobbytags");
  if (newHobbyName.value == "") {
    alert("Harrastuksesi ei sisältänyt harrastuksen nimeä, joka on pakollinen tieto. Harrastustasi ei siis lisätty. Yritä uudestaan.")
  }
  else {
    try {

      const data = {
        hobbyname: newHobbyName.value,
        //  done: donelkm.value,
        outside: outsidehobbybool.checked,
        inside: insidehobbybool.checked,
        toolsneeded: toolsbool.checked,
        otherhumansneeded: peopleneededbool.checked,
        tags: hobbytags.value
      };

      const response = await fetch(`${path}hobbies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });



      let hobby = await response.json();

      if (!response.ok) {
        throw Error(hobby.error)
        // throw Error(response.body);

      }
      let hobbiesList = document.getElementById("hobbiesList");
      let li = createHobbyListItem(hobby);
      hobbiesList.appendChild(li);

      let infoText = document.getElementById("infoText");
      infoText.innerHTML = "";
      clearFields();
    }
    catch (err) {
     


      document.getElementById("errorsubmit").innerHTML = err.message;
    }
  }
};

//Ladataan kaikki harrastukset
async function loadHobbies() {
  let response = await fetch(`${path}hobbies`);
  let hobbies = await response.json();
  showHobbies(hobbies);
}

//ladataan sisäharrastukset
async function loadInsideHobbies() {
  let response = await fetch(`${path}hobbies/inside`);
  let hobbies = await response.json();
  showHobbies(hobbies);
}

//ladataan ulkoharrastukset
async function loadOutsideHobbies() {
  let response = await fetch(`${path}hobbies/outside`);
  let hobbies = await response.json();
  showHobbies(hobbies);
}

//Ladataan niin ulko- kuin sisäharrastukset
async function loadOutsideInsideHobbies() {
  let response = await fetch(`${path}hobbies/outsideinside`);
  let hobbies = await response.json();
  showHobbies(hobbies);
}

//Funktio joka auttaa luomalla kutsutuilla arvoilla uuden noodin.
//esimerkkikutsu createNodeWithSpecs("node", "class", "meidänluokka", "Span-elementti jossa on tekstiä")
//palauttaa luodun noodin
const createNodeWithSpecs = (element, attributetype, attributevalue, textvalue = "") => {
  let elem = document.createElement(element);
  let elem_attr = document.createAttribute(attributetype);
  elem_attr.value = attributevalue;
  elem.setAttributeNode(elem_attr);
  if (textvalue != "") {
    let texti = document.createTextNode(textvalue);
    elem.appendChild(texti);

  }
  return elem;
}

//lisätään käyttäjän hobbyinfoon uusi harrastus, eli editoidaan tosiasiassa käyttäjää
// sitten kutsutaan loadUserHobbies
const addToUserHobbies = async (hobbyid) => {
  const loggedinuserid = document.getElementById("loggedinuserid").innerHTML;
  //console.log(loggedinuserid + " loggedinuserid")
  const data = {
    hobbyinfo: [hobbyid, 0] //lisätään ensimmäistä kertaa joten harrastuskertoja ei ole 
  };
//  console.log(loggedinuserid + " loggedinuserid")
  const response = await fetch(`${path}users/${loggedinuserid}/hobbies/${hobbyid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  let updatedUser = await response.json();
//  console.log(updatedUser)
  loadUserHobbies();

}

//luodaan yksi li-elementti joka sisältää harrastuksen tiedot (ei tägejä)
const createHobbyListItem = (hobby) => {

  let li = createNodeWithSpecs("li", "id", hobby._id)
  let divi = createNodeWithSpecs("div", "class", "hobbyblocki")
  let phobbyname = createNodeWithSpecs("p", "class", "harrastusnimi", hobby.hobbyname);
  divi.appendChild(phobbyname);
  if (hobby.outside) {
    let outsidespan = createNodeWithSpecs("span", "class", "outsidespan", ` Ulkona |`);
    divi.appendChild(outsidespan);
  }
  if (hobby.inside) {
    let insidespan = createNodeWithSpecs("span", "class", "insidespan", ` Sisällä |`);
    divi.appendChild(insidespan);
  }
  if (hobby.toolsneeded) {
    let toolspan = createNodeWithSpecs("span", "class", "toolspan", ` Välinetarve |`);
    divi.appendChild(toolspan);
  }
  if (hobby.otherhumansneeded) {
    let socialspan = createNodeWithSpecs("span", "class", "socialspan", ` Seuratarve |`);
    divi.appendChild(socialspan);
  }

let username = document.getElementById("loggedinuser").innerHTML;

if ((loggedInOrNot && username == "admin") || ( loggedInOrNot && username == "ope")) {
  let editspan = createNodeWithSpecs("span", "class", "edit", " Edit ");
  editspan.onclick = function () {
    changeIntoEditMode(hobby);
  }
  divi.appendChild(editspan);
  let deletespan = createNodeWithSpecs("span", "class", "delete", " x ");
  deletespan.onclick = function () { removeHobby(hobby._id) };
  divi.appendChild(deletespan);
}
  if (loggedInOrNot == true) {
    let addbutton = createNodeWithSpecs("button", "class", "nappiadd", "Lisää omiin");
    addbutton.onclick = function () { addToUserHobbies(hobby._id) };
    divi.appendChild(addbutton);
  };
  li.appendChild(divi);
  return li
}


//Näytetään harrastukset ruudussa
function showHobbies(hobbies) {

  let hobbiesList = document.getElementById("hobbiesList");
  let infoText = document.getElementById("infoText");
  // no hobbies
  if (hobbies.length === 0) {
    infoText.innerHTML = "Ei harrastuksia"
  } else {
   // console.log(hobbies.length);
    hobbies.forEach(hobby => {
      let li = createHobbyListItem(hobby);
      hobbiesList.appendChild(li);
    })
    infoText.innerHTML = "";
  }
};

//Funktio joka kertoo meille, ollaanko lisäys- vai editointimoodissa meidän napin mukaan.
//riippuen tuloksesta kutsutaan funktioita editHobby tai addHobby
const addOrEdit = () => {
  const addeditnamiska = document.getElementById("addeditnamiska");
  if (addeditnamiska.value == "Tallenna") {
    editHobby();
  } else {
    addHobby();
  }
}


const addeditnamiska = document.getElementById("addeditnamiska");

addeditnamiska.addEventListener("click", function () {

  addOrEdit()

});

//Tarkistetaan onko sisä- tai ulkoharrastussuodatukset päällä
const indoorcheck = document.getElementById("indoorcheck");
const outdoorcheck = document.getElementById("outdoorcheck");
indoorcheck.addEventListener("change", function () {
  if (indoorcheck.checked && outdoorcheck.checked) {
    loadOutsideInsideHobbies();
  }
  else if (indoorcheck.checked) {
    document.getElementById("hobbiesList").innerHTML = "";
    loadInsideHobbies();
  }
  else {
    document.getElementById("hobbiesList").innerHTML = "";
    loadHobbies();

  }

});

outdoorcheck.addEventListener("change", function () {
  if (indoorcheck.checked && outdoorcheck.checked) {
    loadOutsideInsideHobbies();
  }
  else if (outdoorcheck.checked) {
    document.getElementById("hobbiesList").innerHTML = "";
    loadOutsideHobbies();
  }
  else {
    document.getElementById("hobbiesList").innerHTML = "";
    loadHobbies();

  }

});


//Käyttäjä painaa nappia "Lisää harrastuskerta" ja tullaan tänne editoimaan tietokannassa käyttäjää
//lopuksi laitetaan lukumäärä näkyviin käyttäjän tämän harrastuksen tietoihin
const addHarrastusLkm = async (user, hobbyid) => {

  const userinOmatHarrastuksetul = document.getElementById("userinOmatHarrastukset");
  const loggedinuserid = user[0]._id;
  const harrastettuelem = document.getElementById("spanlkm" + " " + hobbyid);
  let hobbylkm = parseInt(harrastettuelem.innerHTML);
  // console.log("hobbylkm on " + hobbylkm)
  hobbylkm += 1;
  // console.log("lisäyksen jälkeen hobbylkm " + hobbylkm)
  const data = {
    hobbyinfo: [hobbyid, hobbylkm] //lisätään ensimmäistä kertaa joten harrastuskertoja ei ole 
  };

  // console.log(data);
  const response = await fetch(`${path}users/${loggedinuserid}/hobbies/${hobbyid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  let updatedUser = await response.json()
  // let updatedUserHobbies = updatedUser.hobbyinfo;
  // console.log(updatedUserHobbies)

  let lkmaiemmmin = harrastettuelem.innerHTML;
  let lkmnyt = parseInt(lkmaiemmmin);
  lkmnyt++;
  harrastettuelem.innerHTML = lkmnyt;

};


//Näytetään käyttäjän omat harrastukset ruudussa
const showUserHobbies = async (user) => {
  try {
    let userHobbyt = user[0].hobbyinfo;
    let response = await fetch(`${path}hobbies`);
    let hobbies = await response.json();

    const userinOmatHarrastukset = document.getElementById("userinOmatHarrastukset");
    userinOmatHarrastukset.innerHTML = "";
    for (let i = 0; i < userHobbyt.length; i++) {
      let li = createNodeWithSpecs("li", "id", user[0]._id + " " + userHobbyt[i].hobbyid);

      const hobbynameli = document.getElementById(userHobbyt[i].hobbyid);//harrastuksen li
      let nimi;
      for (let j = 0; j < hobbies.length; j++) {

        if (hobbies[j]._id == userHobbyt[i].hobbyid) {
          nimi = hobbies[j].hobbyname;
          break;
        }
      }


      let divi = createNodeWithSpecs("div", "class", "userhobbydiv");//userHobbyt[i].hobbyid
      let p = createNodeWithSpecs("p", "class", "userhobbyname", nimi);
      let spanlkminfo = createNodeWithSpecs("span", "class", "userhobbylkm", `Harrastettu: `);
      let spanlkmid = "spanlkm" + " " + userHobbyt[i].hobbyid;
      let spanlkm = createNodeWithSpecs("span", "id", spanlkmid, `${userHobbyt[i].hobbylkm}`);
      let lisaaHarrastusKertaNappi = createNodeWithSpecs("button", "class", "addlkmnappi", "Lisää harrastuskerta");
      lisaaHarrastusKertaNappi.addEventListener("click", () => addHarrastusLkm(user, userHobbyt[i].hobbyid, userHobbyt[i].hobbylkm));
      divi.appendChild(p);
      divi.appendChild(spanlkminfo);
      divi.appendChild(spanlkm);
      divi.appendChild(lisaaHarrastusKertaNappi);
      li.appendChild(divi);
      userinOmatHarrastukset.appendChild(li);
    }
  }
  catch (err) {
    console.log(err)
  }
}

//ladataan käyttäjän harrastukset eli tietokannasta otetaan käyttäjä, joka sisällä on hobbyinfo
const loadUserHobbies = async () => {
  try {
    const loggedinuser = document.getElementById("loggedinuser").innerHTML;
    let response = await fetch(`${path}users/${loggedinuser}`);
    let user = await response.json();

    if (!response.ok) {

      throw Error(user.error)

    }
    showUserHobbies(user)
  }
  catch (err) {
    console.log(err)
  }
};

//luodaan login tietokantaan
const loginTietokannassa = async (kayttajatunnus) => {
  try {

    const data = {
      username: kayttajatunnus,
    };

    const response = await fetch(`${path}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let login = await response.json();
    let loginid = document.getElementById("loginid");
    loginid.innerHTML = login._id;
    // console.log(loggedinuserid.innerHTML)
    if (!response.ok) {
      throw Error(login.error)
      // throw Error(response.body);
    }
  }
  catch (err) {
    document.getElementById("errorsubmit").innerHTML = err.message;
  }
}

//tarkistetaan käyttäjätunnus ja salasana, löytyykö tietokannasta sellainen user jolla on vastaava käyttäjätunnus ja salasana
//jos ok, mennään loginTietokannassa-funktioon
const tarkistaUsernameSalasana = async () => {
  const kayttajatunnus = document.getElementById("username").value;
  const salasana = document.getElementById("password").value;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  let response = await fetch(`${path}users/${kayttajatunnus}`);
  let userit = await response.json();
  if (userit.length < 1){
    alert("Käyttäjätunnuksesi ja salasanasi eivät vastaa tietokannassamme oleviin käyttäjiin. Yritä uudestaan.");
  }
else {

  let meidanUser = userit[0];

  if (meidanUser.username == kayttajatunnus && meidanUser.password == salasana) {
    const loggedinuserid = document.getElementById("loggedinuserid");
    loggedinuserid.innerHTML = meidanUser._id;
    loginTietokannassa(kayttajatunnus);
    return meidanUser.username;
  }
else {
  alert("Salasanasi on väärin. Tarkista ja yritä uudestaan.")
}
}
}

//tarkistetaan käyttäjätunnus ja salasana ja sitten pysytään kirjaututeena pysyKirjautuneena-funktion avulla.
const kirjauduSisaan = async () => {

  let meidanUser = await tarkistaUsernameSalasana();

  if (meidanUser) {
    pysyKirjautuneena(meidanUser)

  }
};


//Varmistaa että käyttäjän ja loginin tiedot ovat ruudussa
const pysyKirjautuneena = async (kayttajatunnus) => {
  const loggedin = document.getElementById("loggedin");
  const loggedininfo = document.getElementById("loggedininfo");
  loggedin.style.display = "block";
  const login = document.getElementById("login");
  login.style.display = "none";

  let response = await fetch(`${path}users/${kayttajatunnus}`);
  let userit = await response.json();
  let loggedinuserid = userit[0]._id;
  document.getElementById("loggedinuserid").innerHTML = loggedinuserid;
  // const uloskirjaudu = document.getElementById("uloskirjaudu");
  // let usernamelogin = uloskirjaudu.getAttribute("usernamelogin");
  // console.log(usernamelogin)
  // console.log("usernamelogin")
  loggedininfo.innerHTML = `Olet kirjautuneena sisään käyttäjänä`;
  const loggedinuser = document.getElementById("loggedinuser");
  loggedinuser.innerHTML = `${kayttajatunnus}`;
  const hobbiesList = document.getElementById("hobbiesList");
  hobbiesList.innerHTML = "";
  let responselogin = await fetch(`${path}login/`);
  let loginit = await responselogin.json();
  const loginidpaikka = document.getElementById("loginid");
  loginidpaikka.innerHTML = loginit[0]._id;
  loggedInOrNot = true;

  loadHobbies();
  loadUserHobbies();
}


//Poistetaan käyttäjän tiedot niiden paikoilta sivulla (ei näkyvissä käyttäjälle)
const uloskirjauduPalvelusta = () => {
  const loggedin = document.getElementById("loggedin");
  const loggedininfo = document.getElementById("loggedininfo");
  const loggedinuser = document.getElementById("loggedinuser");
  loggedin.style.display = "none";
  const login = document.getElementById("login");
  login.style.display = "block";
  loggedininfo.innerHTML = "";
  loggedinuser.innerHTML = "";
  let loginid = document.getElementById("loginid");
  loginid.innerHTML = "";
  const hobbiesList = document.getElementById("hobbiesList");
  hobbiesList.innerHTML = "";
  loggedInOrNot = false;
  const loggeduserid = document.getElementById("loggedinuserid");
  loggeduserid.innerHTML = "";
  loadHobbies();

}

//tietokannasta poistetaan logini
const ulosKirjauduTietokannasta = async () => {

  const loginidpaikka = document.getElementById("loginid");
  let loginid = loginidpaikka.innerHTML;
  const response = await fetch(`${path}login/${loginid}`, {
    method: "DELETE"
  });
  let responseJson = await response.json();


  // const reskaikki = await fetch(`${path}login/`, {
  //   method: "DELETE"
  // });
  // let responsekaikki = await reskaikki.json();

  uloskirjauduPalvelusta();

}

const kirjaudu = document.getElementById("kirjaudu");
kirjaudu.addEventListener("click", kirjauduSisaan);

const uloskirjaudu = document.getElementById("uloskirjaudu");
uloskirjaudu.addEventListener("click", ulosKirjauduTietokannasta);