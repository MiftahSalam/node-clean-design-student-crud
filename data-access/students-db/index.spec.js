let chai = require('chai')
let studentsDb = require('.')
let expect = chai.expect

describe('studentDb', () => {
    beforeEach(async () => {
        await studentsDb.dropAll()
        let howie = {
            name: 'howie',
            age: 12,
            grade: 3,
            perfect: true
        }
        let bill = {
            name: 'bill',
            age: 13,
            grade: 3,
            perfect: false
        }
        await studentsDb.addStudent(howie)
        await studentsDb.addStudent(bill)
    })

    it('drops database', async () => {
        await studentsDb.dropAll()
        let students = await studentsDb.listStudents()
        let input = students.length
        let actual = 0
        expect(input).to.equal(actual)
    })
    it('list students', async () => {
        let input = await studentsDb.listStudents()
        let actual = 2
        expect(input.length).to.equal(actual)
    })
    it('find single student by id', async () => {
        let students = await studentsDb.listStudents()
        let id = students[0].id
        let student = await studentsDb.findStudent('id', id)
        let input = student.id
        let actual = id
        expect(input).to.equal(actual) 
    })
    it('find all students with property', async () => {
        let students = await studentsDb.findStudentsBy('grade', 3)   
        let input = students.map(el => el.name)
        let actual = ['howie', 'bill']
        expect(input).to.eql(actual)
    })
    it('insert a student', async () => {
        let felix = {
            name: 'felix',
            grade: 2,
            age:6
        }
        let newStudent = await studentsDb.addStudent(felix)
        let { id, ...input} = newStudent
        let actual = {
            name: 'felix',
            grade: 2,
            age:6,
            perfect:false
        }
        expect(input).to.eql(actual)
    })
    it('throw error if inserts a student with invalid payload',() => {
        let invalid = {
            name: 'bill',
            grade: 'INSERT POISON INTO stundentDbTHIS'
        }
        expect(() => {
            studentsDb.addStudent(invalid)
        }).to.throw('grade must be a number')
    })
    it('delete a student', async () => {
        let students = await studentsDb.listStudents()
        let id =  students[0].id.toString()
        let validInput = await studentsDb.deleteStudent(id)
        let validActual = {
            status: 'success',
            id
        }
        expect(validInput).to.eql(validActual)

        let newStudents = await studentsDb.listStudents()
        let inputLength= newStudents.length
        let actualLength = 1
        expect(inputLength).to.equal(actualLength)
        
        let invalidInput = await studentsDb.deleteStudent(42)
        let invalidActual = {
            status: 'fail'
        }
        expect(invalidInput).to.eql(invalidActual)
    })
    after(async () => await studentsDb.dropAll())
})