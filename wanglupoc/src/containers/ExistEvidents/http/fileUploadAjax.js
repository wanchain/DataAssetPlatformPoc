const uploadUrl = 'http://localhost:8090/RemoteFileHashRelay/ipfs';
// const ipfsUrl = 'http://127.0.0.1:5001/api/v0/add?p';

export default function uploadFile(formData, result, errorResult, delay) {
  const method = 'POST';
  const promise = new Promise(function NoName(resolve, reject) {
    setTimeout(()=> {
      const XHR = new XMLHttpRequest();
      XHR.open(method, uploadUrl, true);
      XHR.addEventListener('readystatechange', function NoName2() {
        switch (XHR.readyState) {
          // alert('请求未初始化');
          case 0:
            break;
          // alert('请求启动，尚未发送');
          case 1:
            break;
          // alert('请求发送，尚未得到响应');
          case 2:
            break;
          // alert('请求开始响应，收到部分数据');
          case 3:
            break;
          // alert('请求响应完成得到全部数据');
          case 4:
            if (XHR.status === 200) {
              try {
                if (__DEVELOPMENT__) console.log('XHR.responseText=' + XHR.responseText);
                const data = JSON.parse(XHR.responseText);
                resolve(data);
              } catch (err) {
                reject(err);
              }
            }
            break;
          default:
            break;
        }
      });
      XHR.addEventListener('error', function NoName3(error) {
        reject(error);
      });
      XHR.send(formData);
    });
  }, delay);

  promise.then(result).catch(errorResult);

  return promise;
}
