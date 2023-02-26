
import { useState, useEffect } from 'react';

import AppDesktopView from './AppDesktopView'
import AppMobileView from './AppMobileView'




import { init, getList, getHashLocal, getListFromHash } from './lib/songApi'
// import bgImg from './assets/darkBackground.png'

const node = await init();
// console.log(new TextDecoder().decode((await node.files.stat('/')).cid.bytes))
console.log(await getHashLocal(node))


const hash = window.location.hash.slice(1, window.location.hash.length);

const [albumList, tempPlaylist] = hash ? (await getListFromHash(hash)) : (await getList(node))



export default function App() {
	const [playlist, setPlaylist] = useState(tempPlaylist);
	const [activeSongIndex, setActiveSongIndex] = useState(-1); // set to -1 for final 
	const [isPlaying, setIsPlaying] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [isMobile, setIsMobile] = useState(window.innerWidth < 720)


		if (isMobile) {
			return <AppMobileView 
					node={ node } 
					hash={ hash } 
					albumList={ albumList } 
					tempPlaylist={ tempPlaylist } 
					playlist={ playlist } 
					setPlaylist={ setPlaylist } 
					activeSongIndex={ activeSongIndex } 
					setActiveSongIndex={ setActiveSongIndex } 
					isPlaying={ isPlaying } 
					setIsPlaying={ setIsPlaying } 
					searchQuery={ searchQuery } 
					setSearchQuery={ setSearchQuery }
					isLoading={ isLoading }
					setIsLoading={ setIsLoading }
				/>	
		} else {
			return <AppDesktopView 
					node={ node } 
					hash={ hash } 
					albumList={ albumList } 
					tempPlaylist={ tempPlaylist } 
					playlist={ playlist } 
					setPlaylist={ setPlaylist } 
					activeSongIndex={ activeSongIndex } 
					setActiveSongIndex={ setActiveSongIndex } 
					isPlaying={ isPlaying } 
					setIsPlaying={ setIsPlaying } 
					searchQuery={ searchQuery } 
					setSearchQuery={ setSearchQuery }
					isLoading={ isLoading }
					setIsLoading={ setIsLoading }
			/>
		}


			

				
	

}


// bg-gradient-to-br from-purple-500 to-pink-500