let TEACHERS = require('../../../db/memory/teachers')
let makeTeacher = require('../../../models/teacher')
let serialize = require('./serializer')

let listTeachers = () => {
    return Promise.resolve(serialize(TEACHERS))
}
let findTeacher = (prop, val) => {
    if(prop === 'id') prop = 'serial'
    let teacher = TEACHERS.find(teacher => teacher[prop] == val)
    return Promise.resolve(serialize(teacher))
}
let findTeachersBy = (prop, val) => {
    if(prop === 'subject') { prop = 'class' }
    let teachers = STUDENTS.filter(teacher => teacher[prop] == val)

    return Promise.resolve(serialize(teachers))
}
let addTeacher = (teacherInfo) => {
    let teacher = makeTeacher(teacherInfo)
    let newTeacher = {
        serial: TEACHERS.length + 1,
        class: teacher.getSubjet(),
        tenure: teacher.isTenure()
    }
    TEACHERS.push(newTeacher)

    return findTeacher('serial', newTeacher.serial)
}
let deleteTeacher = (id) => {
    return findTeacher({ id })
    .then(teacher => {
        if(teacher.id == id) {
            TEACHERS = TEACHERS.filter(teacher => teacher.serial != id)
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
    TEACHERS = [];
    return TEACHERS;
}

module.exports = {
    listTeachers,
    findTeacher,
    findTeachersBy,
    addTeacher,
    deleteTeacher,
    dropAll
}