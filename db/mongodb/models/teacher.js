let mongoose = require('../connection')
let Schema = mongoose.Schema
let TeacherSchema = new Schema({
    name: String,
    subject: String,
    tenure: {
      type: Boolean,
      default: false
    }  
})

let Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher