import { useState, useEffect } from 'react';

// import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
// import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5';

import leftArrow from '../../assets/leftArrow.svg'
import rightArrow from '../../assets/rightArrow.svg'
import pause from '../../assets/pause.svg'
import play from '../../assets/play.svg'

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
							{/* { "<<" } */}
							<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:fill-black">
								<path d="M4.71 9.17005L16.3 3.07005C19.05 1.62005 22.04 4.55005 20.65 7.33005L19.03 10.57C18.58 11.47 18.58 12.53 19.03 13.43L20.65 16.67C22.04 19.45 19.05 22.37 16.3 20.93L4.71 14.83C2.43 13.63 2.43 10.37 4.71 9.17005Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
						<button onClick={ togglePlayPause }>
							{
            				    isPlaying ? (
									// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  									// 	<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
									// </svg>
									<svg fill="#000000" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="hover:fill-black">
										<g id="Pause_1" dataname="Pause 1" className="hover:fill-black">
											<g>
											<path d="M8.25,21.937H6.564a2.5,2.5,0,0,1-2.5-2.5V4.563a2.5,2.5,0,0,1,2.5-2.5H8.25a2.5,2.5,0,0,1,2.5,2.5V19.437A2.5,2.5,0,0,1,8.25,21.937ZM6.564,3.063a1.5,1.5,0,0,0-1.5,1.5V19.437a1.5,1.5,0,0,0,1.5,1.5H8.25a1.5,1.5,0,0,0,1.5-1.5V4.563a1.5,1.5,0,0,0-1.5-1.5Z"/>
											<path d="M17.436,21.937H15.75a2.5,2.5,0,0,1-2.5-2.5V4.563a2.5,2.5,0,0,1,2.5-2.5h1.686a2.5,2.5,0,0,1,2.5,2.5V19.437A2.5,2.5,0,0,1,17.436,21.937ZM15.75,3.063a1.5,1.5,0,0,0-1.5,1.5V19.437a1.5,1.5,0,0,0,1.5,1.5h1.686a1.5,1.5,0,0,0,1.5-1.5V4.563a1.5,1.5,0,0,0-1.5-1.5Z"/>
											</g>
										</g>
									</svg>
            				    ) : (
            				        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    				// 	<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  					// </svg>
									<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:fill-black">
										<path d="M6 11.9999V9.32992C6 6.01992 8.35 4.65992 11.22 6.31992L13.53 7.65992L15.84 8.99992C18.71 10.6599 18.71 13.3699 15.84 15.0299L13.53 16.3699L11.22 17.7099C8.35 19.3399 6 17.9899 6 14.6699V11.9999Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								)
            				}
						</button>
			
						<button onClick={ handleNext }>
							{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
							</svg> */}
							{/* ">>" */}
							<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:fill-black">
<path d="M19.29 9.17005L7.70002 3.07005C4.95002 1.62005 1.96002 4.55005 3.35002 7.33005L4.97002 10.57C5.42002 11.47 5.42002 12.53 4.97002 13.43L3.35002 16.67C1.96002 19.45 4.95002 22.37 7.70002 20.93L19.29 14.83C21.57 13.63 21.57 10.37 19.29 9.17005Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
						</button>
					</>
			}
            
        </div>
    );
}

export default Controls;