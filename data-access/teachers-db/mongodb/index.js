let Teacher = require('../../../db/mongodb/models/teacher')
let makeTeacher = require('../../../models/teacher')
let serialize = require('./serializer')

let listTeachers = () => {
    return Teacher.find({}).then(serialize)
}
let findTeacher = (prop, val) => {
    if(prop === 'id') {
        prop = '_id'
    }

    return Teacher.find({[prop]: val}).then(resp => serialize(resp[0]))
}
let findTeacherBy = (prop, val) => {
    return Teacher.find({[prop]: val}).then(serialize)
}
let addTeacher = (teacherInfo) => {
    let teacher = makeTeacher(teacherInfo)
    let newTeacher = {
        name: teacher.getName(),
        subject: teacher.getSubjet(),
        tenure: teacher.isTenure()    
    }

    return Teacher.create(newTeacher).then(serialize)
}
let deleteTeacher = (id) => {
    return Teacher.findByIdAndDelete(id).then(resp => {
        return {
            id: resp._id.toString(),
            status: 'success'
        }
    }).catch(err => {
        return {
            status: fail
        }
    })
}
let dropAll = () => {
    return Teacher.remove()
}

module.exports = {
    listTeachers,
    findTeacher,
    findTeacherBy,
    addTeacher,
    deleteTeacher,
    dropAll
}