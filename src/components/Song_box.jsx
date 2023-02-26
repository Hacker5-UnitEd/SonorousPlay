// import '../App.css';
import React from 'react';
import Song from './Song.jsx'


// const song = () => {
//   return(
//             <div className="w-full col-span-4 h-8 rounded-md bg-white focus:shadow-[12px_12px_19px_3px_#00000024] p-2 m-2 focus:outline-0 duration-200">
            //   fdh
            // </div>   
//   );
// }

export default function Songs_list({ playlist, albumList, node, activeSongIndex, setActiveSongIndex, isPlaying, setIsPlaying, searchQuery, isLoading, setIsLoading }) { 
  return(
      <div className='container h-[calc(49vh)] mt-1 backdrop-blur-sm bg-white/30 rounded-md rounded-b-none sm:px-10 p-1 p-3 overflow-y-scroll no-scrollbar whitespace-nowrap'>
        <ul>
			{
				playlist.filter(song => {
					if (searchQuery == "") {
						return song;
					} else if (song.name.toLowerCase().includes(searchQuery.toLowerCase())) {
						return song;
					}
				}).map((song, songIdx) => 
					<Song 
						key={ songIdx } 
						songObj={ song } 
						albumArtPath={ albumList[song.album] } 
						node={ node } 
						isActiveSong={ song.id == activeSongIndex }  // the current song's index in the playlist must match the active song index
						currentSongIndex={ song.id }
						setActiveSongIndex={ setActiveSongIndex }
						isPlaying={ isPlaying }
						setIsPlaying={ setIsPlaying }
						isLoading={ isLoading }
					/>)
			}
        </ul>
      </div>
    );
}
