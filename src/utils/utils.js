export function cloneObj(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function randomId(){
    return Date.now();
}