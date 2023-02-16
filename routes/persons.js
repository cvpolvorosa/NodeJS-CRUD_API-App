var express = require('express'); //require is similar to importing

var router = express.Router();

const personsController = require('../controllers/persons');

//Get homepage 
router.get('/',personsController.getAllPersons);
router.get('/id/:personId',personsController.getPersonById);
router.post('/',personsController.addPerson);
router.patch('/id/:personId',personsController.updatePerson);
router.delete('/id/:personId',personsController.deletePerson);
/*
//Get homepage
router.get('/', function(req, res, next) { // ('/') is the mapping because it is understood na /persons ang root ng file
    console.log(req.params);
    res.send({ persons: personsData });
  });
*/

/*
 //Get by id 
router.get('/id/:personId', function(req, res, next) {
    console.log("Get ID number: " + req.params.personId);
    res.send({ persons: personsData.
      filter(person => person.id === parseInt(req.params.personId)) });
  });
*/

/*
// POST
router.post('/', function(req, res, next) {
    // req.body = {name:'carl', address:'ilalim ng tulay'}
    const id = personsData.length + 1;
    const newPerson = {id, ...req.body};
    personsData.push(newPerson);
    //personsData.push({id, ...req.body})
    //res.send({ persons: personsData })
    res.send(newPerson);
  });
*/
/*
// PATCH
router.patch('/id/:personId', function(req, res, next) {
    const personIndex = personsData
      .findIndex(person => person.id === parseInt(req.params.personId))
    const updatedPerson = {
      ...personsData[personIndex],
      ...req.body
    }
    personsData[personIndex] = updatedPerson // updates whole list (personsData)
    res.send(updatedPerson)
  })
*/
/*
// DELETE
router.delete('/id/:personId', function(req, res, next) {
    const personIndex = personsData
      .findIndex(person => person.id === parseInt(req.params.personId))
    personsData.splice(personIndex, 1)
    // delete personsData[personIndex]
    res.send(personsData)
  })
*/

module.exports = router;
//At the end you'll always have an export (with .js)