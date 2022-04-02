import { axiosClient } from "./Link";
const StudentAPI = {
    getAll() {
        const url = `/students`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/student/${id}`;
        return axiosClient.get(url);
    }
    ,
    getMajors(majors) {
        const url = `/students/${majors}`;
        return axiosClient.get(url);
    },
    add(product) {
        const url = `/student`;
        return axiosClient.post(url, product);
    },
    remove(id) {
        const url = `/students/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/students/${id}`;
        return axiosClient.put(url, data);
    },

};
export default StudentAPI;