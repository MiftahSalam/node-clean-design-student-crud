const _serializerSingle = (student) => {
    return {
        'id': student.serial,
        'grade': student.year,
        'name': student.name,
        'age': student.age,
        'perfect': student.perfect    
    }
}

const serializer = (data) => {
    if (!data) {
        return null
    }
    if (Array.isArray(data)) {
        return data.map(_serializerSingle)
    }
    return _serializerSingle(data)
}

module.exports = serializer
