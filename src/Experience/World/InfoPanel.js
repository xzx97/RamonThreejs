import * as THREE from "three"
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer"

/**
 * 创建信息面板
 * 
 */

class PanelDiv1 {
    constructor() {

        this.instance = null

        this.setInstance()
        this.setStyle()

    }

    setInstance() {
        this.instance = document.createElement("div")
    }

    setStyle() {
        this.instance.style.backgroundColor = "rgba(70, 130, 180, 0.6)"
        this.instance.style.color = "#FFFFFF"
        this.instance.style.borderRadius = "10%"
        this.instance.style.width = "60px"
        this.instance.style.height = "40px"
        this.instance.style.fontSize = "0.5em"
    }

    update(info) {
        this.instance.innerText = info
    }
}

class PanelDivFactory {
    constructor(type) {

        this.panel = null

        switch (type){
            case "panel1" : {
                this.panel = new PanelDiv1()
                break;
            }
        }

        return this.panel
    }
}


export default class InfoPanel {
    constructor(divType) {

        this.div = new PanelDivFactory(divType)
        this.div.update("hello")
        this.createTag(this.div.instance)
        this.obj = null

    }

    // 根据 div 创建 tag 标签
    createTag(div) {
        this.tag = new CSS3DObject(div)
        this.tag.scale.set(0.02, 0.02, 0.02)
        div.style.pointerEvents = "none"
    }

    // 将 tag 绑定到物体 obj 上
    // 以后能一起移动
    bindObj(obj) {

        this.obj = obj
        // 将绑定物体的标签设为自己
        this.obj.tag = this

        this.tag.position.set(
            obj.position.x,
            obj.position.y,
            obj.position.z
        )
    }

    setOffset(offset) {
        this.tag.position.set(
            this.obj.position.x + offset.x,
            this.obj.position.y + offset.y,
            this.obj.position.z + offset.z
        )
    }

    update(info) {
        this.div.update(info)
    }
}