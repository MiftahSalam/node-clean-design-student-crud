let {
    listStudents,
    findStudent,
    findStudentsBy,
    addStudent,
    deleteStudent,
    dropAll
}
    // = require('./memory/index') // switch out db as required
    // = require('./mongodb')
    = require('./pg/index')


let studentsDb = {
    listStudents,
    findStudent,
    findStudentsBy,
    addStudent,
    deleteStudent,
    dropAll
}

module.exports = studentsDb
