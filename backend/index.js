const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000
require("dotenv").config({ path: "src/.env" })
// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

const mongoose = require("mongoose")
const { response } = require("express")
const mongoDB = `mongodb+srv://user:${process.env.DB_PASSWORD}@democluster.grcn57q.mongodb.net/hobbyappDB`
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("Database test connected")
});

// harrastusscheema
const hobbySchema = new mongoose.Schema({
  // _id: { type: String, required: false },
  hobbyname: { type: String, required: true },
  outside: { type: Boolean, required: false },
  inside: { type: Boolean, required: false },
  toolsneeded: { type: Boolean, required: false },
  otherhumansneeded: { type: Boolean, required: false },
  tags: { type: Array, required: false }
});

//loginschema
const loginSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

//userschema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  hobbyinfo: [{
    hobbyid: { type: mongoose.Schema.Types.ObjectId },
    hobbylkm: { type: Number }
  }]
});

const User = mongoose.model("User", userSchema, "users");
// model
const Hobby = mongoose.model("Hobby", hobbySchema, "hobbies");

const Login = mongoose.model("Login", loginSchema, "login");


//GET hobbies
app.get("/hobbies", async (request, response) => {
  const hobbies = await Hobby.find({});
  response.json(hobbies);
  //console.log(hobbies)
});

//GET hobbies sisäharrastukset
app.get("/hobbies/inside", async (request, response) => {
  const hobbies = await Hobby.find({ inside: true });
  response.json(hobbies);
  //console.log(hobbies)
});

//GET hobbies ulkoharrastukset
app.get("/hobbies/outside", async (request, response) => {
  const hobbies = await Hobby.find({ outside: true });
  response.json(hobbies);
  //console.log(hobbies)
});

//GET hobbies niin sisä- kuin ulkoharrastukset
app.get("/hobbies/outsideinside", async (request, response) => {
  const hobbies = await Hobby.find({ $or: [{ inside: true }, { outside: true }] });
  response.json(hobbies);
  //console.log(hobbies)
});

//GET yksi hobby id:llä
app.get("/hobbies/:id", async (request, response) => {
  const hobby = await Hobby.findById(request.params.id)
  if (hobby) response.json(hobby)
  else response.status(404).end()
})

//POST hobby
app.post("/hobbies", async (request, response) => {
  const hobbyname = request.body.hobbyname;
  // const donelkm = request.body.done;
  const outside = request.body.outside;
  const inside = request.body.inside;
  const toolsneeded = request.body.toolsneeded;
  const otherhumansneeded = request.body.otherhumansneeded;
  const tags = request.body.tags;

  try {
    const hobby = new Hobby({
      hobbyname: hobbyname,
      // done: donelkm,
      outside: outside,
      inside: inside,
      toolsneeded: toolsneeded,
      otherhumansneeded: otherhumansneeded,
      tags: tags
    })
    const savedHobby = await hobby.save();
    response.json(savedHobby);
  }
  catch (error) {

    response.status(400);
    // response.send({ error: "Harrastuksesi ei sisältänyt tarpeeksi oikeita tietoja" });
    response.send({ error: "Harrastuksesi ei sisältänyt tarpeeksi oikeita tietoja, joten sitä ei lisätty" });
  }
});


//PUT yksi hobby
app.put("/hobbies/:id", async (request, response) => {
  const _id = request.params.id
  const hobbyname = request.body.hobbyname;
  // const donelkm = request.body.done;
  const outside = request.body.outside;
  const inside = request.body.inside;
  const toolsneeded = request.body.toolsneeded;
  const otherhumansneeded = request.body.otherhumansneeded;
  const tags = request.body.tags;

  try {
    const data = await Hobby.findOneAndUpdate({ _id: _id }, {
      hobbyname: hobbyname,
      // done: donelkm,
      outside: outside,
      inside: inside,
      toolsneeded: toolsneeded,
      otherhumansneeded: otherhumansneeded,
      tags: tags
    }, { returnDocument: "after" });
    response.json(data);
  }
  catch (err) {
    response.status(404);
    response.send({ error: "Harrastus ei ole olemassa" });

  }
});

//DELETE yksi hobby
app.delete("/hobbies/:id", async (request, response) => {
  const deletedHobby = await Hobby.findByIdAndRemove(request.params.id);
  if (deletedHobby) response.json(deletedHobby);
  else response.status(404).end();
});


//GET users
app.get("/users", async (request, response) => {
  const usersget = await User.find({});
  response.json(usersget);
});

