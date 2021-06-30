const _serializerSingle = (teacher) => {
    return {
        'id': teacher.serial,
        'name': teacher.name,
        'subject': teacher.class,
        'tenure': teacher.tenure    
    }
}

const serializer = (data) => {
    if(!data) return
    if(Array.isArray(data)) return data.filter.map(_serializerSingle)
    return _serializerSingle(data)
}

module.exports = serializer