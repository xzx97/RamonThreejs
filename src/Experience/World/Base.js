import * as THREE from "three"
import Experience from "../Experience"

var material = null

export default class Base {
    constructor() {

        // 绑定 Experience 项目
        this.bindExperience()

        material = new THREE.MeshPhysicalMaterial({
            color: "#FFFFFF"
        })

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

    loadModel(name) {
        console.log(name)
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

    setBase() {

        // 导入相关模型的Mesh
        console.log(this)
        console.log(this.resources.items)
        this.base = this.resources.items.Base.scene.children[0]
        this.base.material = material

        this.scene.add(this.base)
    }

    setGunDao() {
        this.gundao = this.resources.items.GunDao.scene.children[0]
        this.gundao.material = material

        this.scene.add(this.gundao)
    }

    setHuoQieRail() {
        this.huoqieRail = this.resources.items.HuoqieRail.scene.children[0]
        this.huoqieRail.material = material

        this.scene.add(this.huoqieRail)
    }

    setHuoQie() {
        this.huoqie = this.resources.items.Huoqie.scene.children[0]
        this.huoqie.material = material
        this.scene.add(this.huoqie)
    }

    setLaser() {
        this.laser = this.resources.items.Laser.scene.children[0]
        this.laser.material = material
        this.scene.add(this.laser)
    }

    setLiftingDevice() {
        this.liftingDevice = this.resources.items.LiftingDevice.scene.children[0]
        this.liftingDevice.material = material
        this.scene.add(this.liftingDevice)
    }

    setLiftingSteady() {
        this.liftingSteady = this.resources.items.LiftingSteady.scene.children[0]
        this.liftingSteady.material = material
        this.scene.add(this.liftingSteady)
    }

    setSideLaser() {
        this.sideLaser = this.resources.items.SideLaser.scene.children[0]
        this.sideLaser.material = material
        this.scene.add(this.sideLaser)
    }


} 