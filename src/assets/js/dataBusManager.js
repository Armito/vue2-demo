/*
 * @Author: Armito
 * @Date: 2021-09-28 16:35:51
 * @LastEditTime: 2021-09-28 17:51:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-demo\src\assets\js\dataBusManager.js
 */
import HashMap from "hashmap";
import api from "../../../commons/api.js";
import { isEmpty } from "./utils.js";
import log from "../../../commons/systemCommon/log.js";
import common from "../mqUtils/common.js";
import mqUtils from "../mqUtils/mqUtils.js";
import dataBusUtils from "./dataBusUtils.js";
import resourceContainer from "./resourceContainer.js";
// 正在执行的订阅任务
let reciveTaskHandleMap = new HashMap();
// 等待中的订阅任务
let reciveTaskPendingMap = new HashMap();
/**
 * @func  checkSrcInfo
 * @desc  验证资源信息
 * @param {object} infoObject  资源信息
 * @return {boolean} 是否符合要求
 */
function checkSrcInfo(infoObject) {
  let flag = false;
  if (!isEmpty(infoObject) && !isEmpty(infoObject.srcId) && !isEmpty(infoObject.channelId) && !isEmpty(infoObject.srcType)) {
    flag = true;
  }
  return flag;
}
/**
 * @func  checkMQInfo
 * @desc  验证MQ信息
 * @param {object} infoObject  MQ信息
 * @return {boolean} 是否符合要求
 */
function checkMQInfo(infoObject) {
  let flag = false;
  if (
    !isEmpty(infoObject) &&
    !isEmpty(infoObject.id) &&
    !isEmpty(infoObject.ip) &&
    !isEmpty(infoObject.passWord) &&
    !isEmpty(infoObject.userName) &&
    !isEmpty(infoObject.webPort)
  ) {
    flag = true;
  }
  return flag;
}
/**
 * @func  checkChannelInfo
 * @desc  验证通道信息
 * @param {object} infoObject  通道信息
 * @return {boolean} 是否符合要求
 */
function checkChannelInfo(infoObject) {
  let flag = false;
  if (!isEmpty(infoObject) && !isEmpty(infoObject.channelId) && !isEmpty(infoObject.channelName) && !isEmpty(infoObject.mqId)) {
    flag = true;
  }
  return flag;
}
/**
 * @func  checkMQConfigInfo
 * @desc  验证配置信息
 * @param {object} infoObject  配置信息
 * @return {boolean} 是否符合要求
 */
function checkMQConfigInfo(infoObject) {
  let flag = false;
  if (!isEmpty(infoObject) && !isEmpty(infoObject.operateType) && !isEmpty(infoObject.content)) {
    flag = true;
  }
  return flag;
}
/**
 * @func  checkMainChannelInfo
 * @desc  验证主通道信息
 * @param {object} infoObject  主通道信息
 * @return {boolean} 是否符合要求
 */
function checkMainChannelInfo(infoObject) {
  let flag = false;
  if (!isEmpty(infoObject) && !isEmpty(infoObject.type) && !isEmpty(infoObject.content)) {
    flag = true;
  }
  return flag;
}

/**
 * @func  changeConfigInfo
 * @desc  MQ配置信息发生改变，需及时生效
 * @param {object} mqConfigObj 信息结构对象
 * @return {object} null
 */
