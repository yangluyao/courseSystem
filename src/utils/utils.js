/**
 * 公共方法
 */


/**
 * 获取id 唯一值
 * 将
 * @param
 */
export function  genID(length){
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}
/**
 * @author
 * @date 2020-03-06
 * @Description: 模糊查询
*/
export function fuzzyQuery(list, keyWord,prop) {
  var reg =  new RegExp(keyWord);
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (reg.test(list[i][prop])) {
      arr.push(list[i]);
    }
  }
  return arr;
}