//GET yksi user, käyttäjätunnuksen perusteella eikä id:n, koska kirjautuessa sisään ei voida tietää id:tä 
app.get("/users/:kayttajatunnus", async (request, response) => {
  const kayttajatunnus = request.params.kayttajatunnus;
  const usergetyksi = await User.find({ "username": kayttajatunnus });
  
  if (usergetyksi) response.json(usergetyksi);
  else {response.status(404).end();
  response.send({ error: "Käyttäjätunnuksesi ei löytynyt" });
}
})


//POST user
app.post("/users", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  const hobbyinfot = request.body.hobbyinfo;

  try {
    const useri = new User({
      username: username,
      password: password,
      hobbyinfo: hobbyinfot
    })

    const savedUser = await useri.save();
    response.json(savedUser);
  }
  catch (error) {

    response.status(400);
    // response.send({ error: "Harrastuksesi ei sisältänyt tarpeeksi oikeita tietoja" });
    response.send({ error: "Käyttäjätunnuksesi ei sisältänyt tarpeeksi oikeita tietoja joten sitä ei luotu" });
  }
});

//PUT user hobbyn id:n perusteella, eli userin hobbyinfo-arrayn sisälle joko tulee yksi uusi objekti tai vanhaan lisätään lkm:ää
app.put("/users/:userid/hobbies/:hobbyid", async (request, response) => {
  const userId = request.params.userid;
  const hobbyId = request.params.hobbyid;
  const infot = request.body.hobbyinfo;
  
  //userin päivittämätön tietue
  const aiemmatDatat = await User.findById({ _id: userId });
  //userin alta hobbyinfo, jossa on listattuna harrastusobjektit
  const aiemmatUserHobbies = [...aiemmatDatat.hobbyinfo];
  let loytyykoJo = false;
  let userinHarrastukset;
  for (let i = 0; i < aiemmatUserHobbies.length; i++) {
    if (aiemmatUserHobbies[i].hobbyid == hobbyId) {
      // console.log("Löytyy!")
      loytyykoJo = true;
      aiemmatUserHobbies[i].hobbylkm = infot[1];
      userinHarrastukset = aiemmatUserHobbies;
      break;
    }
  }
  //jos päästään edellisestä luupista ulos, eikä loytyykoJo ole true,
  //harrastus on uusi käyttäjälle joten lisätään se hobbyinfon loppuun
  if (loytyykoJo == false) {
    let uusiHarrastus = { hobbyid: hobbyId, hobbylkm: infot[1] };
    userinHarrastukset = [...aiemmatUserHobbies, uusiHarrastus]
  }

  //jokatapauksessa mennään tänne, oli userinHarrastukset muuttunut kuinka.
  try {

    const data = await User.findOneAndUpdate({ _id: userId }, {
      hobbyinfo: userinHarrastukset
    }, { returnDocument: "after" });
    response.json(data);
  }
  catch (err) {
    response.status(404);
    response.send({ error: "Harrastus ei ole olemassa" });

  }

});

//DELETE yksi user
app.delete("/users/:id", async (request, response) => {
  const deletedUser = await User.findByIdAndRemove(request.params.id);
  if (deletedUser) response.json(deletedUser);
  else response.status(404).end();
});

//GET kaikki loginit
app.get("/login", async (request, response) => {
  const login = await Login.find({});
  response.json(login);
  //console.log(hobbies)
});

//DELETE yksi login
app.delete("/login/:id", async (request, response) => {
  const deletedLogin = await Login.findByIdAndRemove(request.params.id);
  if (deletedLogin) response.json(deletedLogin);
  else response.status(404).end();
});

//DELETE KAIKKI
app.delete("/login/", async (request, response) => {
  const deletedLogin = await Login.deleteMany({});
  if (deletedLogin) response.json(deletedLogin);
  else response.status(404).end();
});




//POST login
app.post("/login", async (request, response) => {
  const loggeduser = request.body.username;

  try {
    const login = new Login({
      username: loggeduser
    })
    const savedLogin = await login.save();
    // console.log(savedLogin);
    response.json(savedLogin);

  }
  catch (error) {

    response.status(400);
    // response.send({ error: "Harrastuksesi ei sisältänyt tarpeeksi oikeita tietoja" });
    response.send({ error: "Harrastuksesi ei sisältänyt tarpeeksi oikeita tietoja, joten sitä ei lisätty" });
  }
});

//loginia ei tarvitse muokata.

// app listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000');
});