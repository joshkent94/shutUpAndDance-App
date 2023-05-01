interface ObjectWithProperty {
    name: string
    show: boolean
}

export const sortObjectsByName = (
    objectsArray: ObjectWithProperty[],
    namesArray: string[]
): ObjectWithProperty[] => {
    const sortedObjects: ObjectWithProperty[] = []

    // iterate over the namesArray
    for (let i = 0; i < namesArray.length; i++) {
        const name = namesArray[i]

        // find the corresponding object in objectsArray
        const object = objectsArray.find((obj) => obj.name === name)

        // add the object to the sortedObjects array
        if (object) sortedObjects.push(object)
    }

    return sortedObjects
}
