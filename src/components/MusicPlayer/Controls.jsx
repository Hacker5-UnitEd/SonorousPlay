import { useState, useEffect } from 'react';

import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5';

const Controls = ({ audioRef, isPlaying, setIsPlaying, activeSongIndex, setActiveSongIndex, playlist, audioURI, isLoading }) => {
	const togglePlayPause = () => {
		setIsPlaying((prev) => !prev);
	}
	
	const handleNext = () => {
		window.URL.revokeObjectURL(audioURI);
		if (activeSongIndex == playlist.length - 1) {
			setActiveSongIndex(0);
			// setActiveSong(playlist[0]);

			setIsPlaying(false);
		} else {
			setActiveSongIndex((prev) => prev + 1);
			// setActiveSong(playlist[activeSongIndex]);

			togglePlayPause();
			setIsPlaying(false);
		}
	}

	const handlePrevious = () => {
		window.URL.revokeObjectURL(audioURI);
		if (activeSongIndex == 0) {
			const lastTrackIndex = playlist.length - 1;
			setActiveSongIndex(lastTrackIndex);
			// setActiveSong(playlist[lastTrackIndex]);
			
			setIsPlaying(false);
		} else {
			setActiveSongIndex((prev) => prev - 1);
			// setActiveSong(playlist[activeSongIndex]);

			setIsPlaying(false);
		}
	}

	useEffect(() => {
		isPlaying ? audioRef.current.play() : audioRef.current.pause();
	}, [isPlaying, audioRef]);
	
    return (
        <div className="flex mt-2 items-center mx-auto justify-around md:w-36 lg:w-72 2xl:w-80">
			{
				isLoading ?
					<>
						<span>Loading Track...</span>
					</>
				:
					<>
						<button onClick={ handlePrevious }>
							<IoPlaySkipBackSharp size={ 30 } />
						</button>
						<button onClick={ togglePlayPause }>
							{
            				    isPlaying ? (
									<BsFillPauseFill size={ 45 } />
            				    ) : (
            				        <BsFillPlayFill size={ 45 } />
								)
            				}
						</button>
			
						<button onClick={ handleNext }>
							<IoPlaySkipForwardSharp size={ 30 } />
						</button>
					</>
			}
            
        </div>
    );
}

export default Controls;