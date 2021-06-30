let mongoose = require('mongoose')
const { mongo } = require('../../../config')
let Student = require('../models/student')

let seedDatabase = async function () {
    let howie = {
        name: 'howie',
        age: 12,
        grade: 3,
        perfect: true
    }
    let felix = {
        name: 'felix',
        age: 9,
        grade: 4
    }
    let hela = {
        name: 'hela',
        age: 16,
        grade: 5
    }

    await Student.create(howie)
    await Student.create(felix)
    await Student.create(hela)
}

mongoose.connection.collections.students.drop(async function() {
    await seedDatabase()
    mongoose.connection.close()
})