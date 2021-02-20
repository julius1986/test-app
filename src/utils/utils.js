export function cloneObj(obj){
    return JSON.stringify(JSON.parse(obj));
}

export function randomId(){
    return Date.now();
}