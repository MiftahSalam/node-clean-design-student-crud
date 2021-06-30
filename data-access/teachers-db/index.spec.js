let chai = require('chai')
let teachersDb = require('.')
let expect = chai.expect

describe('teacherDb', () => {
    beforeEach(async () => {
        await teachersDb.dropAll()
        let robert = {
            name: 'robert frost',
            subject: 'poetry',
            tenure: true
        }
        let kanye = {
            name: 'kanye west',
            subject: 'maths',
            tenure: false
        }
        await teachersDb.addTeacher(robert)
        await teachersDb.addTeacher(kanye)
    })

    it('drops database', async () => {
        await teachersDb.dropAll()
        let teachers = await teachersDb.listTeachers()
        let input = teachers.length
        let actual = 0
        expect(input).to.equal(actual)
    })
    it('list teachers', async () => {
        let input = await teachersDb.listTeachers()
        let actual = 2
        expect(input.length).to.equal(actual)
    })
    it('find single teacher by id', async () => {
        let teachers = await teachersDb.listTeachers()
        let id = teachers[0].id
        let teacher = await teachersDb.findTeacher('id', id)
        let input = teacher.id
        let actual = id
        expect(input).to.equal(actual) 
    })
    it('find all teachers with property', async () => {
        let teachers = await teachersDb.findTeacherBy('subject', 'maths')   
        let input = teachers.map(el => el.name)
        let actual = ['kanye west']
        expect(input).to.eql(actual)
    })
    it('insert a teacher', async () => {
        let felix = {
            name: 'felix',
            subject: 'art',
            tenure: true
        }
        let newTeacher = await teachersDb.addTeacher(felix)
        let { id, ...input} = newTeacher
        let actual = {
            name: 'felix',
            subject: 'art',
            tenure: true
        }
        expect(input).to.eql(actual)
    })
    it('throw error if inserts a teacher with invalid payload',() => {
        let invalid = {
            name: 'bill',
            subject: 2
        }
        expect(() => {
            teachersDb.addTeacher(invalid)
        }).to.throw('subject must be a string')
    })
    it('delete a teacher', async () => {
        let teachers = await teachersDb.listTeachers()
        let id =  teachers[0].id.toString()
        let validInput = await teachersDb.deleteTeacher(id)
        let validActual = {
            status: 'success',
            id
        }
        expect(validInput).to.eql(validActual)

        let newTeachers = await teachersDb.listTeachers()
        let inputLength= newTeachers.length
        let actualLength = 1
        expect(inputLength).to.equal(actualLength)
        
        let invalidInput = await teachersDb.deleteTeacher(42)
        let invalidActual = {
            status: 'fail'
        }
        expect(invalidInput).to.eql(invalidActual)
    })
    after(async () => await teachersDb.dropAll())
})