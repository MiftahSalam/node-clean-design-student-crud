let buildMakeTeacher = function(teacherValidator) {
    return ({
        name,
        subject,
        tenure = false
    } = {}) => {
        let { error } = teacherValidator({ name, subject, tenure })
        if(error) throw new Error(error)

        return {
            getName: () => name,
            getSubjet: () => subject,
            isTenure: () => tenure
        }
    }
}

module.exports = buildMakeTeacher