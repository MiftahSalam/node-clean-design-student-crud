let mongoose = require('mongoose')
const { mongo } = require('../../../config')
let Teacher = require('../models/teacher')

let seedDatabase = async function () {
    let robert = {
        name: 'robert',
        subject: 'poetry',
        tenure: true
    }
    let kanye = {
        name: 'kanye west',
        subject: 'maths',
        tenure: false
    }
    let martin = {
        name: 'robert martin',
        subject: 'comp sci',
        tenure: false
    }

    await Teacher.create(robert)
    await Teacher.create(kanye)
    await Teacher.create(martin)
}

mongoose.connection.collections.teachers.drop(async function() {
    await seedDatabase()
    mongoose.connection.close()
})