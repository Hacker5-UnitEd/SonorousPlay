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

export default function Songs_list({ playlist, albumList, node, activeSongIndex, setActiveSongIndex }) { 
  return(
      <div className='container h-[calc(47vh)] my-1 backdrop-blur-sm bg-white/30 rounded-md px-10 py-3 overflow-y-scroll no-scrollbar whitespace-nowrap pb-32'>
        <ul>
			{
				playlist.map((song, songIdx) => 
					<Song 
						key={ songIdx } 
						songObj={ song } 
						albumArtPath={ albumList[song.album] } 
						node={ node } 
						isActiveSong={ songIdx == activeSongIndex }  
						currentSongIndex={ songIdx }
						setActiveSongIndex={ setActiveSongIndex }
					/>)
			}
        </ul>
      </div>
    );
}
