import axios from 'axios';

const URL = 'http://localhost:5000/users';

export const addUser = async (data) => {
    try {
        return await axios.post(URL, data);
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async (page, value) => {
    try {
        return await axios.get(`${URL}?_page=${page}&_limit=5&_sort=${value}`)
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async () => {
    try {
        return await axios.get(`${URL}`)
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const editUser = async (id, data) => {
    try {
        return await axios.put(`${URL}/${id}`, data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${URL}/${id}`);
    } catch (error) {
        console.log(error)   
    }
}

export const getSortByName = async (page) => {
    try {
        return await axios.get(`${URL}?_sort=name&_order=assc&_page=${page}&_limit=5`);
    } catch (error) {
        console.log(error)
    }
}

export const getSortByRoll = async (page) => {
    try {
        return await axios.get(`${URL}?&_page=${page}&_limit=5&_sort=id&_order=asc`);
    } catch (error) {
        console.log(error)
    }
}

export const searchName = async (page) => {
    try {
        return await axios.get(`${URL}?&_page=${page}&_limit=5`)
    } catch (error) {
        console.log(error)
    }
}

export const getUserByPage = async (page) => {
    try {
        return await axios.get(`${URL}&_page=${page}&_limit=5`)
    } catch (error) {
        console.log(error)
    }
}
