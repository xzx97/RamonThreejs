import * as THREE from "three"
import Experience from "../Experience"

export default class Billets {
    constructor() {
    
        this.bindExperience()
        this.setMesh()
    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
    }

    setMesh() {
        this.geometry = new THREE.CylinderGeometry(6, 6, 200)
        this.material = new THREE.MeshPhysicalMaterial({
            color: "#FF0000"
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(50, 108, 212)
        this.mesh.rotateZ(Math.PI/2)

        this.scene.add(this.mesh)
    }
}