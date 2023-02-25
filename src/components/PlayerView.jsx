// import '../App.css';


import MusicPlayer from './MusicPlayer/MusicPlayer'




export default function Player({ playlist, setPlaylist, albumList, node, activeSongIndex, setActiveSongIndex, isPlaying, setIsPlaying }) { 

  	
  
  return(
	<div className='mt-0 '>
      <footer className='container backdrop-blur-2xl h-[calc(22vh)] bg-white/50 rounded-md rounded-t-none flex bottom-0'>
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