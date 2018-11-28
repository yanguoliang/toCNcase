function toCNcase(num) {
  num = String(num);
  var cn = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var position = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '万', '拾', '佰', '仟'];
  // 整数部分
  var intPart = num.split('.')[0];
  // 小数部分
  var floatPart = num.split('.')[1];
  // 结果
  var result = '';
  // 是否为0
  var isZero = false;
  if(intPart.length > position.length){
    return '你输入的数字过大'
  }
  for (var index = 0; index < intPart.length; index++) {
    var num = intPart[index]; // 当前位的数字
    var numCN = cn[num]; // 当前位的数字对应的中文大写数字
    var numPreOne = intPart[index - 1]; // 当前位的前一位数字
    var numPreTwo = intPart[index - 2]; // 当前位的前第二位数字
    var numPreThree = intPart[index - 3]; // 当前位的第三位数字
    var numNextOne = intPart[index + 1] // 当前位的后第一位数字
    var numNextTwo = intPart[index + 2] // 当前位的后第二位数字
    var numNextThree = intPart[index + 3] // 当前位的后第三位数字
    var pos = position[intPart.length - index - 1] // 当前数字对应的单位
    if (num != 0) {
      // 当前位数字不为0，用大写数加单位
      result += numCN + pos;
    } else if ('亿' === pos || ('万' === pos && [numPreOne, numPreTwo, numPreThree].some(function (num) { return num !== '0' }))) {
      // 当前位数字为0,单位亿不能省略，单位万的前三位任意一位不为0，不能省略万
      result += pos;
    } else if ('仟' === pos && [numNextOne, numNextTwo, numNextThree].some(function (num) { return num !== '0' })) {
      // 当前数字是0,单位是含有仟，并且后四位不全部为0，补充一个零
      result += numCN;
    } else if ('佰' === pos && numPreOne !== '0' && [numNextOne, numNextTwo].some(function (num) { return num !== '0' })) {
      // 当前位数字为0，单位含有佰，并且当前位的前一位不为0，补充一个零
      result += numCN;
    } else if ('拾' === pos && numPreOne !== '0' && numNextOne !== '0') {
      // 当前位数字为0，单位含有拾，并且当前位的前一位不为0，补充一个零
      result += numCN;
    }
  }
  result += '圆'
  var floatPositon = ['角','分'];
  for (var index = 0; index < floatPart.length; index++) {
    var num = floatPart[index]; // 当前位的数字
    var numCN = cn[num]; // 当前位的数字对应的中文大写数字
    var pos = floatPositon[index] || '';
    if(num !== '0' && pos){
      result += numCN + pos ;
    }
  }
  return result;
}
