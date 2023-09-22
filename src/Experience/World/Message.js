import EventEmitter from "../Utils/EventEmitter";

let instance = null;

/**
 * 消息通讯组件，用于收发 mqtt 消息，并触发相应事件
 */
export default class Message extends EventEmitter{
  constructor() {

    super()

    if (instance) {
      return instance
    }

    instance = this

    // 连接 mqtt 服务器的地址
    this.url = 'ws://broker.emqx.io:8083/mqtt'
    /***
     * Node.js 环境
     * 使用协议为 mqtt 和 mqtts 的 MQTT over TCP 连接
     * EMQX 的 mqtt 连接默认端口为 1883，mqtts 为 8084
     */

    // 订阅消息的主题
    this.topic = "/animation/dingchi/control"

    // 创建客户端实例
    this.options = {
      // Clean session
      clean: true,
      // connectTimeout: 4000,
      // 认证信息
      // clientId: 'emqx_test',
      // username: 'emqx_test',
      // password: 'emqx_test',
    }

    this.MqttConnect()

  }

  /**
   * Mqtt 连接函数
   * 
   * 提供连接、断开、消息回调等常见功能
   */
  MqttConnect() {

    console.log("Ready to connect mqtt server ... ...")

    // 创建 mqtt 客户端实例
    instance.client = mqtt.connect(instance.url, instance.options)

    // mqtt 连接成功后回调
    instance.client.on('connect', function () {
      console.log(`Connected to mqtt server: ${instance.url}`)
      // 订阅主题
      instance.client.subscribe(instance.topic, function (err) {
        if (!err) {
          // 发布消息
          // instance.client.publish('/animation/zhupi/response', 'complete')
        }
      })
    })
    
    // mqtt 关闭后回调
    instance.client.on("close", function(){
      console.log("Disconnected")
    })

    // mqtt 接收到消息后回调
    instance.client.on('message', function (topic, message) {
      // message is Buffer
      var msg = JSON.parse(message.toString())
      instance._RouteMsg(msg)

    })

    // 出现错误
    instance.client.on('error', function(error) {
      console.log(error)
    })
  }

  // 消息路由函数，由 mqtt 客户端接收到消息后调用
  _RouteMsg(msg) {
    // 根据不同消息类别 type，触发不同事件，并传递消息
    // 在 World.js 中，监听事件并做出对应动作
    if (msg["type"] === "movement") {
      instance.trigger("movement", [msg])
    }
  }
}
