import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
});


//get postes
export   function getPost(){
    return   api.get("/posts")
}


//delete post
export   function deletePost(id){
    return   api.delete(`/posts/${id}`)
}

//send data 
export   function postData(data){
    return  api.post("/posts",data)
}


//update data with put method
export function sedRequUpdate(id,data){
    return api.put(`/posts/${id}`,data)
}