import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer"

/**
 * CSS3资源渲染器，用于渲染 HTML 标签
 * 改类的设计逻辑与 Renderer 一样，只不过承担的任务不同，
 * Renderer实际是 WebGLRenderer，专门渲染三维图像；
 * CSS3DRenderer 是用于将 CSS 元素渲染成 3D 效果
 * 
 * 关于 “三维场景标签渲染方案” 的详细内容，可以参考
 * "Three.js教程/15.场景标注标签信息" http://webgl3d.cn/pages/428714/
 * 
 * 在本项目中，三维标签的生成封装在 /World/InfoPanel.js 中
 */
export default class LabelRenderer {
    constructor(experience) {

        // 绑定 Experience 项目
        this.bindExperience(experience)

        // css3d 渲染器
        this.css3drenderer = null

        // 创建 css3d 渲染器
        this.setInstance()
    }

    /**
     * 外部传入需绑定的Experience项目 
     */
    bindExperience(experience) {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
    }

    setInstance() {
        // CSS3DRenderer
        this.css3drenderer = new CSS3DRenderer()
        this.css3drenderer.setSize(this.sizes.width, this.sizes.height)
        this.css3drenderer.domElement.style.position = "absolute"
        this.css3drenderer.domElement.style.top = "0px"

        // 解决 HTML 元素对 canvas 画布鼠标事件的遮挡
        this.css3drenderer.domElement.style.pointerEvents = "none"
        document.body.appendChild(this.css3drenderer.domElement)
    }

    // 窗口 resize 后，渲染器也需要 resize
    resize() {
        this.css3drenderer.setSize(this.sizes.width, this.sizes.height)
    }

    // 渲染器更新
    update() {
        this.css3drenderer.render(this.scene, this.camera.instance)
    }
}