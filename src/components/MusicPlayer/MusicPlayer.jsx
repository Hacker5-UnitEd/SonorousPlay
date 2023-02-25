import { useRef, useState, useEffect } from 'react';

import Seekbar from './Seekbar'
import Player from './Player'
import Controls from './Controls'
import DisplayTrack from './DisplayTrack'

import { init, addSong, getUrl } from '../../lib/songApi'





const MusicPlayer = ({ playlist, setPlaylist, node, albumList, activeSongIndex, setActiveSongIndex, isPlaying, setIsPlaying }) => {
	// const [activeSong, setActiveSong] = useState(playlist[activeSongIndex]);
	const [audioURI, setAudioURI] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	
	const [duration, setDuration] = useState(0);
	const [seekTime, setSeekTime] = useState(0);

	const [albumArt, setAlbumArt] = useState();

	const audioRef = useRef();
	const seekbarRef = useRef();

	useEffect(() => {
		(async () => {
			if (playlist[activeSongIndex] && albumList[playlist[activeSongIndex].album]) {
				setAlbumArt(await getUrl(node, albumList[playlist[activeSongIndex].album]))
			}
		})();
	}, [activeSongIndex]);

	
	return (
		<div className="flex content-center p-2 w-full ">
				<div className="rounded-md overflow-hidden content-center">
					<img src={ albumArt } className="h-full w-full"/>
				</div>
			
				<div className="w-full px-[calc(0.5vw)]">

					<div className="overflow-x-auto no-scrollbar">
						<DisplayTrack 
							activeSong={ playlist[activeSongIndex] }
						/>
					</div>
	
				<Seekbar 
					seekbarRef={ seekbarRef }
					seekTime={ seekTime }
					duration={ duration }
					setDuration={ setDuration }
					audioRef={ audioRef }
				/>
	
				<Controls
					audioRef={ audioRef }
					seekbarRef={ seekbarRef }
	 				isPlaying={ isPlaying }
					setIsPlaying={ setIsPlaying }
					activeSongIndex={ activeSongIndex }
					setActiveSongIndex={ setActiveSongIndex }
					playlist={ playlist }
					audioURI={ audioURI }
					isLoading={ isLoading }
				/>
							
				<Player 
					activeSong={ playlist[activeSongIndex] }
					audioRef={ audioRef }
					setDuration={ setDuration }
					setSeekTime={ setSeekTime }
					seekbarRef={ seekbarRef }
					isPlaying={ isPlaying }
					node={ node }
					audioURI={ audioURI }
					setAudioURI={ setAudioURI }
					setIsLoading={ setIsLoading }
				/>
			</div>
		</div>
	);
}

export default MusicPlayer;