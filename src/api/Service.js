async function getCities(page = 1, perPage = 10) {
    return await fetch(`https://api.datos.gob.mx/v1/condiciones-atmosfericas?pageSize=${perPage}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            // console.log("getCities WS result: ", data)
            return data
        })
}

async function getCityById(id) {
    return await fetch(`https://api.datos.gob.mx/v1/condiciones-atmosfericas?_id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results[0]) {
                const result = data.results[0]
                // console.log("getCityById WS result: ", result)
                return result;
            }
            return null;
        })
}

export { getCities, getCityById }