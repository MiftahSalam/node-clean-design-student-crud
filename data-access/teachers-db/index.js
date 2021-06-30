let {
    listTeachers,
    findTeacher,
    findTeacherBy,
    addTeacher,
    deleteTeacher,
    dropAll,
} 
// = require('./memory/index') // switch out db as required
// = require('./mongodb')
= require('./pg')

let teachersDb = {
    listTeachers,
    findTeacher,
    findTeacherBy,
    addTeacher,
    deleteTeacher,
    dropAll
}

module.exports = teachersDb
