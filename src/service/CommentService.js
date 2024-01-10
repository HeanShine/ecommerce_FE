import axios from "axios";

const commentService = {

    getCommentByProduct: (idProduct) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/comment/${idProduct}`,
                headers: {
                    'Accept': 'application/json'
                },
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    addCommentByProduct: (idProduct, comment) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/comment/createComment/${idProduct}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: comment
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    }
}
export default commentService;