import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setShowPass] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);

    const isShowPassword = () => {
        setShowPass(!isShowPass);
    };


    const handleLogin = () => {

    };

    return (
        <>
            <div className="login-container col-12 d-flex flex-column container" style={{ color: "orange" }}>
                <div className="title fs-2 text-center fw-bold" >Log in</div>
                <div className="text fw-medium mt-4" >Email or Username</div>
                <input type="text"
                    placeholder='Email or username ...'
                    className='mt-2 p-2 border'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className='position-relative'>
                    <input
                        type={isShowPass === true ? "text" : "password"}
                        placeholder='Password'
                        className='mt-2 p-2 border w-100'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={isShowPass === true ? "fa-solid fa-eye position-absolute top-50" : "fa-solid fa-eye-slash position-absolute top-50"}
                        style={{ right: '10px', cursor: 'pointer' }}
                        onClick={isShowPassword}
                    ></i>
                </div>
                <button
                    className="col-12 m-auto mt-4 btn btn-warning"
                    disabled={!email || !password}
                    onClick={() => handleLogin()}
                >{loadingApi && <i className="fa-solid fa-spinner fa-spin"></i>}
                    &nbsp;Đăng nhập</button>

            </div >
        </>
    );
};

export default Login;