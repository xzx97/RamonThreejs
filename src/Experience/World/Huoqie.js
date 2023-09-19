/**
 * 本模块与 火切机模型 相关
 */

import * as THREE from "three"
import Experience from "../Experience"

let material = null

export default class Huoqie {
    constructor() {
        this.bindExperience()

        this.modelList = ["Huoqie000", "Huoqie001", "Huoqie010", "Huoqie011"]

        // 模型集合，用于存放四个火切机
        this.models = {}
        this.setMaterial()
        this.loadModel(name)

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
            case "Huoqie000": {
                this.models["Huoqie000"] = this.resources.items.Huoqie000.scene.children[0]
                this.scene.add(this.models["Huoqie000"])
                break;
            }
            // 第一流二切
            case "Huoqie001": {
                this.models["Huoqie001"] = this.resources.items.Huoqie001.scene.children[0]
                this.scene.add(this.models["Huoqie001"])
                break;
            }
            // 第二流一切
            case "Huoqie010": {
                this.models["Huoqie010"] = this.resources.items.Huoqie010.scene.children[0]
                this.scene.add(this.models["Huoqie010"])
                break
            }
            // 第二流二切
            case "Huoqie011": {
                this.models["Huoqie011"] = this.resources.items.Huoqie011.scene.children[0]
                this.scene.add(this.models["Huoqie011"])
                break
            }
        }
    }

}