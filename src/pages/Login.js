import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatusAuth, getErrorAuth, loginUser } from "../redux/authSlice";

import Loader from "../components/Loader";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const authStatus = useSelector(getStatusAuth);
    const authError = useSelector(getErrorAuth);

    useEffect(() => {
        if(authStatus === 'pending') {
            return <Loader />
        } else if(authStatus === 'succeeded') {
            navigate('/');
        }
    }, [authStatus, dispatch]);
    
    const canSave = [user.email, user.password].every(Boolean);

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            try {
                dispatch(loginUser(user));
            } finally {
                setUser({
                    ...user,
                    password: ''
                })
            }
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="auth">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={user.email} onChange={(e) => handleChange(e)} className="auth__input" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={user.password} onChange={(e) => handleChange(e)} className="auth__input" />
            <button className="btn btn--auth">Login</button>
            {authError && <div className="auth__error">{authError}</div>}
        </form>
    )
}

export default Login;