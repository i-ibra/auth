import {post} from './HTTP/httpMethodes'

export function loginUserApi(data){
    return post("/api/users/login",data)
}
export function registerUserApi(data){
    return post("/api/users/register", data)
}