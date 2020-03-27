export function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return r[2];
	return null; // 返回参数值
}
export function unixToTime(UNIX_timestamp, splitMark, type){
  // var splitMark = arguments[1] || '.';
  var splitMark = splitMark || '.';
  var a = new Date(UNIX_timestamp);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if( type == 1 ) {
    var time = year + splitMark + month + splitMark + addZero(date);
  } else if (type == 2) {
        var time = year + splitMark + month + splitMark + addZero(date) + '  ' + addZero(hour) + ':' + addZero(min);
    } else if (type == 'myOrder') {
        var time = month + splitMark + addZero(date) + ' ' + addZero(hour) + ':' + addZero(min);
    } else {
    var time = year + splitMark + month + splitMark + addZero(date) + ' ' + addZero(hour) + ':' + addZero(min) + ':' + addZero(sec) ;
  }
  return time;
}
//传进来10以下的字符，就返回前面带一个'0'
export function addZero(num){
	if(num<10){
		return '0'+ num;
	} else {
		return num;
	}
}
export function  isIOS () {
  return /(iphone|ipad|ipod)/i.test(navigator.userAgent)
}
export function  isAndroid () {
  return /(android|adr|linux)/i.test(navigator.userAgent)
}
export function inApp() {
  var from = getUrlParam('from'),
  ua = navigator.userAgent.toLowerCase();
  return (ua.indexOf('kaochongapp') !== -1 || from === 'app');
}

export function isInWeiXin () {
  let ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
}

export function fontReplace(s) {
  let arr = s.toString().split('')
  let html = []
  arr.forEach((i, s) => {
    html.push(`<span class="kcicon kcicon-no-${i}"></span>`)
  })
  return html.join('')
}
export function getHost() {
  var tempHost = window.location.host;
  var tempMap = {
    rd: 'https://kcapp.rdtest.xuanke.com',
    qa: 'https://kcapp.qatest.xuanke.com',
    sandbox: 'https://pre-www.kaochong.com',
    online: 'https://www.kaochong.com'
  };
  if (/rdtest|localhost|127\.0\.0\.1/.test(tempHost)) {
    return tempMap.rd;
  } else if (/qatest/.test(tempHost)) {
    return tempMap.qa;
  } else if (/pre-/.test(tempHost)) {
    return tempMap.sandbox;
  } else {
    return tempMap.online;
  }
}

export function getWormHoleHost() {
  var tempHost = window.location.host;
  var tempMap = {
    rd: 'https://kcwormhole.rdtest.xuanke.com',
    qa: 'https://kcwormhole.qatest.xuanke.com',
    sandbox: 'https://pre-wormhole.kaochong.com',
    online: 'https://wormhole.kaochong.com'
  };
  if (/rdtest|localhost|127\.0\.0\.1/.test(tempHost)) {
    return tempMap.rd;
  } else if (/qatest/.test(tempHost)) {
    return tempMap.qa;
  } else if (/pre-/.test(tempHost)) {
    return tempMap.sandbox;
  } else {
    return tempMap.online;
  }
}

export function dateFtt(fmt,date) 
{ 
 date = new Date(date)
 var o = { 
 "M+" : date.getMonth()+1,     //月份 
 "d+" : date.getDate(),     //日 
 "h+" : date.getHours(),     //小时 
 "m+" : date.getMinutes(),     //分 
 "s+" : date.getSeconds(),     //秒 
 "q+" : Math.floor((date.getMonth()+3)/3), //季度 
 "S" : date.getMilliseconds()    //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
  fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length))
 }
 for(var k in o) {
  if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
 }
 return fmt; 
}