function changeConfigInfo(mqConfigObj) {
  let configInfo = JSON.parse(mqConfigObj.content);
  // MQ信息发生改变
  if (
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_ADDMQ ||
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_MODIFYMQ ||
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_DELMQ
  ) {
    let mqInfo = {
      id: configInfo.sId, // 消息中间件Id
      ip: configInfo.sIp, // 消息中间件IP
      webPort: configInfo.iWebsocketPort, // 消息中间件端口号   前端js连接端口stomp连接端口:15674
      userName: configInfo.sUsername, // 用户名
      passWord: configInfo.sPassword, // 密码
      operateType: mqConfigObj.operateType, // 操作类型
      controllerPort: configInfo.iWebPort,
      port: configInfo.iPort,
      iOnlinePort: configInfo.iOnlinePort,
      iOnlineWebPort: configInfo.iOnlineWebPort,
      iOnlineWebsocketPort: configInfo.iOnlineWebsocketPort,
      sOnlineIp: configInfo.sOnlineIp
    };
    changeMQInfo(mqInfo);
  }
  // 通道信息发生改变
  if (
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_ADDCHANNEL ||
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_MODIFYCHANNEL ||
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_DELCHANNEL
  ) {
    let channelInfo = {
      channelId: configInfo.sId, // 通道id
      mqId: configInfo.sMqId, // 所属MQId
      channelName: configInfo.sChannelName, // 通道名称
      modeType: configInfo.iMode, // 通道类型
      operateType: mqConfigObj.operateType // 操作类型
    };
    changeChannelInfo(channelInfo);
  }
  // 资源信息发生改变
  if (
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_ADDSRC ||
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_MODIFYSRC ||
    mqConfigObj.operateType === common.operateType.MSGSUBTYPE_DELSRC
  ) {
    let srcInfo = {
      srcId: configInfo.sSrcId, // 资源id
      srcName: configInfo.sName, // 资源名称
      srcType: configInfo.iType, // 资源类型
      channelId: configInfo.channelId, // 绑定通道id
      routingKeys: configInfo.sRoutingKey, // 路由键
      operateType: mqConfigObj.operateType // 操作类型
    };
    changeSrcInfo(srcInfo);
  }
}
/**
 * @func  changeMQInfo
 * @desc  处理发生改变的MQ信息
 * @param {object} mqInfo MQ信息结构对象
 * @return {object} null
 */
function changeMQInfo(mqInfo) {
  if (isEmpty(mqInfo)) {
    return;
  }
  // 新增MQ信息
  if (mqInfo.operateType === common.operateType.MSGSUBTYPE_ADDMQ) {
    log.info('新增MQ：' + mqInfo.id);
    resourceContainer.initMqInfo(mqInfo);
  }
  // 修改MQ信息
  if (mqInfo.operateType === common.operateType.MSGSUBTYPE_MODIFYMQ) {
    log.info('修改MQ：' + mqInfo.id);
    mqUtils.removeMqInfoById(mqInfo.id);
    resourceContainer.initMqInfo(mqInfo);
  }
  // 删除MQ信息
  if (mqInfo.operateType === common.operateType.MSGSUBTYPE_DELMQ) {
    log.info('删除MQ：' + mqInfo.id);
    mqUtils.removeMqInfoById(mqInfo.id);
  }
}
/**
 * @func  changeChannelInfo
 * @desc  处理发生改变的channel信息
 * @param {object} channelInfo channel信息结构对象
 * @return {object} null
 */
function changeChannelInfo(channelInfo) {
  if (isEmpty(channelInfo)) {
    return;
  }
  // 新增通道信息
  if (channelInfo.operateType === common.operateType.MSGSUBTYPE_ADDCHANNEL) {
    log.info('新增通道：' + channelInfo.channelId);
    resourceContainer.initChannelInfo(channelInfo);
  }
  // 修改通道信息
  if (channelInfo.operateType === common.operateType.MSGSUBTYPE_MODIFYCHANNEL) {
    log.info('修改通道：' + channelInfo.channelId);
    // 1、先移除通道信息
    mqUtils.removeChannelInfoById(channelInfo.channelId);
    // 2、然后重新添加通道信息
    resourceContainer.initChannelInfo(channelInfo);
    // 3、需遍历订阅任务，判断订阅任务中，是否存在订阅该通道的资源，若有需重新订阅
    let receiveTaskAllList = reciveTaskHandleMap.values();
    for (let m = 0; m < receiveTaskAllList.length; m++) {
      let receiveTaskList = receiveTaskAllList[m];
      if (!isEmpty(receiveTaskList) && Array.isArray(receiveTaskList)) {
        for (let i = 0; i < receiveTaskList.length; i++) {
          if (receiveTaskList[i].channelId !== channelInfo.channelId) {
            break;
          }
          // 取消订阅
          unSubscribe(receiveTaskList[i].srcId, receiveTaskList[i].routingKeys);
          // 重新订阅
          if (receiveTaskList[i].routingKeys === null) {
            dataBusUtils.receiveMsg(receiveTaskList[i].srcId, receiveTaskList[i].reciveCallback);
          } else {
            dataBusUtils.receiveMsgByRoutingKey(receiveTaskList[i].srcId, receiveTaskList[i].routingKeys, receiveTaskList[i].reciveCallback);
          }
        }
        }
      }
  }
  // 删除通道信息
  if (channelInfo.operateType === common.operateType.MSGSUBTYPE_DELCHANNEL) {
    log.info('删除通道：' + channelInfo.channelId);
    mqUtils.removeChannelInfoById(channelInfo.channelId);
  }
}
/**
 * @func  changeSrcInfo
 * @desc  处理发生改变的资源信息
 * @param {object} srcInfo 资源信息结构对象
 * @return {object} null
 */
