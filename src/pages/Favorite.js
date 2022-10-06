import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Track from "../components/Track";
import { selectAllFavorites, getStatusFavorites, getErrorFavorites, fetchFavorites } from "../redux/tracksSlice";

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
    
    return (
        <div className="tracks">
            {
                tracksEl
            }
        </div>
    )
}

export default Favorite;