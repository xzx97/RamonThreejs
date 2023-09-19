import * as THREE from "three"
import Experience from "../Experience"

let material = null

export default class Huoqie {
    constructor() {
        this.bindExperience()

        this.modelList = ["Huoqie000", "Huoqie001", "Huoqie010", "Huoqie011"]
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
            case "Huoqie000": {
                this.models["Huoqie000"] = this.resources.items.Huoqie000.scene.children[0]
                this.scene.add(this.models["Huoqie000"])
                break;
            }
            case "Huoqie001": {
                this.models["Huoqie001"] = this.resources.items.Huoqie001.scene.children[0]
                this.scene.add(this.models["Huoqie001"])
                break;
            }
            case "Huoqie010": {
                this.models["Huoqie010"] = this.resources.items.Huoqie010.scene.children[0]
                this.scene.add(this.models["Huoqie010"])
                break
            }
            case "Huoqie011": {
                this.models["Huoqie011"] = this.resources.items.Huoqie011.scene.children[0]
                this.scene.add(this.models["Huoqie011"])
                break
            }
        }


        // this.models["huoqie001"] = this.resources.items.Huoqie.scene.children[1]
        // this.models["huoqie001"].material = material
        // this.scene.add(this.models["huoqie001"])

        // this.models["huoqie010"] = this.resources.items.Huoqie.scene.children[2]
        // this.models["huoqie010"].material = material
        // this.scene.add(this.models["huoqie010"])

        // this.models["huoqie011"] = this.resources.items.Huoqie.scene.children[3]
        // this.models["huoqie011"].material = material
        // this.scene.add(this.models["huoqie011"])

    }

    // addBox() {
    //     var huoqieBoxGeo = new THREE.BoxGeometry(30, 15, 30)
        
    //     this.huoqieBox = new THREE.Mesh(huoqieBoxGeo, this.material)
    //     var wordPos = new THREE.Vector3()

    //     // this.huoqieBox.position.copy(wordPos)
    //     this.huoqieBox.position.x = initPos.x
    //     this.huoqieBox.position.y = initPos.y
    //     this.huoqieBox.position.z = initPos.z

    //     this.huoqieBox.position.y += 7.4

    //     this.scene.add(this.huoqieBox)
    // }
}