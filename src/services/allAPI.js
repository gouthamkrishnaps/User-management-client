import { BASE_URL } from "./base_URL"
import { commonApi } from "./commonAPI"


//register api
export const registerAPI = async(user)=>{
    return await commonApi("POST",`${BASE_URL}/user/register`,user,"")
}

//login api
export const loginAPI = async(user)=>{
    return await commonApi("POST",`${BASE_URL}/user/login`,user,"")
}

//get user
export const getUserAPI = async(useremail)=>{
    return await commonApi("GET",`${BASE_URL}/get/user/${useremail}`)
}