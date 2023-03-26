

/**
 * 保留i位小数
 * 将数值或字符串类型的数保留i位后以数值类型返回
 * val:需要转换的数 i:需要保留的位数
 */
export function numToFixed(val,i){
    let num = Number(val)
    if(!num || isNaN(num)) return 0
    return (Math.floor(num*Math.pow(10,i))/Math.pow(10,i)).toFixed(i)
}