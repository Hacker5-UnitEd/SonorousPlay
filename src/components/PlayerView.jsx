// import '../App.css';


import MusicPlayer from './MusicPlayer/MusicPlayer'




export default function Player({ playlist, setPlaylist, albumList, node, activeSongIndex, setActiveSongIndex }) { 

  	
  
  return(
      <footer className='container backdrop-blur-md h-[calc(22vh)] bg-white/30 rounded-md absolute bottom-0 left-0 right-0 flex'>
        <MusicPlayer 
			playlist={ playlist }
			setPlaylist={ setPlaylist }
			albumList={ albumList }
			node={ node }
			activeSongIndex={ activeSongIndex }
			setActiveSongIndex={ setActiveSongIndex }
		/>
      </footer>
    );
}