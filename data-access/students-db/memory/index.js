let STUDENTS = require('../../../db/memory/students')
let makeStudent = require('../../../models/student')
let serialize = require('./serializer')

let listStudents = () => {
    // console.log("STUDENTS",STUDENTS)
    return Promise.resolve(serialize(STUDENTS))
}
let findStudent = (prop, val) => {
    if(prop === 'id') { prop ='serial' }
    let student = STUDENTS.find(student => student[prop] == val)

    return Promise.resolve(serialize(student))
}
let findStudentsBy = (prop, val) => {
    if(prop === 'grade') { prop = 'year' }
    let students = STUDENTS.filter(student => student[prop] == val)

    return Promise.resolve(serialize(students))
}
let addStudent = (studentInfo) => {
    let student = makeStudent(studentInfo)
    let newStudent = {
      serial: STUDENTS.length + 1,
      year: student.getGrade(),
      name: student.getName(),
      age: student.getAge(),
      perfect: student.isPerfect()
    }  
    STUDENTS.push(newStudent)

    return findStudent('serial', newStudent.serial)
}
let deleteStudent = (id) => {
    return findStudent({ id })
    .then(student => {
        if(student.id == id) {
            STUDENTS = STUDENTS.filter(student => student.serial != id)
            return {
                id,
                status: 'success'
            }
        }

        return {
            status: 'fail'
        }
    })
}

let dropAll = () => {
    STUDENTS = [];
    return STUDENTS;
}

module.exports = {
    listStudents,
    findStudent,
    findStudentsBy,
    addStudent,
    deleteStudent,
    dropAll
}
