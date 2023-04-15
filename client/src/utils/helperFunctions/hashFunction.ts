/**
 * Hash function to hash an input string to 32bit integer
 * @param str - the string to be hashed
 * @returns - 32bit integer hash
 */

export const hashFunction = (str: string): number => {
    let hash = 0
    if (str.length === 0) {
        return hash
    }
    for (let i = 0; i < str.length; i++) {
        const char: number = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash
    }
    return hash
}
