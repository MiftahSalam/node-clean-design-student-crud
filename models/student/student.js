let buildMakeStudent = function (studentValidator) {
    return ({
        name,
        age,
        grade,
        perfect = false
    } = {}) => {
        let { error } = studentValidator({ name, age, grade, perfect })
        if(error) throw new Error(error)

        return {
            getName: () => name,
            getAge: () => age,
            getGrade: () => grade,
            isPerfect: () => perfect
        }
    }
}

module.exports = buildMakeStudent