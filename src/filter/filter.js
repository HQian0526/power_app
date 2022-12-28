/**
 * 个位数自动添0
 */
export function numFilter(num){
    let number = Number(num)
    if(!number || isNaN(number) || Math.floor(number)<0){       //判断是否为字符串、0、空
        console.log("数值过滤器入参有误")
        return '00'
    }else if(Math.floor(number)<10){
        return '0'+Math.floor(number)
    }else{
        return num
    }
}