/*
 * @Author: your name
 * @Date: 2021-09-28 16:41:40
 * @LastEditTime: 2021-09-28 16:41:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-demo\src\assets\js\common.js
 */
const common = {
  /* 接口返回Ret信息  */
  requestCode: {
    /* 接口成功返回状态 */
    RESPONSE_STATUS: 200,
    /* 接口成功返回状态CODE */
    SUCCESS_INFO_CODE: "API-COMMON-INF-OK",
    SEND_REQUEST: 0, // 生产者 发送请求
    SUBSCRIBE_REQUEST: 1 // 消费者 订阅请求
  },
  operateType: {
    ADD: 0,
    MODIFY: 1,
    DELETE: 2,
    QUERY: 3,
    MSGSUBTYPE_ADDMQ: "addMQ", // 添加MQ
    MSGSUBTYPE_MODIFYMQ: "modifyMQ", // 修改MQ
    MSGSUBTYPE_DELMQ: "delMQ", // 删除MQ
    MSGSUBTYPE_ADDCHANNEL: "addChannel", // 添加通道
    MSGSUBTYPE_MODIFYCHANNEL: "modifyChannel", // 修改通道
    MSGSUBTYPE_DELCHANNEL: "delChannel", // 删除通道
    MSGSUBTYPE_ADDSRC: "addSrc", // 添加资源
    MSGSUBTYPE_MODIFYSRC: "modifySrc", // 修改资源
    MSGSUBTYPE_DELSRC: "delSrc", // 删除资源
    MQ_DATA_TYPE: "mqChannelSet",
    MQ_INIT_DATA_TYPE: "mqConfigInit",
    MQ_CHANGE_DATA_TYPE: "mqConfigChange",
    MAINCHANNEL_CONSUMER: "mainChannelConsumer", // 主队列消费者
    MAINCHANNEL_PRODUCER: "mainChannelProducer" // 主队列生产者
  },
  connectType: {
    ERROR_CODE: 0,
    ERROR: "连接失败",
    CONNECTING_CODE: 1,
    CONNECTING: "正在连接",
    SUCCESS_CODE: 2,
    SUCCESS: "连接成功"
  },
  modeType: {
    WORK_QUEUE: 0, // 使用默认转发器订阅/发布消息 ;默认由stomp自动创建一个持久化队列
    WORK_QUEUE_VALUE: "/queue/",
    EXCHANGE: 1, // 通过转发器订阅/发布消息，转发器需要手动创建
    EXCHANGE_VALUE: "/exchange/",
    AMQ_QUEUE: 2, // 与类型0的区别在于队列不由stomp自动进行创建，队列不存在失败
    AMQ_QUEUE_VALUE: "/amq/queue/",
    TOPIC: 3, // 通过amq.topic转发器订阅/发布消息，订阅时默认创建一个临时队列，通过routing_key与topic进行绑定
    TOPIC_VALUE: "/topic/",
    TEMP_QUEUE: 4, // 创建一个临时队列(只能在headers中的属性reply-to中使用)，可用于发送消息后通过临时队列接收回复消息
    TEMP_QUEUE_VALUE: "/temp-queue/"
  },
  returnInfo: {
    SUCCESS: 0,
    FAIL: -1,
    REQUEST_SUCCESS: "成功",
    PARAMETER_ERROR: "参数错误",
    REQUEST_FAIL: "请求失败",
    INIT_SUCCESS: "初始化成功",
    INIT_FAIL: "初始化失败",
    FAILED_TO_CREATE_CONNECTION: "创建连接失败",
    FAILED_TO_CREATE_CONNECTION_CODE: 1,
    CREATING_CONNECTION: "正在创建连接",
    CREATING_CONNECTION_CODE: 2,
    NO_CONNECTION_CREATED: "未创建连接",
    NO_CONNECTION_CREATED_CODE: 3,
    VIDEO_PLUG_IN_DETECTION_FAILED: "视频插件检测失败，请重新下载插件",
    INIT_CHANNEL_FAIL: "初始化通道信息失败",
    SEND_INFO_FAIL: "发送信息失败",
    UNSUBSCRIBE_FAIL: "取消订阅失败",
    NOT_SUBSCRIBE: "未订阅",
    SUBSCRIBE_INFO_FAIL: "订阅信息失败",
    REQUEST_RESOURCES_NON_EXISTENT: "请求资源不存在",
    REQUEST_RESOURCES_INFO_ERROR: "请求资源信息错误",
    NOACCESSVIDEOFOUND: "未找到进出录像"
  },
  logInfo: {
    RESPONSE_STATUS_ERROR: "response.status is not 200",
    RESPONSE_DATA_RET_ERROR: "response.data.ret is not IXX000",
    RESPONSE_DATA_CONTENT_ERROR: "response.data.content is null",
    GOT_EMPTY_MESSAGE: "got empty message",
    MQ_UTILS: "mqUtils.js_",
    MQ_MANAGER: "mqManager.js_",
    DATA_BUS_UTILS: "dataBusUtils.js_",
    RESOURCE_CONTAINER: "resourceContainer.js_",
    RECEIVEMSG: "receiveMsg()",
    UNSUBSRCIBEMSG: "unSubscribeMsg()",
    SENDMSG: "sendMsg()",
    CONNECTMQ: "connectMq()",
    INIT: "init()"
  },
  errorInfo: {
    ADD_SRCINFO_ERROR: "添加资源信息失败"
  }
};
export default common;
