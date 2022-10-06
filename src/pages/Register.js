import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStatusAuth, getErrorAuth, registerUser } from "../redux/authSlice";
import validator from 'validator';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const authStatus = useSelector(getStatusAuth);
    const authError = useSelector(getErrorAuth);

    useEffect(() => {
        if(authStatus === 'succeeded') {
            navigate('/');
        }
    }, [authStatus, dispatch]);

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const canSave = [user.name, user.email, user.password].every(Boolean) && user.password && user.password === user.password2;

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            try {
                dispatch(registerUser({name: user.name, email: user.email, password: user.password}));
            } finally {
                setUser({
                    ...user,
                    password: '',
                    password2: ''
                })
            }
        }
    }

    const match = user.password && validator.isStrongPassword(user.password) && user.password === user.password2;
    
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="auth">
            <label htmlFor="name">Full name</label>
            <input type="text" name="name" id="name" value={user.name} onChange={(e) => handleChange(e)} className="auth__input" />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={user.email} onChange={(e) => handleChange(e)} className="auth__input" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={user.password} onChange={(e) => handleChange(e)} className="auth__input" style={{border: !user.password ? '' : match ? '.1rem solid green' : '.1rem solid red'}} />
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" id="password2" value={user.password2} onChange={(e) => handleChange(e)} style={{border: !user.password ? '' : match ? '.1rem solid green' : '.1rem solid red'}} className="auth__input" />
            <button className="btn btn--auth">Register</button>
            {authError && <div className="auth__error">{authError}</div> }
        </form>
    )
}

export default Register;