import { Link } from "react-router-dom";

import {AiOutlineHome, AiOutlineStar} from 'react-icons/ai';

const Menu = () => {
    return (
        <div className="menu">
            <h1 className="menu__title">DOGEPLAYER</h1>
            <ul className="menu__ul">
                <Link to="/" className="menu__link"><AiOutlineHome className="icon icon--menu" /> <span>Home</span></Link>
                <Link to="/favorite" className="menu__link"><AiOutlineStar className="icon icon--menu" /> <span>Favorite</span></Link>
            </ul>
        </div>
    )
}

export default Menu;