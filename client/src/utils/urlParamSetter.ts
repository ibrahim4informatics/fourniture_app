export default (oldParams:URLSearchParams, key: string, value: string):URLSearchParams => {
    const params = new URLSearchParams(oldParams);
    if(!value || value.trim().length < 1) {
        params.delete(key);
    }
    else {
        params.set(key,value.trim());
    }
    return params;
}