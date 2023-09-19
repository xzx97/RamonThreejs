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
        // 半径 0.3m，长 6m
        this.geometry = new THREE.CylinderGeometry(0.3, 0.3, 20)
        this.material = new THREE.MeshPhysicalMaterial({
            color: "#FF0000"
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // 相对位置，4.5m是高度，6.4m是钢坯横向偏移
        // 钢坯半径每大 0.1m，高度应该响应增加 0.1m，否则会穿模
        this.mesh.position.set(-10, 4.5, 6.4)
        this.mesh.rotateZ(Math.PI/2)

        this.scene.add(this.mesh)
    }
}