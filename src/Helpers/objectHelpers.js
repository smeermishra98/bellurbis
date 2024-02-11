export default {
    getQueryString(params) {
        if (!params) {
            return "";
        }
        if(params?.url){
            return `${params?.url}/`
        }
        var esc = encodeURIComponent;
        return "?" + Object.keys(params)
            .map(k => esc(k) + "=" + esc(params[k]))
            .join("&");
    }
};


