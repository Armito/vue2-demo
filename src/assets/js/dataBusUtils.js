/*
 * @Author: Armito
 * @Date: 2021-09-28 16:27:58
 * @LastEditTime: 2021-09-28 17:13:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-demo\src\assets\js\dataBusUtils.js
 */
import log from "./log.js";
import dataBusManager from "./dataBusManager.js";
import common from "../mqUtils/common.js";
import { isEmpty } from "./utils.js";

/**
 * @desc  自执行函数，实现订阅主队列信息
 * @param {object} infoObject  资源信息
 * @return {boolean} 是否符合要求
 */
// (function () {
// dataBusManager.getAllChannelInfo()
// dataBusManager.receiveMsg(commonUtil.webSocketCommon.operateType.MAINCHANNEL_CONSUMER, dataBusManager.mainChannelReciveCallback())
// })()
export default {
  /**
   * @func  init
   * @desc  获取初始化mq信息
   * @return {object} returnInfo
   */
  init() {
    return dataBusManager.getAllChannelInfo();
  },

  /**
   * @func  initByMqId
   * @desc  获取初始化mq信息
   * @return {object} returnInfo
   */
  initByMqId(mqId) {
    return dataBusManager.getMQConfigInfoByMqId(mqId);
  },

  reciveMainChannel() {
    dataBusManager.receiveMsgByRoutingKey(
      common.operateType.MAINCHANNEL_CONSUMER,
      "",
      dataBusManager.mainChannelReciveCallback
    );
  },

  /**
   * @func  sendMsg
   * @desc  发送信息
   * @param {string} srcId  资源id
   * @param {jsonString} msg  消息JSON串
   * @return {object} returnInfo
   */
  sendMsg(srcId, msg) {
    let returnInfo = {
      description: common.returnInfo.PARAMETER_ERROR,
      ret: common.returnInfo.FAIL
    };
    if (!isEmpty(srcId)) {
      returnInfo = dataBusManager.sendMsg(srcId, msg);
    } else {
      log.error(
        common.logInfo.DATA_BUS_UTILS +
          common.logInfo.SENDMSG +
          common.returnInfo.PARAMETER_ERROR
      );
    }
    return returnInfo;
  },

  /**
   * @func  sendMsgByRoutingKey
   * @desc  发送带路由键的信息
   * @param {string} srcId  资源id
   * @param {string} routingKeys  路由键 该路由键可以为空字符串
   * @param {jsonString} msg  消息JSON串
   * @return {object} returnInfo
   */
  sendMsgByRoutingKey(srcId, routingKeys, msg) {
    let returnInfo = {
      description: common.returnInfo.PARAMETER_ERROR,
      ret: common.returnInfo.FAIL
    };
    // 该路由键可以为空字符串
    if (!isEmpty(srcId)) {
      returnInfo = dataBusManager.sendMsgByRoutingKey(srcId, routingKeys, msg);
    } else {
      log.error(
        common.logInfo.DATA_BUS_UTILS +
          common.logInfo.SENDMSG +
          common.returnInfo.PARAMETER_ERROR
      );
    }
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
    let returnInfo = {
      description: common.returnInfo.PARAMETER_ERROR,
      ret: common.returnInfo.FAIL
    };
    if (!isEmpty(srcId) && !isEmpty(reciveCallback)) {
      returnInfo = dataBusManager.receiveMsg(srcId, reciveCallback);
    } else {
      log.error(
        common.logInfo.DATA_BUS_UTILS +
          common.logInfo.RECEIVEMSG +
          common.returnInfo.PARAMETER_ERROR
      );
    }
    return returnInfo;
  },

  /**
   * @func  receiveMsgByRoutingKey
   * @desc  接受带路由键的消息
   * @param {string} srcId  资源id
   * @param {string} routingKeys  路由键 该路由键可以为空字符串
   * @param {string} reciveCallback  回调函数
   * @return {function}  reciveCallback 回调函数
   */
  receiveMsgByRoutingKey(srcId, routingKeys, reciveCallback) {
    let returnInfo = {
      description: common.returnInfo.PARAMETER_ERROR,
      ret: common.returnInfo.FAIL
    };
    // 该路由键可以为空字符串
    if (!isEmpty(srcId) && !isEmpty(reciveCallback)) {
      returnInfo = dataBusManager.receiveMsgByRoutingKey(
        srcId,
        routingKeys,
        reciveCallback
      );
    } else {
      log.error(
        common.logInfo.DATA_BUS_UTILS +
          common.logInfo.RECEIVEMSG +
          common.returnInfo.PARAMETER_ERROR
      );
    }
    return returnInfo;
  },

  /**
   * @func  unSubscribeMsg
   * @desc  取消订阅消息
   * @param {string} srcId  资源id
   */
  unSubscribeMsg(srcId, routingKeys) {
    let returnInfo = {
      description: common.returnInfo.PARAMETER_ERROR,
      ret: common.returnInfo.FAIL
    };
    if (!isEmpty(srcId)) {
      returnInfo = dataBusManager.unSubscribeMsg(srcId, routingKeys);
    }
    return returnInfo;
  },

  /**
   * @func  disconnectMq
   * @desc  根据mqId断开MQ连接
   * @param {string} mqId 消息中间件id
   * @return {boolean} 是否成功
   */
  disconnectMq() {
    dataBusManager.disconnectMq();
  }
};
