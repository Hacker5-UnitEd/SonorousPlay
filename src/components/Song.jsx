// import '../App.css';
import React from 'react';
import playing from '../assets/playing.svg'

import { useState, useEffect } from 'react'

import { addRemoteSong, getUrl, delSong } from './../lib/songApi'
import SonorusLogo from '../assets/SonorusLogo.svg'
import deleteButton from '../assets/delete.svg'


export default function Songs_list({ node, songObj, albumArtPath, isActiveSong, currentSongIndex, setActiveSongIndex, isPlaying, setIsPlaying, isLoading, ownFeed, playlist, setPlaylist }) { 
  const [albumArt, setAlbumArt] = useState(-1);
	
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
				className={ `w-full h-16 rounded-md ${ isActiveSong ? "bg-gradient-to-r from-cyan-500 to-blue-700" : "bg-white/70"} hover:shadow-[12px_12px_19px_3px_#00000024] p-2 mb-3 duration-200 grid grid-cols-12 place-items-center cursor-pointer` }
				onClick={ () => {
							// console.log("ayyy")
							setActiveSongIndex(songObj.id);
              setIsPlaying(false);
              if (isActiveSong && !isLoading) {
                setIsPlaying(true);
              }
              // setIsPlaying(true);
				} }
			>
              
              <div className='col-span-1 h-12 content-start rounded-md overflow-hidden place-self-start w-0 sm:w-auto'>
                  <img src={ albumArt } className="h-full w-full"></img>
              </div>
              
              <div className='pl-2 col-span-3 place-self-start text-left truncate'>
                <h3>{ songObj.name }</h3>
                <h4 className='text-sm'>{ songObj.artist }</h4>
              </div>

              <div className='col-span-6'>
              
              </div>

              {
                (isActiveSong && isPlaying) ?
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

              <div className='col-span-1 group/item relative align-middle' >
                {
                  !ownFeed ?
                  <button 
                  className="group/edit group-hover/opacity-70"
                  onClick={ async (e) => {
                    e.stopPropagation();
                    await addRemoteSong(node, songObj.path, window.jsmediatags);
                  } }
                >
                <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.44 8.8999C20.04 9.2099 21.51 11.0599 21.51 15.1099V15.2399C21.51 19.7099 19.72 21.4999 15.25 21.4999H8.73998C4.26998 21.4999 2.47998 19.7099 2.47998 15.2399V15.1099C2.47998 11.0899 3.92998 9.2399 7.46998 8.9099" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V14.88" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.35 12.6499L12 15.9999L8.65002 12.6499" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button> 
                :
                  <button
                    type="button"
                    onClick={ async (e) => {
                        e.stopPropagation();
                        console.log(`Delete ${songObj.name}`)
                        delSong(node, songObj.path)
                        // setPlaylist((await getList(node))[1])
                        window.location.reload();
                    } }
                  >
                    <img src={ deleteButton } width="25" height="25" ></img>
                  </button> 
                }
                            
              </div>

            </div>
			    </li>
    );
}
