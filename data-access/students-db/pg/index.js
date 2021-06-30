let knex = require('../../../db/pg/knex')
let makeStudent = require('../../../models/student')

let listStudents = () => {
    // console.log("data-access-studentsDb-pg-index-listStudents")
    return knex.raw(`SELECT * FROM students;`).then(data => {
        // console.log("data-access-studentsDb-pg-index-listStudents data",data.rows)
        return data.rows
    })
}
let findStudent = (prop, val) => {
    let query = `SELECT * FROM students WHERE ${prop}= '${val}';`
    return knex.raw(query).then(data => data.rows[0])
}
let findStudentsBy = (prop, val) => {
    return knex.raw(`SELECT * FROM students WHERE ${prop}= '${val}'`).then(data => data.rows)
}
let addStudent = (studentInfo) => {
    let student = makeStudent(studentInfo)
    let newStudent = {
        name: student.getName(),
        grade: student.getGrade(),
        age: student.getAge(),
        perfect: student.isPerfect()
    }

    return knex('students').insert(newStudent).returning('*').then(result => result[0])
}
let deleteStudent = (id) => {
    return knex('students').where('id', id).del().then(resp => {
        if(resp === 1){
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
    return knex.raw(`DELETE FROM students; ALTER SEQUENCE students_id_seq RESTART WITH 1;`)
}

module.exports = {
    listStudents,
    findStudent,
    findStudentsBy,
    addStudent,
    deleteStudent,
    dropAll
}