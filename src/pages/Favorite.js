import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Track from "../components/Track";
import { selectAllFavorites, getStatusFavorites, getErrorFavorites, fetchFavorites } from "../redux/tracksSlice";
import { selectUser } from "../redux/authSlice";

const Favorite = () => {
    const dispatch = useDispatch();

    const favorites = useSelector(selectAllFavorites);
    const favoritesStatus = useSelector(getStatusFavorites);
    const favoritesError = useSelector(getErrorFavorites);

    useEffect(() => {
        if(favoritesStatus === 'idle') {
            dispatch(fetchFavorites());
        }
    }, [favoritesStatus, dispatch]);

    let tracksEl = '';
    if(favoritesStatus === 'loading') {
        tracksEl = <Loader />
    } else if(favoritesStatus === 'succeeded') {
        tracksEl = favorites.map(track => (
            <Track track={track} key={track.id} />
        ))
    } else if(favoritesStatus === 'failed') {
        tracksEl = favoritesError;
    }
    
    const user = useSelector(selectUser);
    
    return (
        <div className="tracksPage" style={{gridColumn: user ? "2 / 3" : "1 / 3"}} >
            <div className="tracks" >
                {
                    tracksEl
                }
            </div>
        </div>
    )
}

export default Favorite;