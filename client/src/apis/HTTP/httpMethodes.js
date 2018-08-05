import axios from 'axios';

export function post(url, data){
    return axios.post(url,data)
                    .then(response => {

                        return response;
                        
                    }).catch(errors => {

                        return errors;

                    })
        
}

