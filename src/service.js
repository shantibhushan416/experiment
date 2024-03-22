import axios from "axios"

const url = "http://localhost:8000";


export async function signInPage(data) {
    try {
        const response = await axios.post(`${url}/api/user/login`, data);
        localStorage.setItem("accessToken", response.data);
    } catch (error) {
        console.log(error);
    }
}

export async function postCourse(data) {
    try {
        const response = await axios.post(`${url}/api/courses`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function getCourse(page, perpage) {

    try {
        const response = await axios.get(`${url}/api/courses?page=${page}&size=${perpage}`);
        console.log(response.data.queryCourses);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCoursebyId(id) {
    try {
        const response = await axios.get(`${url}/api/courses/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateCoursebyId(id, data) {
    console.log(data);
    try {
        const response = await axios.put(`${url}/api/courses/${id}`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCoursebyId(id) {
    try {
        const response = await axios.delete(`${url}/api/courses/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


///////////////// Branches API //////////////////

export async function postBranches(data) {

    try {
        const response = await axios.post(`${url}/api/branch`, { name: data });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getBranches() {

    try {
        const response = await axios.get(`${url}/api/branch`, { headers: { "Authorization": ` ${localStorage.getItem("accessToken")}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}