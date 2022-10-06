import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteTrackById, setCurrentTrack, addFavoriteTrack, deleteTrackFromFavorites } from "../redux/tracksSlice";
import { selectUser } from "../redux/authSlice";
import {BsFillPlayFill} from 'react-icons/bs';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';

const Track = ({track}) => {
    const dispatch = useDispatch();

    const favTrack = useSelector((state) => selectFavoriteTrackById(state, track.id));

    const user = useSelector(selectUser);

    return (
        <div className="track">
            <div className="track__img-box">
                <img src={track.cover} alt={track.title + " cover"} className="track__cover" />
            </div>
            <BsFillPlayFill onClick={() => dispatch(setCurrentTrack(track))} className="icon icon--play" />
            {user && (favTrack ? <AiFillStar style={{display: user ? 'block' : ''}} onClick={() => dispatch(deleteTrackFromFavorites({id: track.id}))} className="icon icon--star" /> : <AiOutlineStar style={{display: user ? 'block' : ''}} onClick={() => dispatch(addFavoriteTrack(track))} className="icon icon--star" />)}
            <div className="track__details">
                <h3 className="track__title">{track.title.length < 15 ? track.title : track.title.slice(0,15) + '..'}</h3>
                <span className="track__artist">{track.artist}</span>
            </div>
        </div>
    )
}

export default Track;