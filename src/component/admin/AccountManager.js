import React, {useEffect, useState} from 'react';
import accountService from "../../service/AccountService";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const AccountManager = () => {

    const [listAccount, setListAccount] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        accountService.getAllAccount().then(res => {
            if (res.length > 0) {
                setListAccount(res)
            }
        }).catch(err => {
            console.log(err);
        });
    }, [load])

    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const removeAccount = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this account ?");
        if (confirm === true) {
            accountService.removeAccount(id).then(res => {
                toast.success("Delete Account Success !");
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const [usernameSearch, setUsernameSearch] = useState('');
    useEffect(() => {
        accountService.getAccountByUserName(usernameSearch).then(res => {
            setListAccount(res);
        }).catch(err => {
            console.log(err);
        });
    }, [usernameSearch, load]);

    const handleUsernameSearch = (even) => {
        setUsernameSearch(even.target.value);
    }

    return (
        <div>
            <>
                <button className="btn btn-danger"
                        style={{backgroundColor: "indigo", marginLeft: "100px", marginTop: "50px",
                            borderRadius: "12px"}}
                        onClick={Logout}
                >
                    LOG OUT
                </button>

                <div className="container" style={{marginTop: "100px"}}>
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div className="input-group">

                                    <input type="text" className="form-control"
                                           placeholder="Search by username" onChange={handleUsernameSearch}/>
                                    <div className="input-group-append">

                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div className="dropdown ml-4">
                                <button className="btn border dropdown-toggle" type="button" id="triggerId"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Sort by
                                </button>
                                <div className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="triggerId">
                                    <a className="dropdown-item" href="#">Latest</a>
                                    <a className="dropdown-item" href="#">Popularity</a>
                                    <a className="dropdown-item" href="#">Best Rating</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="cotainer">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>name</th>
                                <th>Username</th>
                                <th>Avatar Image</th>
                                <th className="action">Edit</th>
                                <th className="action">Delete</th>
                            </tr>
                            </thead>
                            <tbody>

                            {listAccount.length > 0 ? listAccount.map((account, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td style={{
                                                padding: "10px", fontSize: "16px", color: "#333",
                                                backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                            }}>
                                                <strong>{account.name}</strong>
                                            </td>

                                            <td style={{
                                                padding: "10px", fontSize: "16px", color: "#333",
                                                backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                            }}>
                                                <strong>{account.username}</strong>
                                            </td>

                                            <td>
                                                <a>
                                                    <img src={account.avatar}
                                                         style={{
                                                             width: "150px",
                                                             height: "150px",
                                                             objectFit: "cover",
                                                             borderRadius: "8px",
                                                             boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                                                         }}/>
                                                </a>
                                            </td>

                                            <td>
                                                <button className="btn btn-warning" style={{marginTop: "50px"}}
                                                        data-toggle="modal" data-target="#modalEditAccount"
                                                >Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" style={{marginTop: "50px"}}
                                                        onClick={() => removeAccount(account.id)}
                                                >delete
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : ""}

                            </tbody>
                        </table>
                    </div>

                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mb-3">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </>
        </div>
    );
};

export default AccountManager;