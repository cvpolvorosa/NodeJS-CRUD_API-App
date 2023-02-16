// describe('persons controllers', () => {
//     it('sample test', () => {
//         let a = 8
//         expect(a + 1).toBe(9)
//     })
// })

const { getMockReq, getMockRes } = require("@jest-mock/express")
const PersonController = require("../persons")
const models = require('../../models')
const { Person } = models
const mockData = require('./mockData.json')

describe('persons controllers', () => {
    afterEach(() => {
        jest.restoreAllMocks()
        getMockRes().mockClear()
    })
    it.only('should return all persons', async () => {
        // Arrange: Mock req, res
        const req = getMockReq() // from jest mock express
        const { res } = getMockRes() // from jest mock express
        // Arrange: Mock calls to database
        // This will spy on the Person model (finAll being a method of Sequelize)
        // MockResolvedValue is another jest method. This was used because the findAll is async; either mockresolved or mockreject can be used.
        jest.spyOn(Person, 'findAll').mockResolvedValue(mockData.persons)
        // ACT
        // there's an await because getAllPersons is also async
        await PersonController.getAllPersons(req, res)
        // Assert
        // 
        expect(res.send).toHaveBeenCalledWith({ persons: mockData.persons })
    })

    it.only('should return one person', async () => {
        const req = getMockReq({ params: { personId: 1 } }) // from jest mock express
        const { res } = getMockRes() // from jest mock express. Mock db involved

        jest.spyOn(Person, 'findByPk').mockResolvedValue(mockData.persons[0])
        await PersonController.getPersonById(req, res)

        expect(res.send).toHaveBeenCalledWith({ persons: [mockData.persons[0]] })
    })

    it.only('should return error message from searching invalid person', async () => {
        const req = getMockReq({ params: { personId: 99 } }) // from jest mock express
        const { res } = getMockRes() // from jest mock express

        jest.spyOn(Person, 'findByPk').mockResolvedValue(null)
        await PersonController.getPersonById(req, res)
        expect(res.send).toHaveBeenCalledWith({ error: "User 99 not found" })
        expect(res.status).toHaveBeenCalledWith(400);
    })

    it('should add one person', () => {
        const req = getMockReq() // from jest mock express
        const { res } = getMockRes() // from jest mock express

        jest.spyOn(Person, 'create').mockResolvedValue(mockData.persons)
    })

    it('should return error message from adding with invalid/missing parameters', () => {
        console.log('hello')
    })

    it('should update one person', () => {
        console.log('hello')
    })

    it('should return error message from updating invalid person', () => {
        console.log('hello')
    })

    it('should return error message from updating invalid parameters', () => {
        console.log('hello')
    })

    it('should delete one person', () => {
        console.log('hello')
    })

    it('should return error message from deleting invalid person', () => {
        console.log('hello')
    })

    it('should return error message from searching invalid url', () => {
        console.log('hello')
    })

})