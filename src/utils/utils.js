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

export function getNameById(Id,copareId,data){
  let ARR = data.filter(item=>{
    if(item[copareId] === Id){
      return item
    }
  })
  return ARR
}
//a:[1,2,3,4,5,6], b:[2,3]  =>c:[1,4,5,6]
export function getDiffer(arr1,arr2,typeName){
  return Object.values(arr1.concat(arr2).reduce((acc,cur) => {
    if (acc[cur[typeName]] && acc[cur[typeName]][typeName] === cur[typeName]) {
      delete acc[cur[typeName]];
    }else{
      acc[cur[typeName]] = cur;
    }
    return acc ;
  },{}));
}
