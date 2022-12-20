# HobbyApp Front

## Harkan juju

Harkka on harrastussovellus. Ideana on, että käyttäjä voi hakea harrastuksia tiettyjen speksien perusteella, 

esim. voiko harrastusta harrastaa ulkosalla vai sisällä.

Jotkut harrastukset ovat sellaisia, että niitä voi harrastaa niin ulkosalla kuin sisällä. Silloin

se harrastus näytetään niin ulko- kuin sisäharrastuksien joukossa.

Toinen speksi mitä harrastuksiin liittyy on tarvitseeko niihin välineitä, esim. piirtäminen.

Helpointa olisi ehkä, että dokumentissa olisi erikseen "voiko harrastaa sisällä?" johon saadaan True/False

vastaus. Lisäksi voisi speksata tarvitseeko harrastukseen muita ihmisiä. Harrastuksiin voisi myös liittää 

tageja vaikka sen perusteella onko kyse liikunta vai kulttuuriharrastuksesta.

Jotakuinkin näin siis:

```
Dokumentti 1

__id: mongon pitkä rimpsu,
"hobby_name": "Musiikin kuuntelu",
"outside": True,
"inside": True,
"tools needed": True,
"other humans needed": False,
"tags": ["music","culture"]
__v: jotain

```



## 24.10.2022

Klo 15.35-16.20 + 10 min itseopiskeluviikolta

Projekti alkaa. Viime viikolla hyväksytin opettajalla aiheen. Tänään loin repon niin frontille kuin backille. Aloin tarkentaa speksejä harrastuksien puolesta, 

jotta tiedän millaisia dokumentteja luoda tietokantaan. 

25+20+10 = 25+30 = 55 min käytetty / 40t.

## 26.10.2022

Klo 17.25-18.40

Latasin paketit ja laitoin reitit (index.js) Noden puolelle, ja laitoin Frontin puolelle tyylit ja index.html:n. Laitoin mongoshilla yhden dokumentin tietokantaan, mutta se ei tule näkyviin fronttiin. Luultavasti schemassa vika. Oli ehkä virhe aloittaa niin monella kentällä, ja olisi pitänyt kokeilla ensin ja sitten laajentaa.

60min +70 min = Yhteensä käytetty 2 tuntia 10 min / 40t.

## 27.10.2022

Klo 15.00-15.50

Yritin koululla saada ajoon tuota, mutta MongoDB blokkasi IP:n. Odotan siis kotiin asti, että tiedän toimiiko.

Laitoin salasanan env-tiedostoon ja se otetaan nyt sieltä, ettei tarvitse olla sitä poistelemassa. Latasin DOTENV-paketin.

Yritin pohtia miksi ei tule virhettä, mutta harrastuksia ei silti tule näkyviin.

Yhteensä 3 tuntia / 40t.

Illalla vielä 18.25-19.30

Sain korjattua dotenvin, nyt se lukee salasanan .env-tiedostosta. Jes!

```
db.hobbies.insertOne({
  hobbyname: "listening to music",
  outside: true,
  inside: true,
  toolsneeded: true,
  otherhumansneeded: false,
  tags: ["music", "culture"]
})
``` 

Tässä on nyt tallessa yhden harrastuksen lisääminen mongoshilla.

Kokeilin nyt poistaa tuon monimutkaisen, ja laitoin tilalle pelkän

text-tiedon sisältäviä testidokumentteja.

Oho, nyt tietokanta tuli edes jotenkin näkyviin.

![Tietokanta näkyy edes jotenkin.](./src/tietokantanakyyeesjotenkin.png)

Jes, ja nyt kun vaihdoin li-textnoden nimen ne näkyy ihan textinä

![Tietokanta toimii vii](./src/kantaelaa.png)

Nyt voi hyvillä mielin mennä nukkumaan. Jotain outoa on edelleen tekeillä, koska reitti on

hobbiesdiscard, ja jos yrittää laittaa vain hobbies-reitin, tulee broken promisea. Mutta edettiin 

paljon jo tänään.

Yhteensä 4t 5min /40t.

Okei, vielä vähän yritystä. Vaihdoin routet oikein, ja laitoin vasta sitten päälle. Sitten toimi ihan oikein hobbies-reitillä. Kaikki hyvin siis.

