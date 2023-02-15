import {isEmail} from "@/commons/index";

export function checkLink(message){
    let msg = ``
    if (message.startsWith('\n')){
        message = message.replace('\n','')
    }
    let lines = message.split('\n')
    let lineCount = 0
    while (lineCount<lines.length){
        let line  = lines[lineCount]
        let words = line.split(' ')
        let count = 0
        while ( count<words.length){
            let word  = words[count]
            let linkIndex = word.indexOf('http')
            if (linkIndex>-1){
                msg+=word.slice(0,linkIndex)
                let head = word.slice(linkIndex,linkIndex+8)
                word = word.slice(linkIndex+8)
                let href= ''
                for (let i = 0; i < word.length; i++) {
                    let letter = word[i]
                    if(letter.match(/[a-z]/i) || !isNaN(letter) || letter=='/' || letter=='.'){
                        href += letter
                    }
                    else if (letter==':'){
                        href+=letter
                        word = word.replace(href,'')
                        href += parseInt(word)
                        break
                    }else{
                        break
                    }
                }
                msg+=`<a href ='${head}${href}' class="underline link-text" target="_blank">${head}${href}</a>`
            }
            else if(isEmail(word)){
                msg+=`<a href ='mailto:${word}' class="underline link-text" target="_blank">${word}</a>`
            }
            else if(word.startsWith('+')){
                let tel = parseInt(word.slice(1))
                if(tel.toString().length>10 && tel.toString().length<13){
                    msg+=`<a href ='tel:+${tel}' class="underline link-text">+${tel}</a>`
                }
                msg+=word.replace(`+${tel}`,'')
            }
            else{
                msg+=word
            }
            msg+=' '
            count++
        }
        msg+='<br>'
        lineCount++
    }
    return msg
}
