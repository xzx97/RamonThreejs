/**
 * 本模块与 火切机模型 相关
 */

import * as THREE from "three"
import Experience from "../Experience"
import gsap from "gsap"

let material = null

export default class Huoqie {
    constructor() {
        this.bindExperience()

        this.modelList = ["Huoqie1", "Huoqie1_2", "Huoqie2", "Huoqie2_2"]

        // 模型集合，用于存放四个火切机
        this.models = {}
        this.setMaterial()

        this.moveSpeed = 0.5

        this.cuttingAnimation = new gsap.timeline()

        // 该值在第一个火切机加载时被初始化，记录了 1 切火切机的初始位置
        this.initX = null

        // 1流和2流单独的动画时间轴
        this.moveAnimation1 = new gsap.timeline()
        this.moveAnimation2 = new gsap.timeline()
    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    // 共用材质
    setMaterial() {
        if (!material) {
            material = new THREE.MeshPhysicalMaterial({
                color: "#FFFFFF"
            })
        }
        this.material = material
    }

    // 设置 Mesh
    loadModel(name) {

        switch (name) {
            // 第一流一切
            case "Huoqie1": {
                this.models["Huoqie1"] = this.resources.items.Huoqie1.scene.children[0]
                this.scene.add(this.models["Huoqie1"])
                // 设置初始 x 的位置
                this.initX = this.models["Huoqie1"].position.x
                break;
            }
            // 第一流二切
            // 不参与控制，只显示
            case "Huoqie1_2": {
                this.models["Huoqie1_2"] = this.resources.items.Huoqie1_2.scene.children[0]
                this.scene.add(this.models["Huoqie1_2"])
                break;
            }
            // 第二流一切
            case "Huoqie2": {
                this.models["Huoqie2"] = this.resources.items.Huoqie2.scene.children[0]
                this.scene.add(this.models["Huoqie2"])
                break
            }
            // 第二流二切
            // 不参与控制，只显示
            case "Huoqie2_2": {
                this.models["Huoqie2_2"] = this.resources.items.Huoqie2_2.scene.children[0]
                this.scene.add(this.models["Huoqie2_2"])
                break
            }
        }
    }

    move(num, relativeX) {
        var huoqie = null
        var duration = 0
        
        // 判断是哪台火切机
        if (num == "1") {
            huoqie = this.models["Huoqie1"]

        } else if (num == "2") {
            huoqie = this.models["Huoqie2"]
        }

        // 判断速度
        // 如果火切位置 < 目标位置，即要前进
        if (huoqie.position.x < this.initX + relativeX) {
            duration = (this.initX + relativeX - huoqie.position.x) / this.moveSpeed
        } else {
            // 如果后退，速度加快，时间变短
            duration = 0.2 * Math.abs(this.initX + relativeX - huoqie.position.x) / this.moveSpeed
        }

        if (num == "1") {
            this.moveAnimation1.clear()

            this.moveAnimation1
            .to(huoqie.position, {
                "x": this.initX + relativeX,
                "duration": duration,
                "ease": "none"
            })
        } else if (num == "2") {

            this.moveAnimation2.clear()

            this.moveAnimation2
            .to(huoqie.position, {
                "x": this.initX + relativeX,
                "duration": duration,
                "ease": "none"
            })
        }

    }
    
}