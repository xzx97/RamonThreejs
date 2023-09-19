import * as THREE from "three"
import EventEmitter from "./EventEmitter"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

        // DracoLoader 加载器，用于加载压缩过后的 gltf/glb 模型
        console.log(DRACOLoader)
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath("src/Experience/Utils/draco/")
        this.loaders.dracoLoader.setDecoderConfig({type: "js"})
        this.loaders.dracoLoader.preload()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading() {
        // Load each source
        for (const source of this.sources) {
            if (source.type === "gltfModel") {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            } else if (source.type === "texture") {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            } else if (source.type === "cubeTexture") {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }

        }
    }

    /*每次加载完一个资源就调用该函数，
    * 由该函数触发一个 sourceReady 事件，在 World 模块中，
    * 根据加载资源的名字，触发对应的生成函数，将模型加载入场景中
    */ 
    sourceLoaded(source, file) {

        this.items[source.name] = file
        
        this.loaded++

        // 触发 sourceReady 事件，并将资源名称作为参数传递
        // 其中 source.name 有资源列表 Sources.js 中 name 确定
        this.trigger("sourceReady", [source.name])
    }
}