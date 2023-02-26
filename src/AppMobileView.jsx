import Upload_box from './components/Upload.jsx';
import Search_box from './components/Search.jsx';
import Songs_list from './components/Song_box.jsx';
import Player from './components/PlayerView.jsx';
// import song from './Components/Songs.jsx';



const AppDesktopView = ({ node, hash, albumList, tempPlaylist, playlist, setPlaylist, activeSongIndex, setActiveSongIndex, isPlaying, setIsPlaying, searchQuery, setSearchQuery, isLoading, setIsLoading, ownFeed }) => {

  
  return (
        <div className={ `grid h-screen w-screen place-items-center bg-black text-center px-0 py-5 bg-[url("src/assets/darkBackground.png")]` }>
         <div className='w-[calc(95vw)] h-full mx-auto my-1 backdrop-blur-sm bg-white/30 rounded-md p-2'>
           <div>
             <Upload_box 
                 node={ node }
                playlist={ playlist }
                setPlaylist={ setPlaylist }
                albumList={ albumList }
                activeSongIndex={ activeSongIndex }
                setActiveSongIndex={ setActiveSongIndex }
                ownFeed={ ownFeed }
             />

             <Search_box 
                 setSearchQuery={ setSearchQuery }
             />

             <Songs_list 
                playlist={ playlist } 
                setPlaylist={ setPlaylist }
                albumList={ albumList }
                node={ node }
                activeSongIndex={ activeSongIndex }
                setActiveSongIndex={ setActiveSongIndex }
                isPlaying={ isPlaying }
                setIsPlaying={ setIsPlaying }
                searchQuery={ searchQuery }
                isLoading={ isLoading }
					    setIsLoading={ setIsLoading }
              ownFeed={ ownFeed }
             />

             {
                (activeSongIndex != -1) ? 
                    <Player 
                        playlist={ playlist }
                        setPlaylist={ setPlaylist }
                        albumList={ albumList }
                        node={ node }
                        activeSongIndex={ activeSongIndex }
                        setActiveSongIndex={ setActiveSongIndex }
                        isPlaying={ isPlaying }
                        setIsPlaying={ setIsPlaying }
                        isLoading={ isLoading }
                        setIsLoading={ setIsLoading }
                    />
                :
                    <></>
             }

           </div>
         </div>
        </div>
      );
}

export default AppDesktopView;