function changeSrcInfo(srcInfo) {
  // 新增资源信息
  if (srcInfo.operateType === common.operateType.MSGSUBTYPE_ADDSRC && resourceContainer.addSrcInfo(srcInfo)) {
    log.info('新增资源：' + srcInfo.srcId);
    // 判断是否存在等待中的消费者
    if (reciveTaskPendingMap.has(srcInfo.srcId)) {
      startSubscribeMsg(srcInfo.srcId);
    }
  }
  // 修改资源信息：修改资源时，需判断是否是消费者，若是消费者，需判断是否正在订阅，如果正在订阅，先取消订阅，最后再重新订阅
  if (srcInfo.operateType === common.operateType.MSGSUBTYPE_MODIFYSRC) {
    log.info('修改资源：' + srcInfo.srcId);
    // 1、移除资源信息
    resourceContainer.removeSrcInfoById(srcInfo.sSrcId);
    // 2、新增资源信息
    resourceContainer.addSrcInfo(srcInfo);
    // 3、判断是否是消费者且是否存在历史订阅任务，若存在，需先取消订阅，再重新订阅
    if (srcInfo.srcType === common.requestCode.SUBSCRIBE_REQUEST && reciveTaskHandleMap.has(srcInfo.srcId)) {
      let receivehandList = reciveTaskHandleMap.get(srcInfo.srcId);
      for (let i = 0; i < receivehandList.length; i++) {
        // 取消订阅
        unSubscribe(srcInfo.srcId, receivehandList[i].routingKeys);
        // 重新订阅
        reSubscribeMsg(srcInfo.srcId);
      }
    }
  }
  // 删除资源信息
  if (srcInfo.operateType === common.operateType.MSGSUBTYPE_DELSRC) {
    log.info('删除资源：' + srcInfo.srcId);
    // 1、删除
    resourceContainer.removeSrcInfoById(srcInfo.srcId);
    // 2、判断是否是消费者且是否存在历史订阅任务，若存在，取消订阅
    if (srcInfo.srcType === common.requestCode.SUBSCRIBE_REQUEST && reciveTaskHandleMap.has(srcInfo.srcId)) {
      let receivehandList = reciveTaskHandleMap.get(srcInfo.srcId);
      for (let i = 0; i < receivehandList.length; i++) {
        // 取消订阅
        unSubscribe(srcInfo.srcId, receivehandList[i].routingKeys);
        if (reciveTaskPendingMap.has(srcInfo.srcId)) {
          let list = clone(reciveTaskPendingMap.get(srcInfo.srcId));
          list.push(receivehandList[i]);
          reciveTaskPendingMap.set(srcInfo.srcId, list);
        } else {
          let reciveTaskPendingList = [];
          reciveTaskPendingList.push(receivehandList[i]);
          reciveTaskPendingMap.set(srcInfo.srcId, reciveTaskPendingList);
        }
      }
      reciveTaskHandleMap.remove(srcInfo.srcId);
    }
  }
}
/**
 * @func  unSubscribe
 * @desc  取消订阅消息
 * @param {string} subscribeId  订阅id
 * @return {object}  null
 */
function unSubscribe(subscribeId, routingKeys) {
  log.info('取消订阅消息：' + subscribeId);
  let returnInfo = {
    description: common.returnInfo.REQUEST_FAIL,
    ret: common.returnInfo.FAIL
  };
  if (reciveTaskHandleMap.has(subscribeId)) {
    returnInfo = mqUtils.unSubscribeMsg(subscribeId, routingKeys);
  } else {
    log.debug(common.returnInfo.UNSUBSCRIBE_FAIL + subscribeId + common.returnInfo.NOT_SUBSCRIBE);
  );
  return returnInfo;
}
/**
 * @func  reSubscribeMsg
 * @desc  重新订阅
 * @param {string} srcId  资源id
 * @return {object}  null
 */
