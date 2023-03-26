/**
 * 时间格式化
 * @param date 时间
 * @param fmt 格式
 * @returns {string}
 */
export function formatDate(date, fmt) {
    date = new Date(date)
    if(typeof(fmt) === 'undefined'){
        fmt = 'yyyy-MM-dd HH:mm:ss';
    }
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    const o = {
        'M+':date.getMonth()+1,
        'd+':date.getDate(),
        'H+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    }
    for(const k in o) {
        if(new RegExp(`(${k})`).test(fmt)){
            const str = o[k]+'';
            fmt = fmt.replace(RegExp.$1,RegExp.$1.length===1?str:('00'+str).substr(str.length));
        }
    }
    return fmt;
}

/**
 * 数字类型校验
 * @param val 入参
 * @returns {boolean}
 */
 export function isNum(val) {
    let num = Number(val);
    if(!num || isNaN(num))return false
    return true
}