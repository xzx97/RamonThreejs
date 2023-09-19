import * as THREE from "three"
import Experience from "../Experience"

export default class Environments {
    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene

        this.lights = {}

        this.setLights()
    }

    // 设置灯光
    setLights() {

        var lightColor = new THREE.Color("#FFFFFF")
        var directionalLight = new THREE.DirectionalLight(lightColor, 1)

        var hemiSphereLight = new THREE.HemisphereLight("#FFFFFF", "#888888", 2)

        directionalLight.position.set(4, 4, 4)

        this.lights.directionalLight = directionalLight

        this.lights.hemiSphereLight = hemiSphereLight

        this.scene.add(directionalLight)
        this.scene.add(hemiSphereLight)
    }
}