
import { useState } from 'react';

import Upload_box from './components/Upload.jsx';
import Search_box from './components/Search.jsx';
import Songs_list from './components/Song_box.jsx';
import Player from './components/PlayerView.jsx';
// import song from './Components/Songs.jsx';

import { init, getList } from './lib/songApi'
// import bgImg from './assets/darkBackground.png'

const node = await init();
console.log(node)

const [albumList, tempPlaylist] = await getList(node)



export default function App() {
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [activeSongIndex, setActiveSongIndex] = useState(-1); // set to -1 for final 

  return (
    <div className={ `grid h-screen w-screen place-items-center bg-black text-center px-20 py-5 bg-[url("https://tailwind-ui.hacker5united.repl.co/src/assets/darkBackground.png")]` }>
     <div className='w-[calc(70vw)] h-full mx-auto my-1 backdrop-blur-sm bg-white/30 rounded-md p-2'>
       <div>
         <Upload_box 
		 	node={ node }
			playlist={ playlist }
			setPlaylist={ setPlaylist }
			albumList={ albumList }
			activeSongIndex={ activeSongIndex }
			setActiveSongIndex={ setActiveSongIndex }
		 />
         <Search_box />
         <Songs_list 
			 playlist={ playlist } 
			 albumList={ albumList }
			 node={ node }
			 activeSongIndex={ activeSongIndex }
			 setActiveSongIndex={ setActiveSongIndex }
		 />
         <Player 
			playlist={ playlist }
			setPlaylist={ setPlaylist }
			albumList={ albumList }
			node={ node }
			activeSongIndex={ activeSongIndex }
			setActiveSongIndex={ setActiveSongIndex }
		 />
       </div>
     </div>
    </div>
  )
}


// bg-gradient-to-br from-purple-500 to-pink-500