function reSubscribeMsg(srcId) {
  if (!isEmpty(srcId) && reciveTaskHandleMap.has(srcId)) {
    let receiveTaskList = reciveTaskHandleMap.get(srcId);
    for (let i = 0; i < receiveTaskList.length; i++) {
      let receiveTask = receiveTaskList[i];
      if (receiveTask.routingKeys === null) {
        dataBusUtils.receiveMsg(srcId, receiveTask.reciveCallback);
      } else {
        dataBusUtils.receiveMsgByRoutingKey(srcId, receiveTask.routingKeys, receiveTask.reciveCallback);
      }
    }
  }
}
/**
 * @func  startSubscribeMsg
 * @desc  开启等待中的订阅任务
 * @param {string} srcId  资源id
 * @return {object}  null
 */
function startSubscribeMsg(srcId) {
  if (!isEmpty(srcId) && reciveTaskPendingMap.has(srcId)) {
    let receiveTaskList = reciveTaskPendingMap.get(srcId);
    for (let i = 0; i < receiveTaskList.length; i++) {
      let receiveTask = receiveTaskList[i];
      if (receiveTask.routingKeys === undefined || receiveTask.routingKeys === null || receiveTask.routingKeys === 'undefined') {
        dataBusUtils.receiveMsg(srcId, receiveTask.reciveCallback);
      } else {
        dataBusUtils.receiveMsgByRoutingKey(srcId, receiveTask.routingKeys, receiveTask.reciveCallback);
      }
      if (reciveTaskHandleMap.has(srcId)) {
        let list = clone(reciveTaskHandleMap.get(srcId));
        list.push(receiveTask);
        reciveTaskHandleMap.set(srcId, list);
      } else {
        let receivehandList = [];
        receivehandList.push(receiveTask);
        reciveTaskHandleMap.set(srcId, receivehandList);
      }
    }
    reciveTaskPendingMap.remove(srcId);
  }
}
/**
 * @func  initConfigInfo
 * @desc  初始化信息
 * @param {object} initInfo  初始化信息
 * @return {object}  null
 */
function initConfigInfo(initInfo) {
  if (!isEmpty(initInfo)) {
    log.debug('initInfo=' + JSON.stringify(initInfo));
    if (!isEmpty(initInfo.mqInfo)) {
      // mqUtils.cleanMQInfo()
      insertMQInfo(initInfo.mqInfo);
    }
    if (!isEmpty(initInfo.channelInfo)) {
      // mqUtils.cleanChannelInfo()
      insertChannelInfo(initInfo.channelInfo);
    }
    if (!isEmpty(initInfo.srcInfo)) {
      resourceContainer.cleanSrcInfo();
      insertSrcInfo(initInfo.srcInfo);
    }
  }
}
/**
 * @func  initConfigInfoByMqId
 * @desc  下传配置初始化指定mq信息
 * @param {object} initInfo  初始化信息
 * @return {object}  null
 */
function initConfigInfoByMqId(initInfo) {
  if (!isEmpty(initInfo)) {
    log.debug('initConfigInfoByMqId initInfo=' + JSON.stringify(initInfo));
    if (!isEmpty(initInfo.mqInfo)) {
      // mqUtils.cleanMQInfo()
      insertMQInfo(initInfo.mqInfo);
    }
    if (!isEmpty(initInfo.channelInfo)) {
      // mqUtils.cleanChannelInfo()
      insertChannelInfo(initInfo.channelInfo);
    }
    if (!isEmpty(initInfo.srcInfo)) {
      for (let i = 0; i < initInfo.srcInfo.length; i++) {
        resourceContainer.removeSrcInfoById(initInfo.srcInfo[i].srcId);
      }
      insertSrcInfo(initInfo.srcInfo);
    }
  }
}
/**
 * @func  insertSrcInfo
 * @desc  添加资源信息
 * @param {object} srcInfoList  资源信息列表
 * @return {object} null
 */
function insertSrcInfo(srcInfoList) {
  if (!isEmpty(srcInfoList)) {
    for (let i = 0; i < srcInfoList.length; i++) {
      if (checkSrcInfo(srcInfoList[i])) {
        // 资源添加成功后，判断是否存在等待中的消费者请求，若存在发起订阅
        if (resourceContainer.addSrcInfo(srcInfoList[i]) && srcInfoList[i].srcType === common.requestCode.SUBSCRIBE_REQUEST && reciveTaskPendingMap.has(srcInfoList[i].srcId)) {
          startSubscribeMsg(srcInfoList[i].srcId);
        }
      } else {
        log.error(srcInfoList[i], common.errorInfo.ADD_SRCINFO_ERROR);
      }
    }
  }
}
/**
 * @func  insertMQInfo
 * @desc  添加MQ信息
 * @param {object} mqInfoList  MQ信息列表
 * @return {object} null
 */
