import { useSelector } from "react-redux";
import { getCurrentTrack } from "../redux/tracksSlice";

const AudioPlayer = () => {
    const currentTrack = useSelector(getCurrentTrack);

    if(!currentTrack) return null;

    return (
        <div className="audioPlayer">
            <img src={currentTrack.cover} alt={currentTrack.title + ' cover'} className="audioPlayer__img" />
            <div className="audioPlayer__details">
                <span className="audioPlayer__title">{currentTrack.title}</span>
                <span className="audioPlayer__artist">{currentTrack.artist}</span>
            </div>
            <audio 
                controls
                src={currentTrack.preview}
                className="audioPlayer__track"
                key={currentTrack.id}
            >
            </audio>
        </div>
    )
}

export default AudioPlayer;