21.00-21.05

4t 10min /40t yhteensä käytetty.

## 29.10.2022

19.10-19.50

Tein uutta, yksinkertaisempaa versiota tietokantaan. Dokumentissa olisi vain harrastuksen nimi ja olenko harrastanut sitä. Saatan laajentaa sitä vielä, mutta katsotaan.

yhteensä 4t 50 min / 40t yhteensä käytetty.

20.40-21.15

Okei lisäsin nyt niihin vielä ne muut kentät. Ja lisäsin ne MongoDB Compassin kautta jotta pääsen testailemaan kunnolla eri hakuja. Siellä on nyt 45 dokumenttia.

Yhteensä käytetty 5t 25 min / 40t.

21.20- 21.35

Varmistan vielä että uudet dokumentit tulevat näkyviin. Tuli näkyviin.

![Kannassa uudet jutut](./src/kannassauudetjutut.png)

Yhteensä käytetty 5t 40 min / 40t.

## 2.11.2022

Klo 18.00-20.45 eli 2t+45min

Nyt kun 8.2 tehtävä toimii, voisin kopioida UPDATE-toiminnon tänne, mutta sitä ennen

pitää saada ihan normaali lisäys ja poisto toimimaan käyttöliittymän kautta.

Lisäys ja poisto toimii käyttöliittymän kautta. Nyt myös editointi. Oli hiukan hikisempi

lisäys ja poisto koska tämä dokumenttityyli oli monimutkaisempi, mutta nyt homma toimii.

Editointi oli yllättävän helppo kun lisäys ja poisto oli hanskassa.

Yhteensä käytetty 5+2 tuntia + 40+45 min = 8t 25min / 40t.

## 3.11.2022

12.55-14.50

Yritin saada sitä toimimaan, että hakisin eri parametreillä tietokannasta kamaa, niin, että voisin painaa nappia "vain sisäharrastukset" ja sitten näytettäisiin vain sisäharrastukset.

Vielä ei toimi, mutta laajensin nyt noita harrastuksia olemaan divissä, jolloin editointia pitää rukata aika paljon. Näkyvissä ei vielä edes ole kaikkia harrastuksien ominaisuuksia.

5min + 60+ 50 min eli 1t 55 min.

Eli yhteensä 10t 20 min / 40 t.

Illalla juttelin vielä noin tunnin ajan työstä kaverin kanssa, jolta sain perspektiiviä työhön. Ilmeisesti olen tekemässä hiukan liian vaikeaa työtä, joten sen puolesta yritän skaalata vähän järkevämmäksi tuon.

1 t + 10t 20min eli yhteensä 11t 20min /40t käytetty.

## 5.11.2022

14.25-17.45 eli 3t 20 min

Laitan nyt formin kuntoon eli checkboxit selectien tilalle ja sitten edittiin ja lisäykseen homma kuntoon, niin että kaikki tiedot tulevat näkyviin.

Muuten toimii nyt, mutta editoinnin jälkeen takkuaa se, miten saan muutokset näkyviin. Kun se editedHobby response json ei ole vielä päivittynyt siinä vaiheessa kun tietoja pitäisi pistää näkyville.

Ei tämä vaan lähde toimimaan. Pari tuntia nyt hinkannut sitä etten saa yhtä listaelementtiä korjattua toisella.

Löysin viimein ongelman: Mongooselle pitää kertoa että takaisin haluaa uuden dokkarin eikä vanhaa.

Nyt toimii! Menen korjaamaan 8.2 koska tein sen nyt paremmin. Alkoi jo epätoivo iskeä, mutta nyt on edit kunnossa.

Yhteensä  14t 40 min/ 40t käytetty.

Jatkoin vielä 

18.30-20.05 = 1t 35 min

Tein createNodeWithSpecsin kun siellä createHobbyListItemissä oli kaikkea tilpehööriä, niin tämä selvensi sitä. Harmikseni edit ja todo funktiokutsut eivät nyt toimi, ja sieltä tulee li on null ja cannot read properties of null. Mutta se menee toiselle päivälle.

Olen vähän huolissani kun käytetty jo yli 16 tuntia, mutta ulkoasu näyttää edelleen hyvin paljon alkutilanteelta. 

