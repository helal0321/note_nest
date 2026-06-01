export const breakWordCheck=(string)=>{
    return string.split(" ")?.find((word)=>word.length>20)
}