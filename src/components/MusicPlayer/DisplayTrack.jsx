import { useState, useRef, useEffect } from 'react'

const DisplayTrack = ({ activeSong }) => {
  const containerRef = useRef(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);  

  useEffect(() => {
    if (containerRef.current) {
      setShouldMarquee(containerRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [activeSong?.name]);

	return (
		<div className="my-2 pl-2 w-full text-left truncate" ref={ containerRef } >
			{ 
				!activeSong ?  
					<>
						<p className="text-xl">No Song</p>
						<p className="text-sm left-0">Unkown Artist</p>
					</>
				:
					<>
						<p className="text-xl mx-3">{ activeSong.name }</p>
						<p className="text-sm mx-3">{ activeSong.artist }</p>
					</>

			}
		</div>
	);
}

export default DisplayTrack;