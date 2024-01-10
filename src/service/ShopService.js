import axios from "axios";

const shopService = {

    getShopByAccount: () => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/shop/getShopByAccount`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
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

    createShop: (shop) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/shop/createShop`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: shop
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    getAllShop: () => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/shop`,
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
export default shopService;