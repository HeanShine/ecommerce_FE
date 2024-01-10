import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import _ from "lodash";
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../service/AddressService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import accountService from "../../service/AccountService";
import {v4} from "uuid";
import {storage} from "../../firebase/ConfigFirebase";
import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
import {toast} from "react-toastify";

const AccountInformation = () => {
        const accountLogin = JSON.parse(localStorage.getItem('account'));

        const [account, setAccount] = useState(accountLogin);
        const handleValueInput = (e) => {
            let {name, value} = e.target;
            setAccount({...account, [name]: value});
        }
        const avatarStyle = {
            position: 'relative',
            width: '300px',
            height: '300px',
        };

        const inputImageStyle = {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: '0',
            cursor: 'pointer',
        };

        const [imageUrl, setImageUrl] = useState(
            !_.isEmpty(accountLogin.avatar)
                ? accountLogin.avatar
                : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/3-anh-dai-dien-trang-inkythuatso-03-15-25-56.jpg'
        );

        const initialValues = {
            username: accountLogin.username,
            name: accountLogin.name,
            password: accountLogin.password,
            avatar: accountLogin.avatar,
            apartmentNumber: accountLogin.apartmentNumber,
            province: accountLogin.province,
            district: accountLogin.district,
            ward: accountLogin.ward,
        }

        const [districts, setDistricts] = useState([]);
        const [wards, setWards] = useState([]);
        const [provinces, setProvinces] = useState([]);

        const [provinceName, setProvinceName] = useState(accountLogin.province);
        const [districtName, setDistrictName] = useState(accountLogin.district);

        useEffect(() => {
            getAllProvinces().then(response => {
                setProvinces(response.data.data);
            }).catch(error => {
                console.log(error)
            })
        }, [])

        useEffect(() => {
            if (provinceName) {
                const province = provinces.find(item => item.ProvinceName === provinceName);
                if (province) {
                    getAllDistrictsByProvinceId(province.ProvinceID).then(response => {
                        setDistricts(response.data.data);
                    }).catch(error => {
                        console.log(error)
                    })
                }
            } else {
                setDistricts([]);
                setDistrictName("");
            }
        }, [provinceName])

        useEffect(() => {
            if (districtName) {
                const district = districts.find(item => item.DistrictName === districtName);
                if (district) {
                    getAllWardsByDistrictId(district.DistrictID).then(response => {
                        setWards(response.data.data);
                    }).catch(error => {
                        console.log(error)
                    })
                }
            } else {
                setWards([]);
            }
        }, [districtName])


        const handleSubmit = (values) => {
            values.avatar = imageUrl;
            accountService.editService(values).then(response => {
                values.avatar = imageUrl;
                toast("update success");
                localStorage.setItem('account', JSON.stringify(response));
            }).catch(error => {
                console.log(error)
            })
        }

        const handleClick = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageRef = ref(storage, `${file.name + v4()}`);
                const snapshot = await uploadBytes(imageRef, file);
                const url = await getDownloadURL(snapshot.ref);
                setImageUrl(url);
            } else {
                setImageUrl(
                    !_.isEmpty(accountLogin.avatar)
                        ? accountLogin.avatar
                        : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/3-anh-dai-dien-trang-inkythuatso-03-15-25-56.jpg'
                );
            }
        };


        return (
            <>
                <a href="/" type="submit" className="btn btn-warning"
                   style={{marginTop: "30px", marginLeft: "150px"}}>
                    Come back home
                </a>

                <div className="container" style={{marginTop: "120px"}}>
                    <div className="d-flex">
                        <div style={avatarStyle}>
                            <img
                                src={imageUrl}
                                height={300}
                                width={300}
                                alt="k thấy gì"
                                className="border rounded-circle"
                                id={'output'}
                            />
                            <input onChange={handleClick} type="file" style={inputImageStyle}/>
                        </div>

                        {imageUrl && ( // Hiển thị ảnh từ input khi đã upload lên
                            <img
                                src={imageUrl}
                                height={300}
                                width={300}
                                alt="k thấy gì"
                                className="border rounded-circle"
                                style={{marginLeft: '-300px'}} // Điều chỉnh vị trí để đè lên avatar
                            />
                        )}

                        <div className="col-8 mt-1 ms-5">

                            <Formik
                                initialValues={initialValues}
                                // validationSchema={registerSchema}
                                onSubmit={(values) => {
                                    handleSubmit(values)
                                }}
                                onReset={(values) => {

                                }}

                                innerRef={(actions) => {
                                    if (actions && actions.touched.province)
                                        setProvinceName(actions.values.province);

                                    if (actions && actions.touched.district)
                                        setDistrictName(actions.values.district);

                                }}
                            >
                                {({errors}) => (
                                    <Form>

                                        <div className="d-flex align-items-center mb-2">
                                            <div className="col-2 text-18">Tên đăng nhập</div>
                                            <div className="col-10">
                                                <Field type="text" id="name" name="name"
                                                       className="form-control form-control py-2" readOnly/>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center mb-2">
                                            <div className="col-2 text-18">Ten tai khoan</div>
                                            <div className="col-10">
                                                <Field type="text" id="username" name="username"
                                                       className="form-control form-control py-2" readOnly/>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center text-18 mb-2"
                                             style={{textAlign: "left"}}>
                                            <div className="col-2">
                                                <span className='text-18'>Địa chỉ</span>
                                            </div>
                                            <div className="col-10">
                                                <div className='row'>
                                                    <div className="col-3">
                                                        <Field as="select" className="form-select" name="province"
                                                               id="province">
                                                            <option value="">{accountLogin.province}</option>
                                                            {!_.isEmpty(provinces) && provinces.map(province => (
                                                                <option key={province.ProvinceID}
                                                                        value={province.ProvinceName}>
                                                                    {province.ProvinceName}
                                                                </option>
                                                            ))}

                                                        </Field>
                                                    </div>

                                                    <div className="col-3 ">
                                                        <Field as="select" className="form-select" id="district"
                                                               name="district">
                                                            <option value="">{accountLogin.district}</option>
                                                            {!_.isEmpty(districts) && districts.map(district => (
                                                                <option key={district.DistrictID}
                                                                        value={district.DistrictName}>
                                                                    {district.DistrictName}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <div className="col-3">
                                                        <Field as="select" className="form-select" id="ward"
                                                               name="ward">
                                                            <option value="">{accountLogin.ward}</option>
                                                            {!_.isEmpty(wards) && wards.map(ward => (
                                                                <option key={ward.WardCode} value={ward.WardName}>
                                                                    {ward.WardName}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>


                                                    <div className="col-3">
                                                        <Field type="text" id="apartmentNumber" name="apartmentNumber"
                                                               className="form-control form-control py-2"
                                                               onInput={handleValueInput}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="d-flex justify-content-center mt-3">
                                            <button type="submit" className="btn btn-primary btn-lg mx-3 px-5">
                                                Save
                                            </button>

                                            <button type="reset" className="btn btn-danger btn-lg px-5">
                                                Delete
                                            </button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>

                        </div>

                    </div>

                    <hr/>

                </div>
            </>
        );
    }
;

export default AccountInformation;