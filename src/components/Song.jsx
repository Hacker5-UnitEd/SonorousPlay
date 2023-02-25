// import '../App.css';
import React from 'react';
import playing from '../assets/playing.svg'

import { useState, useEffect } from 'react'

import { getUrl } from './../lib/songApi'

export default function Songs_list({ node, songObj, albumArtPath, isActiveSong, currentSongIndex, setActiveSongIndex }) { 
  const [albumArt, setAlbumArt] = useState();
	
  useEffect(() => {
  	(async () => {
  		if (albumArtPath) {
  			setAlbumArt(await getUrl(node, albumArtPath))
  		}
  	})();
  }, []);

  return(
          <li>
            <div 
				className={ `w-full h-16 rounded-md ${ isActiveSong ? "bg-slate-400/70" : "bg-white/70"} hover:shadow-[12px_12px_19px_3px_#00000024] p-2 my-3 duration-200 grid grid-cols-12 place-items-center cursor-pointer` }
				onClick={ () => {
							console.log("ayyy")
							setActiveSongIndex(currentSongIndex);
				} }
			>
              
              <div className='col-span-1 h-12 content-start rounded-md overflow-hidden place-self-start'>
                  <img src={ albumArt } className="h-full w-full"></img>
              </div>
              
              <div className='col-span-3 place-self-start'>
                <h3>{ songObj.name }</h3>
                <h4 className='text-sm'>{ songObj.artist }</h4>
              </div>

              <div className='col-span-6'>
              
              </div>

              {isActiveSong?
              <div className='col-span-1 h-6 w-6'>
                    <img src={ playing } alt="Now Playing..."></img>
              </div>
                : 
                <div className='col-span-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-black duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                </div>
               } 

{/*               Menu Button */}
              <div className='col-span-1 group/item relative' >
                <button className="group/edit group-hover/opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>

{/*                 Menu Dropdown */}
                <div className='group/edit invisible group-hover/item:visible absolute text-xs bg-white p-1 rounded-md border-solid border-slate-600 border z-10 w-24 cursor-pointer'>
                  <ul>
                    <li>Add to playlist</li>
                    <li>Add to playlist</li>
                    <li>Add to playlist</li>
                    <li>Add to playlist</li>
                  </ul>
                </div>
                
              </div>
            </div>
			    </li>
    );
}
