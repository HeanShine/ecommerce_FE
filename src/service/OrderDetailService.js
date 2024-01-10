import axios from "axios";

const oderDetailService = {

    getOderDetailByOrder: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/orderDetail/getOderDetailByOrder/${id}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                id: id
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    }

}
export default oderDetailService;