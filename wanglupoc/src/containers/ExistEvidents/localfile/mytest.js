/**
 * Created by jishiwu on 12/26/16.
 */

const TX_TYPE_TEXT = 'T';

const clipboard = function useClipboard() {
  const tmp = require('clipboard');
  return new tmp.Clipboard('.btn');
};

const fileHash1 = (file) => {
  const fileReader = new FileReader();
  if (!file) {
    return;
  }
  console.log('state=' + fileReader.readyState);
  console.log({TX_TYPE_TEXT});
};

export {fileHash1, clipboard};
