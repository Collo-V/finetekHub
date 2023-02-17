import {insertKey} from "@/commons/objects";

export function sortData(data,sortField){
    let isObject
    if(!data.length){
        isObject = true
        data = Object.values(insertKey(data,'sortCustomKey'))
    }
    data = [...data]
    for (let i = 0; i < data.length; i++) {
        let item = data[i]
        let minFieldValue = item[sortField]
        let index = i
        for (let j = i+1; j < data.length ; j++) {
            if(data[j][sortField] < minFieldValue){
                minFieldValue = data[j][sortField]
                index = j
            }
        }
        data[i] = data[index]
        data[index] = item
    }
    if(isObject){
        let tempObject = {}
        data.forEach(item=>{
            let key =  item['sortCustomKey']
            delete item['sortCustomKey']
            tempObject[key] = item
        })
        data = tempObject
    }
    return data

}
