/**
 * 本模块与 地基等一系列静态模型相关
 */

import * as THREE from "three"
import Experience from "../Experience"

var material = null

export default class Base {
    constructor() {

        // 绑定 Experience 项目
        this.bindExperience()

        // 设置统一的材质
        material = new THREE.MeshPhysicalMaterial({
            color: "#FFFFFF"
        })

        // 背景包括 地基/辊道/火切轨道/激光器/升降装置底座/侧激光 几个模型
        this.modelList = [
            "Base", "GunDao", "HuoqieRail",
            "Laser", "LiftingSteady", "SideLaser"
        ]

    }

    bindExperience() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    // 根据传入的模型名，调用对应的加载函数，将模型载入 Scene 中
    // 该函数在 World 模块中，在 sourceReady 事件回调中调用
    loadModel(name) {
        switch(name) {
            case "Base": {
                this.setBase(); break;
            }
            case "GunDao": {
                this.setGunDao(); break;
            }
            case "Huoqie": {
                this.setHuoQie(); break;
            }
            case "HuoqieRail": {
                this.setHuoQieRail(); break;
            }
            case "Laser": {
                this.setLaser(); break;
            }
            case "LiftingDevice": {
                this.setLiftingDevice(); break;
            }
            case "LiftingSteady": {
                this.setLiftingSteady(); break;
            }
            case "SideLaser": {
                this.setSideLaser(); break;
            }
        }
    }

    // 加载地基
    setBase() {

        // 导入相关模型的Mesh
        console.log(this)
        console.log(this.resources.items)
        this.base = this.resources.items.Base.scene.children[0]
        this.base.material = material

        this.scene.add(this.base)
    }

    // 加载辊道
    setGunDao() {
        this.gundao = this.resources.items.GunDao.scene.children[0]
        this.gundao.material = material

        this.scene.add(this.gundao)
    }

    // 加载火切机辊道
    setHuoQieRail() {
        this.huoqieRail = this.resources.items.HuoqieRail.scene.children[0]
        this.huoqieRail.material = material

        this.scene.add(this.huoqieRail)
    }

    // 加载火切机
    setHuoQie() {
        this.huoqie = this.resources.items.Huoqie.scene.children[0]
        this.huoqie.material = material
        this.scene.add(this.huoqie)
    }

    // 加载激光器
    setLaser() {
        this.laser = this.resources.items.Laser.scene.children[0]
        this.laser.material = material
        this.scene.add(this.laser)
    }

    // 加载升降装置
    setLiftingDevice() {
        this.liftingDevice = this.resources.items.LiftingDevice.scene.children[0]
        this.liftingDevice.material = material
        this.scene.add(this.liftingDevice)
    }

    // 加载升降装置底座
    setLiftingSteady() {
        this.liftingSteady = this.resources.items.LiftingSteady.scene.children[0]
        this.liftingSteady.material = material
        this.scene.add(this.liftingSteady)
    }

    // 加载侧激光
    setSideLaser() {
        this.sideLaser = this.resources.items.SideLaser.scene.children[0]
        this.sideLaser.material = material
        this.scene.add(this.sideLaser)
    }
} 