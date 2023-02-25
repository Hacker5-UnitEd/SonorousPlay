// import '../App.css';


import MusicPlayer from './MusicPlayer/MusicPlayer'




export default function Player({ playlist, setPlaylist, albumList, node, activeSongIndex, setActiveSongIndex, isPlaying, setIsPlaying }) { 

  	
  
  return(
	<div className='mt-0 border-t'>
      <footer className='container backdrop-blur-md h-[calc(22vh)] bg-white/30 rounded-md rounded-t-none flex'>
        <MusicPlayer 
			playlist={ playlist }
			setPlaylist={ setPlaylist }
			albumList={ albumList }
			node={ node }
			activeSongIndex={ activeSongIndex }
			setActiveSongIndex={ setActiveSongIndex }
			isPlaying={ isPlaying }
			setIsPlaying={ setIsPlaying }
		/>
      </footer>
	</div>
    );
}


// absolute bottom-0 left-0 right-0