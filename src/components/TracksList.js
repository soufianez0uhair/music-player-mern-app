import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTracks, getStatusTracks, getErrorTracks, fetchTracks, fetchFavorites } from "../redux/tracksSlice";
import { selectUser } from "../redux/authSlice";

import Loader from "./Loader";
import Track from "./Track";

const TracksList = () => {
    const dispatch = useDispatch();

    const tracks = useSelector(selectAllTracks);
    const tracksStatus = useSelector(getStatusTracks);
    const tracksError = useSelector(getErrorTracks);

    useEffect(() => {
        if(tracksStatus === 'idle') {
            dispatch(fetchTracks())
        }
    }, [tracksStatus, dispatch]);

    let tracksEl = '';
    if(tracksStatus === 'loading') {
        tracksEl = <Loader />
    } else if(tracksStatus === 'succeeded') {
        tracksEl = tracks.map(track => (
            <Track track={track} key={track.id} />
        ))
    } else if(tracksStatus === 'failed') {
        tracksEl = tracksError;
    }

    const user = useSelector(selectUser);

    useEffect(() => {
        if(user) {
            dispatch(fetchFavorites());
        }
    }, [user, dispatch]);

    return (
        <div className="tracks" >
            {
                tracksEl
            }
        </div>
    )
}

export default TracksList;