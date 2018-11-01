import $ from 'jquery';

class Api {

    static api_url = "http://localhost:5000/";    

    static _call = (method, data) => {

        let headers = {
            'Access-Control-Allow-Origin' : '*',
            'Content-type': "application/json"            
        }

        if (data["user"]) {
            headers['Authorization'] = 'Bearer ' + data["user"].auth_token;
        }

        $.ajax(Api.api_url + data["endpoint"], {data: JSON.stringify(data["data"]), type: method, headers: headers })
        .then((res) => {
        if (res.status == "success") {
            if(data["success"]) data["success"](res);
        } else {
            if (data["failure"]) data["failure"](res);
        }
        }).fail((res) => {
            if (data["failure"]) {
                data["failure"](res);
            } else {
                alert("An error happened.")
            }            
        });
    }

    static post = (data) => {        

        return Api._call("POST", data);
    }

    static get = (data) => {        

        return Api._call("GET", data);
    }
}

export default Api;
