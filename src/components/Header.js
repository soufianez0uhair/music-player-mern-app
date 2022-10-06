import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTracks, deleteAllFavorites} from '../redux/tracksSlice';
import { selectUser, logOut } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.gif';
import {AiOutlineSearch} from 'react-icons/ai';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [term, setTerm] = useState('');

    function handleChange(e) {
        const {value} = e.target;

        setTerm(value);
    }

    const [requestStatus, setRequestStatus] = useState('idle');

    function handleSubmit(e) {
        e.preventDefault();

        if(requestStatus === 'idle') {
            try {
                setRequestStatus('pending');
                dispatch(fetchTracks(term));
            } catch(err) {
                alert(err.message);
            } finally {
                setRequestStatus('idle');
                setTerm('');
                navigate('/');
            }
        }
    }

    const user = useSelector(selectUser);

    function handleLogOut() {
        dispatch(logOut());
        dispatch(deleteAllFavorites())
    }

    return (
        <header className="header">
            <Link to="/" ><img src={Logo} alt="logo gif" className="logo" /></Link>
            <form onSubmit={(e) => handleSubmit(e)} className="search">
                <AiOutlineSearch className="icon icon--search" />                
                <input type="text" placeholder="Search.." value={term} onChange={(e) => handleChange(e)} className="search__input" />
            </form>
            {user ? <div className="header__links">
                    <span className="header__name">Hi, <b>{user.name}</b></span>
                    <Link to="/" className="header__link mobile">Home</Link>
                    <Link to="/favorite" className="header__link mobile">Favorites</Link>
                    <span className="header__link" onClick={() => dispatch(handleLogOut())} >Logout</span>
                </div> : <div className="header__links">
                    <Link to="/login" className="header__link">Login</Link>
                    <Link to="/register" className="header__link">Register</Link>
                </div> }
        </header>
    )
}

export default Header;