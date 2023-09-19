import * as THREE from "three"

export default class AxesHelper {
    constructor(size) {

        this.axeshelper = new THREE.AxesHelper(size)

        return this.axeshelper
    }
}