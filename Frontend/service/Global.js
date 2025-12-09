import axios from 'axios'
let apiKey = import.meta.env.VITE_STRAPI_API_KEY
const axiosCreate = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
})


const CreateNewResume = (data) => {
    console.log(data)
    return axiosCreate.post('/user-resumes',data)
}

const GetResume = (emailResume) => {
    console.log(emailResume)
    return axiosCreate.get('/user-resumes?filters[userEmail][$eq]='+emailResume)
}

const UpdateResume = (id,data) => {
    console.log(id,data)
    return axiosCreate.put(`/user-resumes/${id}`,data)
}

const GetResumeById = (id) => {
    return axiosCreate.get(`/user-resumes/${id}?populate=*`)
}

const DeleteResume = (id) => {
    return axiosCreate.delete(`/user-resumes/${id}`)
}

export default {CreateNewResume,GetResume,UpdateResume,GetResumeById,DeleteResume}
