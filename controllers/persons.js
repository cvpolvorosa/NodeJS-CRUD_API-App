const Joi = require('joi');

//const personSchema = require('../schema/persons');
const models = require('../models')
const schema = require('../schema/persons')

const getAllPersons = async (req, res, next) => {
    const persons = await models.Person.findAll()
    res.send({ persons: persons })
  }

// const getPersonById = (req, res, next) => {
//     const filterPerson = persons.data
//       .filter(person => person.id === parseInt(req.params.personId))
//     if (filterPerson.length > 0) {
//       return res.send({ persons: filterPerson })
//     }
//     res.status(400).send({ error: `User ${req.params.personId} not found` })
// }

const getPersonById = async (req, res, next) => {
  const person = await models.Person.findByPk(parseInt(req.params.personId))
  if (person) {
    return res.send({ persons: [person] })
  }
  res.status(400).send({ error: `User ${req.params.personId} not found` })
}

// const addPerson = (req, res, next) => {
//     const { error } = schema.newPerson.validate(req.body)
//     if (!!error) {
//       return res.status(400).json(error)
//     }
//     const id = persons.data.length + 1
//     const newPerson = { id, ...req.body }
//     persons.data.push(newPerson)
//     res.send({ persons: [newPerson] })
// }

const addPerson = async (req, res, next) => {
  // Simple INSERT queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-insert-queries
  const { error } = schema.newPerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  const newPerson = await models.Person.create(req.body)
  res.send({ persons: [newPerson] })
}

// const updatePerson = (req, res, next) => {
//     const personIndex = persons.data
//       .findIndex(person => person.id === parseInt(req.params.personId))
//       console.log(personIndex)
//     // Make sure user exists to update it
//     if (personIndex < 0) {
//       return res.status(400).send({ error: `User ${req.params.personId} not found` })
//     }
//     // Make sure data is valid before updating
//     const { error } = schema.updatePerson.validate(req.body)
//     if (!!error) {
//       return res.status(400).json(error)
//     }
//     // Update person
//     const updatedPerson = {
//       ...persons.data[personIndex],
//       ...req.body
//     }
//     persons.data[personIndex] = updatedPerson // updates whole list (persons.data)
//     res.send({ persons: [updatedPerson] })
// }

const updatePerson = async (req, res, next) => {
  // Simple UPDATE queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-update-queries
  const paramsId = parseInt(req.params.personId)
  const person = await models.Person.findByPk(paramsId)
  // If user doesn't exist, let's send the error asap
  if (!person) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  // If our code reaches this part, it means user exists
  // Let's proceed with validation
  const { error } = schema.updatePerson.validate(req.body)
  if (!!error) { // If there's a validation error, let's return the error
    return res.status(400).json(error)
  }
  
  // Finally updating
  await models.Person.update(req.body, {
    where: {
      id: paramsId
    }
  });
  const updatedPerson = await models.Person.findByPk(paramsId)
  res.send({ persons: [updatedPerson] })
}
  
//   const deletePerson = (req, res, next) => {
//     // Make sure user exists to be able to delete them
//     const personIndex = persons.data
//       .findIndex(person => person.id === parseInt(req.params.personId))
//     if (personIndex < 0) {
//       return res.status(400).send({ error: `User ${req.params.personId} not found` })
//     }
//     persons.data.splice(personIndex, 1)
//     res.send({ persons: persons.data })
// }
  
//   module.exports = {
//     getAllPersons,
//     getPersonById,
//     addPerson,
//     updatePerson,
//     deletePerson
// }

const deletePerson = async (req, res, next) => {
  // Simple DELETE queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-delete-queries
  // Make sure user exists to be able to delete them
  const paramsId = parseInt(req.params.personId)
  const person = await models.Person.findByPk(paramsId)
  if (!person) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  await models.Person.destroy({
    where: {
      id: paramsId
    }
  });
  res.status(200).send({ message: `User ${paramsId} successfully deleted` })
}

module.exports = {
  getAllPersons,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson
}
/*

let personsData = [ //Square brackets, array malamang
{
    id:1,
    name: 'Emily',
    address: '2 Willow Lane'
},
{
    id: 2,
    name: 'Haley',
    address: '2 Willow Lane'
}
]

exports.getAllPersons = (req,res,next) => {
    res.send({persons:personsData});
}

exports.getPersonById = (req,res,next) => {
    const personIndex = personsData.findIndex(person => person.id === parseInt(req.params.personId))

    if(personIndex<0){
        return res.status(400).send({Error: `User ${req.params.personId} not found.`})
    }
    res.send({ persons: personsData.
        filter(person => person.id === parseInt(req.params.personId)) })
}

exports.addPerson = (req,res,next) => {
    const {error} = personSchema.newPerson.validate(req.body)
    if (error){
        return res.status(400).json(error);
    }
    const id = personsData.length + 1;
    const newPerson = {id, ...req.body};
    personsData.push(newPerson);
    res.send(newPerson);
}

exports.updatePersonById = (req,res,next) => {
    const {error} = personSchema.updatePerson.validate(req.body)
    if (error){
        return res.status(400).json(error);
    }
    const personIndex = personsData
      .findIndex(person => person.id === parseInt(req.params.personId))

    if(personIndex<0){
        return res.status(400).send({error: `Unable to update user. User ${req.params.personId} not found`})
    }

    const updatedPerson = {
      ...personsData[personIndex],
      ...req.body
    }
    personsData[personIndex] = updatedPerson // updates whole list (personsData)
    res.send(updatedPerson)
}

exports.deletePersonById = (req,res,next) => {
    
    const personIndex = personsData
      .findIndex(person => person.id === parseInt(req.params.personId))
    
     if(personIndex<0){
        return res.status(400).send({error: `Unable to delete user. User ${req.params.personId} not found`})
    }

    personsData.splice(personIndex, 1)
    // delete personsData[personIndex]
    res.send(personsData)
}
*/