function insertMQInfo(mqInfoList) {
  if (!isEmpty(mqInfoList)) {
    for (let i = 0; i < mqInfoList.length; i++) {
      if (checkMQInfo(mqInfoList[i])) {
        resourceContainer.initMqInfo(mqInfoList[i]);
      } else {
        log.error(mqInfoList[i], common.errorInfo.ADD_SRCINFO_ERROR);
      }
    }
  }
}
/**
 * @func  insertChannelInfo
 * @desc  添加通道信息
 * @param {object} channelInfoList  通道信息列表
 * @return {object} null
 */
function insertChannelInfo(channelInfoList) {
  if (!isEmpty(channelInfoList)) {
    for (let i = 0; i < channelInfoList.length; i++) {
      if (checkChannelInfo(channelInfoList[i])) {
        // 保存请求资源与mq的关系
        resourceContainer.initChannelInfo(channelInfoList[i]);
      } else {
        log.error(channelInfoList[i], common.errorInfo.ADD_SRCINFO_ERROR);
      }
    }
  }
}

export default {
  /**
   * @func  getAllChannelInfo
   * @desc  获取初始化mq信息
   * @return {object} returnInfo
   */
  getAllChannelInfo() {
    let initInfo = null;
    api.getResourceBusInfo(null, response => {
      if (response.status !== common.requestCode.RESPONSE_STATUS) {
        log.error(common.logInfo.RESPONSE_STATUS_ERROR, response);
        return;
      }
      if (response.data.statusCode !== common.requestCode.SUCCESS_INFO_CODE) {
        log.error(common.logInfo.RESPONSE_DATA_RET_ERROR, response.data.statusMessage);
        return;
      }
      if (!response.data.content) {
        log.error(common.logInfo.RESPONSE_DATA_CONTENT_ERROR, response.data);
        return;
      }
      initInfo = JSON.parse(response.data.content);
      initConfigInfo(initInfo);
    });
  },

  /**
   * @func  getMQConfigInfoByMqId
   * @desc  获取指定初始化mq信息
   * @return {object} returnInfo
   */
  getMQConfigInfoByMqId(mqId) {
    let initInfo = null;
    api.getMQConfigInfoByMqId({ mqId: mqId }, response => {
      if (response.status !== common.requestCode.RESPONSE_STATUS) {
        log.error(common.logInfo.RESPONSE_STATUS_ERROR, response);
        return;
      }
      if (response.data.statusCode !== common.requestCode.SUCCESS_INFO_CODE) {
        log.error(common.logInfo.RESPONSE_DATA_RET_ERROR, response.data.statusMessage);
        return;
      }
      if (!response.data.content) {
        log.error(common.logInfo.RESPONSE_DATA_CONTENT_ERROR, response.data);
        return;
      }
      initInfo = JSON.parse(response.data.content);
      initConfigInfoByMqId(initInfo);
    });
  },

  /**
   * @func  mainChannelReciveCallback
   * @desc  监听主队列信息
   * @param {string} message  消息JSON串
   * @return {object} null
   */
  mainChannelReciveCallback(message) {
    if (isEmpty(message)) {
      log.debug(common.logInfo.GOT_EMPTY_MESSAGE);
      return;
    }
    log.debug('监听主队列回调函数信息：' + message.body);
    let mainChannelInfo = JSON.parse(message.body);
    if (checkMainChannelInfo(mainChannelInfo)) {
      let initInfo = JSON.parse(mainChannelInfo.content);
      // 下传设置，初始化信息，
      if (mainChannelInfo.type === common.operateType.MQ_INIT_DATA_TYPE) {
        initConfigInfoByMqId(initInfo);
        // 重新订阅全部历史任务
        let receiveTaskAllList = reciveTaskHandleMap.values();
        for (let m = 0; m < receiveTaskAllList.length; m++) {
          let receiveTaskList = receiveTaskAllList[m];
          if (!isEmpty(receiveTaskList) && Array.isArray(receiveTaskList)) {
            for (let i = 0; i < receiveTaskList.length; i++) {
              if (receiveTaskList[i].routingKeys === null) {
                dataBusUtils.receiveMsg(receiveTaskList[i].srcId, receiveTaskList[i].reciveCallback);
              } else {
                dataBusUtils.receiveMsgByRoutingKey(receiveTaskList[i].srcId, receiveTaskList[i].routingKeys, receiveTaskList[i].reciveCallback);
              }
              }
            }
          }
        }
      // MQ配置信息发生改变，需及时生效
      if (mainChannelInfo.type === common.operateType.MQ_CHANGE_DATA_TYPE && checkMQConfigInfo(initInfo)) {
      ) {
        changeConfigInfo(initInfo);
      }
    }
  },
  /**
   * @func  sendMsg
   * @desc  发送信息
   * @param {string} srcId  资源id
   * @param {jsonString} msg  消息JSON串
   * @return {boolean} 是否成功
   */
  sendMsg(srcId, msg) {
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    // 判断该请求资源信息是否存在
    if (resourceContainer.isExistSrc(srcId)) {
      let srcInfo = resourceContainer.getSrcInfoById(srcId);
      // 判断是否是生产者，且通道ID信息存在
      if (!isEmpty(srcInfo) && srcInfo.srcType === common.requestCode.SEND_REQUEST && !isEmpty(srcInfo.channelId)) {
        if (isEmpty(srcInfo.routingKeys)) {
          returnInfo = mqUtils.sendMsg(srcInfo.channelId, msg);
        } else {
          returnInfo = mqUtils.sendMsgByRoutingKey(srcInfo.channelId, srcInfo.routingKeys, msg);
        }
      } else {
        log.error(srcId + common.returnInfo.SEND_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_INFO_ERROR);
      }
    } else {
      log.error(srcId + common.returnInfo.SEND_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_NON_EXISTENT);
    }
    return returnInfo;
  },
  /**
   * @func  sendMsgByRoutingKey
   * @desc  发送带路由键的信息
   * @param {string} srcId  资源id
   * @param {string} routingKeys  路由键 （可以为空字符串）
   * @param {jsonString} msg  消息JSON串
   * @return {boolean} 是否成功
   */
  sendMsgByRoutingKey(srcId, routingKeys, msg) {
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    // 判断该请求资源信息是否存在
    if (resourceContainer.isExistSrc(srcId)) {
      let srcInfo = resourceContainer.getSrcInfoById(srcId);
      // 判断是否是生产者，且通道ID信息存在
      if (!isEmpty(srcInfo) && srcInfo.srcType === common.requestCode.SEND_REQUEST && !isEmpty(srcInfo.channelId)) {
        let newRoutingKeys = null;
        if (routingKeys === null) {
          if (isEmpty(srcInfo.routingKeys)) {
            newRoutingKeys = '';
          }
          newRoutingKeys = srcInfo.routingKeys;
        } else {
          newRoutingKeys = routingKeys;
        }
        returnInfo = mqUtils.sendMsgByRoutingKey(srcInfo.channelId, newRoutingKeys, msg);
      } else {
        log.error(srcId + common.returnInfo.SEND_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_INFO_ERROR);
      }
    } else {
      log.error(srcId + common.returnInfo.SEND_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_NON_EXISTENT);
    }
    return returnInfo;
  },
  /**
   * @func  receiveMsgByRoutingKey
   * @desc  接受带路由键的消息
   * @param {string} srcId  资源id
   * @param {string} routingKeys  路由键
   * @param {string} reciveCallback  回调函数
   * @return {function}  reciveCallback 回调函数
   */
  receiveMsgByRoutingKey(srcId, routingKeys, reciveCallback) {
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    // 订阅任务对象
    let receiveTask = {
      srcId: srcId,
      reciveCallback: reciveCallback,
      routingKeys: routingKeys
    };
    if (resourceContainer.isExistSrc(srcId)) {
      let srcInfo = resourceContainer.getSrcInfoById(srcId);
      // 判断是否是消费者，且通道和mq信息存在
      if (!isEmpty(srcInfo) && srcInfo.srcType === common.requestCode.SUBSCRIBE_REQUEST && !isEmpty(srcInfo.channelId)) {
        let newRoutingKeys = null;
        if (routingKeys === null) {
          if (isEmpty(srcInfo.routingKeys)) {
            newRoutingKeys = '';
          }
          newRoutingKeys = srcInfo.routingKeys;
        } else {
          newRoutingKeys = routingKeys;
        }
        returnInfo = mqUtils.receiveMsgByRoutingKey(srcInfo.channelId, newRoutingKeys, reciveCallback, srcId);
        // 接收消息任务对象,用于断网恢复机制
        receiveTask.channelId = srcInfo.channelId;
        receiveTask.routingKeys = newRoutingKeys;
        if (reciveTaskHandleMap.has(srcId)) {
          let list = clone(reciveTaskHandleMap.get(srcId));
          list.push(receiveTask);
          reciveTaskHandleMap.set(srcId, list);
        } else {
          let reciveTaskHandleList = [];
          reciveTaskHandleList.push(receiveTask);
          reciveTaskHandleMap.set(srcId, reciveTaskHandleList);
        }
      } else {
        log.error(srcId + common.returnInfo.SUBSCRIBE_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_INFO_ERROR);
      }
    } else {
      if (reciveTaskPendingMap.has(srcId)) {
        let list = clone(reciveTaskPendingMap.get(srcId));
        list.push(receiveTask);
        reciveTaskPendingMap.set(srcId, list);
      } else {
        let reciveTaskPendingList = [];
        reciveTaskPendingList.push(receiveTask);
        reciveTaskPendingMap.set(srcId, reciveTaskPendingList);
      }

      log.error(srcId + common.returnInfo.SUBSCRIBE_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_NON_EXISTENT);
    }
    reciveCallback = null;
    return returnInfo;
  },
  /**
   * @func  receiveMsg
   * @desc  接受消息
   * @param {string} srcId  资源id
   * @param {string} reciveCallback  回调函数
   * @return {function}  reciveCallback 回调函数
   */
  receiveMsg(srcId, reciveCallback) {
    log.debug('订阅主通道信息');
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    // 订阅任务对象
    let receiveTask = {
      srcId: srcId,
      reciveCallback: reciveCallback
    };
    if (resourceContainer.isExistSrc(srcId)) {
      let srcInfo = resourceContainer.getSrcInfoById(srcId);
      // 判断是否是消费者，且通道ID信息存在
      if (!isEmpty(srcInfo) && srcInfo.srcType === common.requestCode.SUBSCRIBE_REQUEST && !isEmpty(srcInfo.channelId)) {
        if (isEmpty(srcInfo.routingKeys)) {
          returnInfo = mqUtils.receiveMsg(srcInfo.channelId, reciveCallback, srcId);
        } else {
          returnInfo = mqUtils.receiveMsgByRoutingKey(srcInfo.channelId, srcInfo.routingKeys, reciveCallback, srcId);
          receiveTask.routingKeys = srcInfo.routingKeys;
        }
        // 接收消息任务对象
        receiveTask.channelId = srcInfo.channelId;
        if (reciveTaskHandleMap.has(srcId)) {
          let list = clone(reciveTaskHandleMap.get(srcId));
          list.push(receiveTask);
          reciveTaskHandleMap.set(list);
        } else {
          let reciveTaskHandleList = [];
          reciveTaskHandleList.push(receiveTask);
          reciveTaskHandleMap.set(srcId, reciveTaskHandleList);
        }
      } else {
        log.error(srcId + common.returnInfo.SUBSCRIBE_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_INFO_ERROR);
      }
    } else {
      if (reciveTaskPendingMap.has(srcId)) {
        let list = clone(reciveTaskPendingMap.get(srcId));
        list.push(receiveTask);
        reciveTaskPendingMap.set(srcId, list);
      } else {
        let reciveTaskPendingList = [];
        reciveTaskPendingList.push(receiveTask);
        reciveTaskPendingMap.set(srcId, reciveTaskPendingList);
      }
      log.error(srcId + common.returnInfo.SUBSCRIBE_INFO_FAIL + common.returnInfo.REQUEST_RESOURCES_NON_EXISTENT);
    }
    return returnInfo;
  },
  /**
   * @func  unSubscribeMsg
   * @desc  取消订阅消息
   * @param {string} subscribeId  订阅id
   * @return {object}  null
   */
  unSubscribeMsg(subscribeId, routingKeys) {
    unSubscribe(subscribeId, routingKeys);
  },
  /**
   * @func  disconnectMq
   * @desc  根据mqId断开MQ连接
   * @param {string} mqId 消息中间件id
   * @return {boolean} 是否成功
   */
  disconnectMq() {
    mqUtils.disconnectMq();
    resourceContainer.cleanSrcInfo();
    reciveTaskHandleMap.clear();
    reciveTaskPendingMap.clear();
  }
};
