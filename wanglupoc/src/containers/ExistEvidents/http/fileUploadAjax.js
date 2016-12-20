'use strict';

const uploadUrl = "http://localhost:8090/ipfs";
const ipfsUrl = "http://127.0.0.1:5001/api/v0/add?p";

export default function UploadFile(formData,result,errorResult,delay){

    let method = 'POST';

    let promise = new Promise(function (resolve, reject) {

        setTimeout(()=> {
            let XHR = new XMLHttpRequest();
            XHR.open(method, uploadUrl, true);
            // XHR.setRequestHeader(
            //         "content-type", "application/x-www-form-urlencoded"
            // );
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
            XHR.send(formData);

        });
    },delay);

    promise.then(result).catch(errorResult);

    return promise;

}