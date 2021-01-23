/*
    ResourceLocation.js by Mrthomas20121
    Last edited:01/23/21
*/
module.exports = class ResourceLocation {
    /**
     * @param {String} name
     */
    constructor(name) {
        let arr = name.split(':')
        this.name = arr[0]
        this.path = arr[1]
    }

    getName() {
        return this.name
    }

    getPath() {
        return this.path
    }

    toString() {
        return `${this.name}:${this.path}`
    }
}