let studentsDb = require('../../../data-access/students-db')
let students = module.exports = {}

students.index = (req, res, next) => {
    // console.log("drivers-webserver-router-students-index")
    studentsDb.listStudents()
    .then(data => res.send(data))
    .catch(err => {
        // console.error("drivers-webserver-router-students-index", err)
        next(err)
    })
}

students.show = (req, res, next) => {
    studentsDb.findStudent('id', req.params.id)
    .then(data => res.send(data))
    .catch(err => {
        // console.error("drivers-webserver-router-students-show", err)
        next(err)
    })
}

students.create = (req, res, next) => {
    studentsDb.addStudent(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(next)
}