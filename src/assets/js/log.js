/*
 * @Author: Armito
 * @Date: 2021-09-28 16:35:19
 * @LastEditTime: 2021-09-28 17:43:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-demo\src\assets\js\log.js
 */
import { isEmpty } from "./utils.js";

var configLogLevel = window.config.logLevel;
/** 关闭日志级别 **/
var offLevel = 0;
/** 错误日志级别 **/
var errorLevel = 1;
/** 警告日志级别 **/
var warnLevel = 2;
/** 普通日志级别 **/
var infoLevel = 3;
/** 调试日志级别 **/
var debugLevel = 4;
var logLevelType = {
  error: errorLevel,
  warn: warnLevel,
  info: infoLevel,
  debug: debugLevel
};
var logType = [
  "assert",
  "dir",
  "dirxml",
  "group",
  "groupEnd",
  "time",
  "timeEnd",
  "count",
  "trace",
  "profile",
  "profileEnd"
];

var level = logLevelType[configLogLevel];

if (isEmpty(level)) {
  level = 1;
}

// 获取调用文件路径和代码所在行
var getLine = function() {
  var stack = "";
  try {
    throw new Error();
  } catch (e) {
    stack = e.stack;
  }
  var matchResult = stack.match(/\(.*?\)/g) || [];
  return matchResult[3] || "";
};

var printLog = function(param, info, type) {
  var line = getLine();
  if (type && logType.indexOf(type) >= 0) {
    eval("console." + type + "('" + param + "','" + info + "')");
    return;
  }
  if (info) {
    console.info(param, info, line);
  } else {
    console.info(param, line);
  }
};

export default {
  error: function(param, info, type) {
    if (level >= errorLevel) {
      printLog(param, info, type);
    }
  },
  warn: function(param, info, type) {
    if (level >= warnLevel) {
      printLog(param, info, type);
    }
  },
  info: function(param, info, type) {
    if (level >= infoLevel) {
      printLog(param, info, type);
    }
  },
  debug: function(param, info, type) {
    if (level >= debugLevel) {
      printLog(param, info, type);
    }
  }
};
