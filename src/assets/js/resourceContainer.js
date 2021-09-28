/*
 * @Author: Armito
 * @Date: 2021-09-28 17:57:23
 * @LastEditTime: 2021-09-28 17:57:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-demo\src\assets\js\resourceContainer.js
 */
import HashMap from "hashmap";
import log from "../../../commons/systemCommon/log.js";
import mqUtils from "../mqUtils/mqUtils.js";
import common from "../mqUtils/common.js";
import util from "../../../commons/util.js";
let srcInfoMap = new HashMap();
/**
 * @func  checkSrcInfo
 * @desc  验证资源中mq的信息
 * @param {object} srcInfoObject  资源信息
 * @return {boolean} 是否符合要求
 */
function checkSrcInfo(srcInfoObject) {
  let flag = false;
  if (
    srcInfoObject &&
    srcInfoObject.channelInfo &&
    srcInfoObject.channelInfo.mqConfigInfo
  ) {
    let mqInfo = srcInfoObject.channelInfo.mqConfigInfo; // mq信息
    if (
      mqInfo.id &&
      mqInfo.ip &&
      mqInfo.webPort &&
      mqInfo.userName &&
      mqInfo.passWord
    ) {
      flag = true;
    }
  }
  return flag;
}

export default {
  /**
   * @func  addSrcInfo
   * @desc  添加资源信息
   * @param {object} srcInfo 资源对象
   * @return {boolean} 是否成功
   */
  addSrcInfo(srcInfo) {
    if (!util.isEmpty(srcInfo) && !util.isEmpty(srcInfo.srcId)) {
      srcInfoMap.set(srcInfo.srcId, srcInfo);
      return true;
    }
    return false;
  },
  /**
   * @func  removeSrcInfoById
   * @desc  根据资源Id删除资源信息
   * @param {string} srcId  资源id
   * @return {boolean} 是否成功
   */
  removeSrcInfoById(srcId) {
    if (srcInfoMap.has(srcId)) {
      srcInfoMap.remove(srcId);
      return true;
    }
    return false;
  },
  /**
   * @func  getSrcInfoById
   * @desc  根据资源Id查询资源信息
   * @param {string} srcId  通道id
   * @return {object}  srcInfoObj 资源对象
   */
  getSrcInfoById(srcId) {
    return srcInfoMap.get(srcId);
  },
  /**
   * @func  isExistSrc
   * @desc  查询资源对象信息是否存在
   * @param {string} srcId  通道id
   * @return {boolean} 是否存在
   */
  isExistSrc(srcId) {
    return srcInfoMap.has(srcId);
  },
  /**
   * @func   cleanSrcInfo
   * @desc  查询资源对象信息是否存在
   * @param {string} srcId  通道id
   * @return {boolean} 是否存在
   */
  cleanSrcInfo() {
    srcInfoMap.clear();
  },

  /**
   * @func  initMqInfo
   * @desc  初始化MQ信息
   * @param {object} mqInfo mq对象信息
   * @return {object} returnInfo
   */
  initMqInfo(mqInfo) {
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    if (!util.isEmpty(mqInfo)) {
      let mqObject = {
        mqId: mqInfo.id, // 消息中间件Id
        ip: mqInfo.ip, // 消息中间件IP
        webSocketPort: mqInfo.webPort, // 消息中间件端口号   前端js连接端口stomp连接端口:15674
        user: mqInfo.userName, // 用户名
        password: mqInfo.passWord
      };
      returnInfo = mqUtils.initMQInfo(mqObject);
    }
    return returnInfo;
  },

  /**
   * @func  initChannelInfo
   * @desc  初始化通道信息
   * @param {object} channelInfo  通道信息
   * @return {object} returnInfo
   */
  initChannelInfo(channelInfo) {
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    if (!util.isEmpty(channelInfo)) {
      let channelObject = {
        channelId: channelInfo.channelId, // 通道id
        mqId: channelInfo.mqId, // 所属MQId
        channelName: channelInfo.channelName, // 通道名称
        modeType: 2 // 客户端订阅、发送目的地类型: 0:/queue ; 1:/exchange ; 2:/amq/queue ; 3:/topic ; 4:/temp-queue  默认使用2:/amq/queue
      };
      // mq通道交换器类型1-fanout 、2-direct和3-Topic 对应发送目的地类型为1-exchange
      if (
        channelInfo.modeType === 1 ||
        channelInfo.modeType === 2 ||
        channelInfo.modeType === 3
      ) {
        channelObject.modeType = 1;
      } else if (channelInfo.modeType === 0) {
        //mq通道类型0-workqueue 转换成 2:/amq/queue模式 队列不存在失败
        channelObject.modeType = 2;
      } else {
        channelObject.modeType = channelInfo.modeType;
      }
      returnInfo = mqUtils.initChannelInfo(channelObject);
    }
    return returnInfo;
  },
  /**
   * @func  init
   * @desc  添加信息
   * @param {object} srcInfo 资源对象
   * @return {boolean} 是否成功
   */
  init(srcInfo) {
    let returnInfo = {
      description: common.returnInfo.REQUEST_FAIL,
      ret: common.returnInfo.FAIL
    };
    // 验证资源信息
    if (checkSrcInfo(srcInfo)) {
      let channelInfo = srcInfo.channelInfo; // 通道信息
      let mqInfo = channelInfo.mqConfigInfo; // mq信息
      if (channelInfo.channelId && channelInfo.channelName) {
        if (
          channelInfo.modeType === common.modeType.AMQ_QUEUE ||
          channelInfo.modeType === common.modeType.EXCHANGE
        ) {
          let mqObject = {
            mqId: mqInfo.id, // 消息中间件Id
            ip: mqInfo.ip, // 消息中间件IP
            webSocketPort: mqInfo.webPort, // 消息中间件端口号   前端js连接端口stomp连接端口:15674
            user: mqInfo.userName, // 用户名
            password: mqInfo.passWord, // 密码
            channelInfo: [
              {
                channelId: channelInfo.channelId, // 通道id
                channelName: channelInfo.channelName, // 通道名称
                modeType: channelInfo.modeType // 通道类型 //queue/topic
              }
            ]
          };
          if (
            channelInfo.modeType === common.modeType.EXCHANGE &&
            srcInfo.routingKeys
          ) {
            mqObject.channelInfo[0].routingKeys = srcInfo.routingKeys;
          }
          returnInfo = mqUtils.init(mqObject);
        } else {
          log.error(
            common.logInfo.RESOURCE_CONTAINER +
              common.logInfo.INIT +
              common.returnInfo.INIT_CHANNEL_FAIL
          );
          return returnInfo;
        }
      }
    }
    return returnInfo;
  }
};
