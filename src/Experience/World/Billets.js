import * as THREE from "three"
import Experience from "../Experience"
import gsap from "gsap"

export default class Billets {
    constructor() {
    
        this.bindExperience()
        this.setMesh()

        this.moveTimeline = new gsap.timeline()
        this.forwardDistance = 100
        this.moveForward()

        this.cutoff = null
    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
    }

    setMesh() {
        // 半径 0.3m，长 6m
        this.billetSize = {
            "radius": 0.3,
            "length": 40
        }
        this.geometry = new THREE.CylinderGeometry(
            this.billetSize.radius, 
            this.billetSize.radius, 
            this.billetSize.length)

        this.material = new THREE.MeshPhysicalMaterial({
            color: "#FF0000"
        })

        // 每秒动 0.05 m
        this.moveSpeed = 0.5

        // 生成较长的钢坯
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotateZ(Math.PI/2)
        this.mesh.position.set(-20, 4.5, 6.4)
        this.scene.add(this.mesh)
    }

    setMoveSpeed(speed) {
        this.moveSpeed = speed
    }

    setPos(x, y, z) {
        this.mesh.position.set(x, y, z)
    }

    // 钢坯运动函数
    moveForward() {
        this.moveTimeline
        .to(this.mesh.position, {
            "x": this.mesh.position.x + this.forwardDistance,
            "duration": this.forwardDistance / this.moveSpeed,
            "ease": "none"
        })
        this.moveTimeline.pause()
    }

    cutDone(huoqiePosX) {
        console.log("Run cutDone")

        var BilletHead = this.mesh.position.x + this.billetSize.length/2

        // 坯头超过火切机位置
        if (BilletHead > huoqiePosX) {

            var newGeoLength = (BilletHead - huoqiePosX)

            var newGeo = new THREE.CylinderGeometry(
                this.billetSize.radius,
                this.billetSize.radius,
                newGeoLength)

            this.cutoff = new THREE.Mesh(newGeo, this.material)
            this.cutoff.rotateZ(Math.PI/2)
            // 切断部分的位置
            this.cutoff.position.set((BilletHead + huoqiePosX)/2 , this.mesh.position.y, this.mesh.position.z)

            this.scene.add(this.cutoff)

            // 坯头从0开始，走到火切机位置所需时间为 t，长钢坯回退到 t 时刻所在位置
            this.moveTimeline.seek(huoqiePosX/this.moveSpeed)

            var newMove = new gsap.timeline()
            newMove.to(this.cutoff.position, {
                "x": 30,
                // 目标与现在位置之差 / 速度 = 时间; 前面的 0.3 所用时间再缩短至0.3，即速度加快
                "duration": 0.3 * (30 - this.cutoff.position.x) / this.moveSpeed,
                "ease": "none"
            })

        }
    }

}