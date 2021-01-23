const JSONC = require('./library/JsoncReader')
const ResourceLocation = require('./library/ResourceLocation')
const path = require('path')

let dependency_list = new Set()
let library_index = JSONC.read('./library/index.jsonc')

// path to library
let library_path = library_index.path.replace('{home}', __dirname)

// loading jsonhtml
let jsonhtml_index = loadDependency('json', library_path)
let jsonhtml = loadDependencyMain(jsonhtml_index, library_path)

/**
 * Load a dependency
 * @param {string} dependencyName 
 * @param {string} base_path 
 */
function loadDependency(dependencyName, base_path) {
    // resource location of the main index.jsonc file
    let dep_file = new ResourceLocation(library_index.libraries[dependencyName])

    // dependency path
    let dep_path = path.join(base_path, dep_file.getPath())

    // add dependency to the list
    dependency_list.add(dependencyName)
    return JSONC.read(dep_path)
}

/**
 * load the main js of the dependency
 * @param {{ _override:{}, name:string, main_file:string, dependencies:string[]}} dep 
 * @param {string} base_path
 */
function loadDependencyMain(dep, base_path) {
    // resource location of the main file
    let dep_file = new ResourceLocation(dep.main_file)

    // dependency path
    let local_path = dep._override.path.replace('{super.path}', base_path)

    // path to the main js file.
    let dep_path = path.join(local_path, dep_file.getPath())
    return require(dep_path)
}