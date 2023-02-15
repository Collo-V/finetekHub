import Swal from "sweetalert2";

export function isEmail(email){
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?
        true:false
}

export function Validate(id){
    let inp = document.getElementById(id)
    let val = inp.value
    if(id=='firstName'){
        if(val=='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='lastName'){
        if(val=='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='email'){
        if(!isEmail(val)){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='company'){
        if(val=='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='phones'){
        if(val=='' || val.length<10){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='password1'){
        let specialChar,uppercase,number,lowercase,specials
        specials = [ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
            "~", "*", "?", ":","\"","\\",'.',',','@']
        specialChar=uppercase=number=lowercase=false
        for (let i = 0; i < val.length; i++) {
            if (specials.includes(val[i])){
                specialChar = true
            }
            else if (!isNaN(val[i])){
                number = true
            }
            else if (val[i]==val[i].toUpperCase()){
                uppercase=true
            }
            else if (val[i]==val[i].toLowerCase()){
                lowercase=true
           }
        }
        if(lowercase==false || uppercase==false || specialChar==false || number==false || val.length<8){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='password2'){
        if(document.getElementById('password1').value!==val){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else{
        if(val=='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    inp.classList.add('input-valid')
    inp.classList.remove('input-invalid')
    }
export function validateInp(id){
    let inp = document.getElementById(id)
    let val = inp.value
    if(id==='firstName'){
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='lastName'){
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='email'){
        if(!isEmail(val)){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='company'){
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='phones'){
        if(val==='' || val.length<10){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='password1'){
        let specialChar,uppercase,number,lowercase,specials
        specials = [ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
            "~", "*", "?", ":","\"","\\",'.',',','@']
        specialChar=uppercase=number=lowercase=false
        for (let i = 0; i < val.length; i++) {
            if (specials.includes(val[i])){
                specialChar = true
            }
            else if (!isNaN(val[i])){
                number = true
            }
            else if (val[i]===val[i].toUpperCase()){
                uppercase=true
            }
            else if (val[i]===val[i].toLowerCase()){
                lowercase=true
            }
        }
        if(lowercase===false || uppercase===false || specialChar===false || number===false || val.length<8){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='password2'){
        if(document.getElementById('password1').value!==val){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else{
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    inp.classList.add('input-valid')
    inp.classList.remove('input-invalid')
}
export function formIsValid (formRef){
    if(typeof (formRef) === 'string') formRef  = document.getElementById(formRef)
    let inps = formRef.getElementsByTagName('input')
    let txt = formRef.getElementsByTagName('textarea')
    inps = [...inps,...txt]
    for (let i = 0; i < inps.length; i++) {
        let inp = inps[i]
        validateInp(inp.id)
    }
    let invalids = document.getElementsByClassName('input-invalid')
    if(invalids.length === 0 )return true
}

export function TextAreaAdjust(id) {
    let element = document.getElementById(id)
    element.style.height = "1px";
    element.style.height = (10+element.scrollHeight)+"px";
}

export function ReverseArray(array){
    array = array.sort()
    let newArray = []
    for (let i = 1; i < array.length+1; i++) {
        newArray.push(array[array.length-i])
    }
    return newArray

}


export function RemoveFromArray(array,item){
    let index = array.indexOf(item)
    try{
        if (index == array.length - 1) {
            array.pop()
        } else if (index == 0) {
            array = array.slice(1)
        } else {
            array = array.slice(0, index).concat(array.slice(index + 1))
        }
        return array
    }catch{
        console.error("The item does not exist in array")
    }

}

export function CreateFile(){
    console.log('start')
    let input=document.createElement("input");
    input.type="file";
    input.accept=".png,.jpg"
    let files=[]
    input.onchange = e=>{
        files=e.target.files;
        let reader=new FileReader();
        reader.onload=function(){
        }
        reader.readAsDataURL(files[0]);
        return files
    }
    input.click()
}

export function CodeGenerator(){
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code="";
    for(let i=0;i<10;i++){
        let x= Math.floor(Math.random() * 26);
        code += x%2==0? letters[x]:x.toString()
        if(code.length>=10){
            if(code.length>10){
                code= code.slice(0,10)
            }
            break
        }
    }
    return code
}
export function dateFormatter(date,format,reverse){
    const d = isNaN(parseInt(date)) || parseInt(date).toString().length<6? new Date(date): new Date(parseInt(date))
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = d.getDate()
    let monthNo = d.getMonth()
    let  month = months[monthNo]
    monthNo+=1
    let year  = d.getFullYear()
    let hour  = d.getHours()
    let mins  = d.getMinutes()
    if (mins<10)mins = '0'+mins
    let abr = hour>=12?'p.m':'a.m'
    let x = day.toString()[-1]
    let sup = x==='1'?'st':
        x==='2'?'nd':
            x==='3'?'rd':'th'
    if(format === 'long-sup' || !format){
        return `${day}<sup>${sup}</sup> ${month}, ${year}, ${hour}:${mins} ${abr}`
    }else if(format === 'long-slash'){
        return reverse?`${year}/${monthNo}/${day},  ${hour}:${mins} ${abr}`
            :`${day}/${monthNo}/${year},  ${hour}:${mins} ${abr}`
    }else if(format === 'short-sup'){
        return `${day}<sup>${sup}</sup> ${month}, ${year}`
    }
    else if(format === 'short-slash'){
        return reverse?`${year}/${monthNo}/${day}`:`${day}/${monthNo}/${year}`
    }
    else if(format === 'formal'){
        let dayOfWeek = ['sunday','monday','tuesday','Wednesday','thursday','friday','saturday'] [d.getDay()]
        dayOfWeek = dayOfWeek.replace(dayOfWeek[0],dayOfWeek[0].toUpperCase())
        return `${dayOfWeek}, ${month} ${day}, ${year}`
    }
    else if(format === 'formal-short'){
        let dayOfWeek = ['sunday','monday','tuesday','Wednesday','thursday','friday','saturday'] [d.getDay()]
        dayOfWeek = dayOfWeek.replace(dayOfWeek[0],dayOfWeek[0].toUpperCase())
        return `${dayOfWeek.slice(0,3)}, ${month.slice(0,3)} ${day}, ${year}`
    }
    else if(format === 'short-hyphen'){
        return reverse?`${year}-${monthNo}-${day}`:`${day}-${monthNo}-${year}`
    }

}
