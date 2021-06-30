let knex = require('../../../db/pg/knex')
let makeTeacher = require('../../../models/teacher')

let listTeachers = () => {
    return knex.raw(`SELECT * FROM teachers;`).then(data => {
        // console.log("data-access-studentsDb-pg-index-listStudents data",data.rows)
        return data.rows
    })
}
let findTeacher = (prop, val) => {
    let query = `SELECT * FROM teachers WHERE ${prop}= '${val}';`
    return knex.raw(query).then(data => data.rows[0])
}
let findTeacherBy = (prop, val) => {
    return knex.raw(`SELECT * FROM teachers WHERE ${prop}= '${val}'`).then(data => data.rows)
}
let addTeacher = (teacherInfo) => {
    let teacher = makeTeacher(teacherInfo)
    let newTeacher = {
        name: teacher.getName(),
        subject: teacher.getSubjet(),
        tenure: teacher.isTenure()
    }

    return knex('teachers').insert(newTeacher).returning('*').then(result => result[0])
}
let deleteTeacher = (id) => {
    return knex('teachers').where('id', id).del().then(resp => {
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
    return knex.raw(`DELETE FROM teachers; ALTER SEQUENCE teachers_id_seq RESTART WITH 1;`)
}

module.exports = {
    listTeachers,
    findTeacher,
    findTeacherBy,
    addTeacher,
    deleteTeacher,
    dropAll
}