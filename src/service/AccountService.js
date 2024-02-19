import axios from "axios";

const accountService = {
    register: (account) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/register',
                headers: {
                    "content-type": "application/json",
                },
                data: account
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    changePassword: (currentPassword,newPassword) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/changePassword?currentPassword=${currentPassword}&newPassword=${newPassword}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    editService: (account) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/updateAccount',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: account
            }
            axios.request(config).then(response => {
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    getAllAccount: () => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/getAllAccount',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tokenAdmin"),
                    'Accept': 'application/json'
                },
            }
            axios.request(config).then(response => {
                console.log(response.data)
                resolve(response.data);
            }).catch(function (err) {
                reject(err)
            });
        })
    },

    removeAccount: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/removeAccount/` + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tokenAdmin"),
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

    getAccountById: (id) => {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/getAccount/` + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tokenAdmin"),
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

    getAccountByUserName: (userName) => {
        console.log(`http://localhost:8080/getAccountByUserName?username=${userName}`)
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8080/getAccountByUsername?username=${userName}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("tokenAdmin"),
                    'Content-Type': 'application/json',
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
export default accountService;