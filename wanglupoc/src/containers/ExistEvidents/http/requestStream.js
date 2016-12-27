/**
 * Created by sea on 16-11-20.
 */
import Request from 'request'

export default function requestRemoteFile(url) {
  Request(url, (error, response, body) => {
    if (!error) {
      if (response.statusCode == 200) {
        console.log(body);
      } else {
        console.log('response.statusCode=' + response.statusCode);
      }
    } else {
      if (__DEVELOPMENT__) console.log('error=' + error);
    }
  });
  // Request(url).pipe(fs.createWriteStream('/tmp/doodle.png'));
};

// var http = require('http');

// export default function requestRemoteFile(url){
//
//     http.get(url, (res)=> {
//         console.log(res.statusCode);
//
//         res.on('data', (chunk) => {
//             console.log('BODY: ' + chunk);
//         });
//         res.on('end', () => {
//             console.log('No more data in response.')
//         });
//     }).on('error', (e) => {
//         console.log('Got error: ' + e.message);
//     });
//
//
// }
