import {team,db,dbChats} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc,collection} from 'firebase/firestore'

function GetUser(email){
    onSnapshot(doc(db, 'team', email),data=>{
        console.log('data changed',data.data())
        return data.data()
    })
    console.log('beforechange')
}
export function changeKey(data,newKey,oldKey){
    data = {...data}
    let tempData = {}
    console.log(Object.keys(data))
    Object.keys(data).forEach(key=>{
        let newKeyValue = data[key][newKey]
        console.log(newKeyValue)
        tempData[newKeyValue] = data[key]
        tempData[newKeyValue][oldKey] = key
    })
    return tempData

}
export function sortData(data,sortField,keyName){
    data = {...data}
    let myData = {...insertKey(data,keyName)}
    let tempData = {}
    let values = Object.values(myData)
    for (let i = 0; i < values.length; i++) {
        let value = values[i]
        let min = value[sortField]
        let index = i
        for (let j = i+1; j < values.length ; j++) {
            if(values[j][sortField]<min){
                min = values[j][sortField]
                index = j
            }
        }
        values[i] = values[index]
        values[index] = value
    }
    for (let i = 0; i < values.length; i++) {
        let val = values[i]
        let thisKey = values.filter(a=>a[keyName] === val[keyName])[0][keyName]
        tempData[thisKey] = data[thisKey]
    }
    return tempData

}
export function insertKey(data,keyName){
    data = {...data}
    let tempData = {}
    Object.keys(data).forEach(key=>{
        tempData[key] = {...data[key]}
        tempData[key][keyName] = key
    })
    return tempData

}
export function makeExtensible(data){
    let tmp = {}
    Object.keys(data).forEach(key=>{
        tmp[key] = data[key]
    })
    return JSON.parse(JSON.stringify(tmp))
}
export function removeFromArray(array,item){
    if(typeof (item)=== 'object'){
        let tempArray = [...array]
        item = JSON.stringify(item)
        for (let i = 0; i < tempArray.length; i++) {
            if(item === JSON.stringify(tempArray[i])){
                tempArray = tempArray.slice(0,i).concat(tempArray.slice(i+1))
            }
        }
        return tempArray

    }else{
        let index = array.indexOf(item)
        try {
            if (index == array.length - 1) {
                array.pop()
            } else if (index == 0) {
                array = array.slice(1)
            } else {
                array = array.slice(0, index).concat(array.slice(index + 1))
            }
            return array
        } catch {
            console.error("The item does not exist in array")
        }
    }

}
export function filterData(data,[field,opStr,value,matchCase]){
    let types = ['string','number',null]
    let isMatchable = types.includes(typeof (value))
    let isObject
    if(!data.length){
        isObject = true
        data = Object.values(insertKey(data,'filterCustomKey'))
    }
    let filteredData
    if(!opStr && !value){
        if(field.includes('!')){
            filteredData = data.filter(a=>{
                return !a[field.replace('!','')]
            })
        }else {
            filteredData = data.filter(a=>{
                return a[field]
            })
        }

    }else if(opStr === '=='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() === value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field]  === value
            })

        }
    }else if(opStr === '!='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() !== value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field]  !== value
            })

        }

    }else if(opStr === 'includes'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase().includes(value.toString().toLowerCase())
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field].includes(value)
            })

        }

    }else if(opStr === '>'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() > value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] > value
            })

        }

    }else if(opStr === '>='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() >= value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] >= value
            })

        }

    }else if(opStr === 'array-contains'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].includes(value)
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field].includes(value)
            })

        }

    }else if(opStr === '<'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() < value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] < value
            })

        }

    }else if(opStr === '<='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() <= value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] <= value
            })

        }

    }else {
        filteredData =  data
    }
    if(isObject){
        let tempObject = {}
        filteredData.forEach(item=>{
            let key =  item['filterCustomKey']
            delete item['filterCustomKey']
            tempObject[key] = item
        })
        filteredData = tempObject
    }
    return filteredData

}

export {
    GetUser
}
