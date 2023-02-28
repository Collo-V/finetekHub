export function checkClickOutside(event,excluded,callBack,...params){
    let target = event.target
    if(typeof (excluded) === 'string')excluded = document.getElementById(excluded)
    let isOutside
    try{
        isOutside = excluded && !excluded.contains(target)
            // && !target.closest('#taskpane-modal')
            && !target.classList.contains('popup-overlay')
            &&
            target.tagName !== 'BUTTON' && target.parentNode.tagName !== 'BUTTON' &&
            target.parentNode.parentNode.tagName !== 'BUTTON'
    }catch {}


    if(isOutside){
        callBack(...params)
    }
}
