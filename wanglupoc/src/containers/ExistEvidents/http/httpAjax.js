/**
 * Created by sea on 16-11-19.
 */
const METHOD_GET = 1;
const METHOD_POST = 2;

export default function sendHttpRequest(args,method,result,errorResult,delay,url) {
  // const XHR = createXHR();
  let sendMethod = 'GET';
  switch (method) {
    case METHOD_GET:
      sendMethod = 'GET';
      break;
    case METHOD_POST:
      sendMethod = 'POST';
      break;
    default:
      return null;
  }

  let relayUrl = RELAY_URL;
  if (typeof (url) !== 'undefined') {
    relayUrl = url;
  }

  const promise = new Promise(function(resolve, reject) {

    setTimeout(() => {
      if (DEBUG) console.log("Promise delay to " + delay);

      var XHR = new XMLHttpRequest();
      XHR.open(sendMethod, relayUrl, true);
      XHR.send(args);
      XHR.addEventListener('readystatechange', function () {
        switch (XHR.readyState) {
          case 0://alert("请求未初始化");
            break;
          case 1://alert("请求启动，尚未发送");
            break;
          case 2://alert("请求发送，尚未得到响应");
            break;
          case 3://alert("请求开始响应，收到部分数据");
            break;
          case 4://alert("请求响应完成得到全部数据");
            if (XHR.status === 200) {
              try {
                if(DEBUG)console.log("XHR.responseText="+XHR.responseText);
                const data = JSON.parse(XHR.responseText);
                resolve(data);
              } catch (e) {
                reject(e);
              }

            }
            break;
        }
      });
      XHR.addEventListener('error', function (error) {
        reject(error);
      });
    }, delay);
  });

  promise.then(result).catch(errorResult);

  return promise;
}
