import { useState, useEffect } from 'react';

// import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
// import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5';

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
							{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
							</svg> */}
							{ "<<" }
						</button>
						<button onClick={ togglePlayPause }>
							{
            				    isPlaying ? (
									// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  									// 	<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
									// </svg>
									<p>{ "Kick" }</p>
            				    ) : (
            				        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    				// 	<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  					// </svg>
									  <p>{ "Pl" }</p>
								)
            				}
						</button>
			
						<button onClick={ handleNext }>
							{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
							</svg> */}
							{ ">>" }
						</button>
					</>
			}
            
        </div>
    );
}

export default Controls;