![Tilanne nyt](src/tilannenyt.png)

Yhteensä 16t 15 min / 40t käytetty.

## 7.11.2022

15.15-18.25 eli 3t 10 min

Open kanssa setvittiin id:n hukkuminen. Oli _id eikä id. Puhuttiin myös siitä, että mitä yritän vielä tehdä harkan suhteen.

Sitten yritin tuntikausia tehdä jonkinasteista poikkeuksen käsittelyä harrastuksen lisäykseen.

Sain viimein tuntikausien jälkeen error-viestin backendistä fronttiin näkösälle. Ei juma mitä taistelua.

19t 25 min / 40t käytetty.

## 8.11.2022

10.10-10.50 = 40min

Lähdin yrittämään tehdä käyttäjiä. Saa nähdä.

Yhteensä 20t 5 min /40t käytetty.

## 14.11.2022

15.10-16.10 = 1t

Koululla harkkaa. Sovittiin, että jos saan käyttäjän sisäänkirjautumisen jälkeen harrastuksen lisäämisen toimimaan niin se olis kiva.

Koululla IP whitelistaus ei toiminut tällä kertaa, joten lähden kotiin. Users-schema ja CRUD-toiminnot ovat aika pitkälle paikoillaan, joten niitä voi pian testata.

Put pitää vielä korjata loppuun.

21t 5 min / 40t käytetty.

## 19.11.2022

10.30-12.40  2t 10
13.50-16.50 3t  eli yhteensä tänään 5t 10min.

Nyt toimii käyttäjän lisäys. Ongelma oli yhdessä tyhjässä rivissä .rest-tiedostossa.

Nyt on käyttäjäpuoli olemassa, ja seuraavaksi pitäisi saada toimimaan loggaus 

sisään tietokannan kautta. Nyt loggaus sisään häviää heti kun muutan jotain sivulla.

Joten ehkä teen vielä kolmannen collectionin, TAI vaihdan UserSchemaan uuden osion, jossa

kerrotaan onko käyttäjä loggautuneena sisään. Kuitenkin ehkä parempi tehdä kolmas, eipähän sekoita

aiempia. Poistin lukumäärän kertomisen peruslistasta, ja nyt sitten se tulee niihin 

käyttäjän harrastuksiin. Ja sinne varmaan myös tulee nappi, jota painamalla saa lisättyä 

tekemiskertoja.

Tältä näyttää nyt kun käyttäjät mukana:

![userit](src/tilanneuser.png)

Ruokatauon jälkeen lisää. Sisäänkirjautuminen toimii aika pitkälle. Lähdin tekemään uloskirjautumista

ja se rikkoi sisäänkirjautumisen. Vielä on jotain häikkää.

Tällä hetkellä se jotenkin rikkoo käyttäjätunnuksen kun kirjautuu sisään. Pitää miettiä toiste.

Peruutin hiukan, ja nyt taas sisäänkirjautuminen toimii. Uloskirjautuminen puuttuu vielä.

Kun uloskirjautuminen toimii, voin laittaa sen omien harrastuksien lisäämisen ja sitten homma olis aika 

siinä.

![login](src/login.png)

26t 15min /40t käytetty yhteensä aikaa.

## 21.11.2022

8.55-10.00 = 1t 5 min

Uloskirjautuminen toimii nyt. Uuden harrastuksen lisääminen on kesken.

Yhteensä 27t 20 min /40t käytetty yhteensä aikaa.

Jatkuu illalla klo 15.20-15.50 = 30min

Kyselin opelta onko tuo kirjautuminen ok. 

Harrastuksien lisääminen edelleen kesken.

Yhteensä 27t 50 min /40t

Jatkuu omien harrastuksien lisääminen.

Se kai nyt melkein onnistuu, mutta osa aiemmista harrastuksista katosi jonnekin, en tiedä järjestettiinkö

ne uudelleen ja siksi ovat eri järjestyksessä, mutta jotain on ihmeellistä.

Tuo "listening to my favorite artists" oli ennen listan kärjessä, ja nyt se ei ole.

Mutta tuonne onnistui lisätä pari harrastusta, joten hyvällä mallilla ollaan.

![Jotain häikkää](src/jotainvikaa.png)

