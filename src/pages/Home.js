import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

import TracksList from "../components/TracksList";

const Home = () => {
    const user = useSelector(selectUser);

    return (
        <div className="tracksPage" style={{gridColumn: user ? "2 / 3" : "1 / 3"}} >
            <TracksList />
        </div>
    )
}

export default Home;