import { useCallback, useRef, useEffect, useState } from "react";

import { getUrl } from '../../lib/songApi'

const Player = ({ activeSong, audioRef, setDuration, setSeekTime, seekbarRef, isPlaying, node, audioURI, setAudioURI, setIsLoading }) => {

	useEffect(() => {
		(async () => {
			if (activeSong) {
				setIsLoading(true);
				setAudioURI(await getUrl(node, activeSong.path))
				setIsLoading(false);
				console.log(audioURI)
			}
		})();
	}, [node, activeSong]);
	
	// soundAPI()
	
	const playAnimationRef = useRef();
	
	const onLoadedMetadata = () => {
		const seconds = audioRef.current.duration;
		setDuration(seconds);
		seekbarRef.current.max = seconds;
	};

	const repeat = useCallback(() => {
		const currentTime = audioRef.current.currentTime;
		setSeekTime(currentTime);
		seekbarRef.current.value = currentTime;

		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [audioRef, setSeekTime, seekbarRef]);

	useEffect(() => {
		audioRef.current[isPlaying ? "play" : "pause" ](); // freaking JavaScript :-/
		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [isPlaying, audioRef]);
	
    return (
        <audio 
            src={ !activeSong ? "" : audioURI }
			ref={ audioRef }
			onLoadedMetadata={ onLoadedMetadata }
        />
    );
}

export default Player;