/**
 * Copyright (c) 2015-2019 kaochong, All rights reserved.
 * @fileoverview 通用方法
 * @author qiuxiaoguang | qiuxiaoguang@kaochong.com
 * @version 1.0 | 2019-04-01 | qiuxiaoguang    // 初始版本。
 * @description 平台信息界定
 */

const USER_AGENT = navigator.userAgent

const Platform = {
  isAndroid () {
    return /(android|adr|linux)/i.test(USER_AGENT)
  },
  isIOS () {
    return /(iphone|ipad|ipod)/i.test(USER_AGENT)
  },
  isIpad () {
    return /ipad/gi.test(USER_AGENT)
  },
  isIphone () {
    return /iphone/gi.test(USER_AGENT)
  },
  isIphoneX () {
    return Platform.isIphone() && (screen.height === 812 && screen.width === 375)
  },
  isIphoneXR () {
    return Platform.isIphone() && (screen.height === 896 && screen.width === 414)
  },
  isIphonePlus() {
    return Platform.isIphone() && (screen.height === 736 && screen.width === 414)
  },
  isInApp () {
    return /(kaochongapp|kaochongvipapp)/i.test(USER_AGENT)
  },
  isWechat () {
    return /MicroMessenger/i.test(USER_AGENT)
  },
  isWeibo () {
    return /WeiBo/i.test(USER_AGENT)
  },
  isQQ () {
    return /(QQ|sQQ)/i.test(USER_AGENT)
  },
  isYouDao () {
    return /(YouDao)/i.test(USER_AGENT)
  },
  isAli () {
    return /AliApp/i.test(USER_AGENT)
  },
  isDingDing () {
    return /DingTalk/i.test(USER_AGENT)
  },
  iosVer () {
    const ua = navigator.userAgent.toLowerCase()
    const ver = ua.match(/cpu iphone os (.*?) like mac os/)
    return !ver
      ? false
      : ver[1].replace(/_/g, '.')
  }
}

export default Platform