18.35-20.25 = 1t 50min

eli yhteensä 29t 40min / 40t yhteensä käytetty harkkaan.

## 22.11.2022

9.25-10.00 eli 35min.

Lisäys toimii nyt. Eilen nuo muut harrastukset menivätkin jostain syystä uuteen järjestykseen,

ja luulin vain että olivat tippuneet kokonaan.

![Lisays toimii](src/lisaystoimii.png)

Lähdin lisäämään nappia, jota painamalla saa lisättyä sitä, montako kertaa tiettyä harrastusta on

harrastettu. Vielä rikki.

Yhteensä 30t 15min /40t käytetty harkkaan.

10.45-11.20 = 35min

Pitää varmistaa ettei sinne lisätä uutta vaikka olisi jo se harrastus userilla.

Yhteensä 30t 50min/40t käytetty harkkaan. 

## 25.11.2022

14.30-17.25 = 2t 55min

Pitää korjata se, että kun lisää harrastuksen käyttäjän omiin, harrastuksien pitää tulla heti näkyviin.

Okei nyt ne tulee näkyviin, mutta nyt niitä lisätään aina edellisten perään. Eli pitää tuhota lista ennen.

Korjasin uloskirjautumisen. Siellä oli epähuomiossa userid kun piti olla loginid.

Lisäämisessä omiin harrastuksiin vielä häikkää ja erroria. Saatetaan mennä tämän kanssa yliajalle jos se julkaisu

pitää vielä keksiä.

Yhteensä 33t 45 min /40t käytetty harkkaan.

## 27.11.2022

15.55-17.20 = 25min + 1t

Tarkistan onko kaikki rikki lisäämisessä vai vain saman lisääminen.

Lisääminen öbaut toimii mutta jotain on edelleen rikki, joka toisella päivittämisellä tulee error, ja joka toisella toimii. Häh.

Yhteensä 35t 10 min / 40t käytetty harkkaan.

## 28.11.2022

9.00-9.55 = 55 min

Katsoin opettajan kanssa vähän tuota bugia. Ainakin se taitaa nyt olla hoidossa.

Korjasin myös sign outin, ja muita bugeja. Nyt taitaa hetken toimia?

Voisi alkaa tekemään raportointia ja julkaisua.

Yhteensä 36t 5 min /40t käytetty harkkaan.

## 29.11.2022

10.10-12.35

Testaan toimiiko harkka.

Sisä- ja ulkoharrastuksien suodatus: toimii

Uuden harrastuksen lisääminen: toimii

Harrastuksen editointi: toimii

Harrastuksen poistaminen: toimii

Käyttäjän oman harrastuksen lisääminen: toimii

Käyttäjän oman harrastuksen harrastuskertojen lisääminen napilla: toimii

Tyhjän lomakkeen lisäämisen esto, lisätty alert.

"Sisäänkirjautuminen" toimii. 

"Uloskirjautuminen" toimii.

Dokumentoin harkkaa esittelyä varten ja kirjoitin kommentteja koodiin.

Yhteensä 38t 30 min /40t käytetty harkkaan. 

## 30.11.2022

Tänään arviolta 5 tuntia harkkaa.

Lisäsin, että editoida ja poistaa voi vain sisäänkirjauduttua.

Julkaisua, julkaisua. Viimeisiä korjauksia.

43t 30 min /40t yhteensä käytetty harkkaan.

## 1.12.2022

Lisäsin vielä ettei tule virhettä vaan alert kun käyttäjä kirjoittaa tunnarin ja salasanan väärin.

Julkaisu viimein toimii VLE:ssä.

N. 2 tuntia. Eli 45 t 30 min /40t yhteensä käytetty harkkaan.

## 6.12.2022

10.35-11.55

25+55 = 1t 20min

Nyt vain open ja adminin tunnuksilla voi editoida ja poistaa.

En ehdi tehdä mitään sille, että nyt se on kirjautunut sisään kaikilla selaimilla kun yksi on kirjautunut sisään.

Sitten vain videoesittely, ja tämä alkaa olemaan tässä.

46t 50 min yhteensä

## 9.12.2022

Esittelyn viimeistely ja videota.

n. 2t.

Yhteensä harkkaan kului 48t 50 min /40t.