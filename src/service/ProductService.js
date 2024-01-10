import axios from "axios";

const productService = {

    getAllProductByCategory: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/findAllByIdCategory/` + id,
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

    getNewProduct: () => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/findNewProduct`,
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

    findAllByFilters(nameSearch, minPrice, maxPrice) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/findAllByFilters?nameSearch=${nameSearch}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
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

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/findProductById/` + id,
                headers: {
                    'Accept': 'application/json'
                },
                id: id
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    getProductByNameSearch: (nameSearch) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/searchProductByName?nameSearch=` + nameSearch,
                headers: {
                    'Accept': 'application/json'
                },
                nameSearch: nameSearch
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    getProductByShop: (idShop) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/findProductByShopId?idShop=` + idShop,
                headers: {
                    'Accept': 'application/json'
                },
                idShop: idShop
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    createProductByShop: (product, idShop) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/createProduct/` + idShop,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: product
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    removeProduct: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/removeProduct/` + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: id,
                id: id
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    getProductByIdProduct: (idProduct) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url:`http://localhost:8080/product/findProductById/` + idProduct,
                headers: {
                    'Accept': 'application/json'
                },
                idProduct: idProduct
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    editProductByIdProduct: (product, idProduct) => {
        console.log(product.id)
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/product/updateProduct/` + idProduct,
                headers: {
                    "content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: product,
                idProduct: idProduct
            }
            axios.request(config).then(response => {
                resolve(response.data);
                console.log("response.data sau khi edit = ", response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    getProductByOrder: (idOrder) => {
        console.log(idOrder)
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url:`http://localhost:8080/product/findProductByOrderId/` + idOrder,
                headers: {
                    'Accept': 'application/json'
                },
                idOrder: idOrder
            }
            axios.request(config).then(response => {
                resolve(response.data);
                console.log("response.data sau khi edit = ", response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    }

}
export default productService;