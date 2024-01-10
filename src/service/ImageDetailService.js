import axios from "axios";

const imageDetailService = {

    getImageDetail: (idProduct) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/imageDetailProduct/${idProduct}`,
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
    }
}
export default imageDetailService;