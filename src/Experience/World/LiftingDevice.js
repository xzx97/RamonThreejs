/**
 * 本模块与升降装置模型相关
 * 
 */

import * as THREE from "three"
import Experience from "../Experience"
import gsap from "gsap"

let material = null

export default class LiftingDevice {
    constructor() {

        this.bindExperience()
        this.setMaterial()
        this.modelList = ["Lift1", "Lift2"]
        this.updownValue = 0.8
        this.downDuration = 4
        this.upDuration = 7
    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    setMaterial() {
        material = new THREE.MeshPhysicalMaterial({
            color: "#EEE8AA"
        })
    }

    loadModel(name) {
        switch (name) {
            case "Lift1": {
                this.Lift1 = this.resources.items.Lift1.scene.children[0]
                this.Lift1.material = material
                // 下落检测时，相对下降幅度 0.8m
                this.Lift1.position.y -= this.updownValue
                this.scene.add(this.Lift1)
                break
            }
            case "Lift2": {
                this.Lift2 = this.resources.items.Lift2.scene.children[0]
                this.Lift2.material = material
                // 相对下降幅度 0.8m
                this.Lift2.position.y -= this.updownValue
                this.scene.add(this.Lift2)
                break
            }
        }
    }

    // 升降装置下降动作
    moveDown(liftingDevice) {
        // 新建一个 gsap 时间轴
        var t1 = new gsap.timeline()
        // 给时间轴设定动画，下面代码意思是
        // 让升降装置的 position 对象中的 y 关键字，变为
        // (原来位置 - 下降距离)的位置，在持续时间 duration 内完成。
        t1
        .to(liftingDevice.position, {
            "y": liftingDevice.position.y - this.updownValue,
            "duration": this.downDuration
        })
    }

    // 升降装置上升动作
    moveUp(liftingDevice) {
        var t1 = new gsap.timeline()
        // 解释同 moveDown，在 duration 时间内，上升到给定位置
        t1
        .to(liftingDevice.position, {
            "y": liftingDevice.position.y + this.updownValue,
            "duration": this.upDuration
        })
    }

    
}