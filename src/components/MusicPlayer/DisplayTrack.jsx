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
						<div class="relative flex overflow-x-hidden">
							<div class="animate-marquee whitespace-nowrap">
								<p className="text-xl">No Song</p>
							</div>

							<div class="absolute top-0 animate-marquee2 whitespace-nowrap">
								<p className="text-xl">No Song</p>
							</div>
						</div>
						
						<div class="relative flex overflow-x-hidden">
							<div class="animate-marquee whitespace-nowrap">
								<p className="text-sm left-0">Unkown Artist</p>
							</div>

							<div class="absolute top-0 animate-marquee2 whitespace-nowrap">
								<p className="text-sm left-0">Unkown Artist</p>
							</div>
						</div>
					</>
				:
					(
						shouldMarquee ? 
							<>
								<div class="relative flex overflow-x-hidden">
									<div class=" animate-marquee whitespace-nowrap">
										<p className="text-xl mx-3">{ activeSong.name }</p>
									</div>

									<div class="absolute top-0 animate-marquee2 whitespace-nowrap">
										<p className="text-xl mx-3">{ activeSong.name }</p>
									</div>
								</div>

								<div class="relative flex overflow-x-hidden">
									<div class=" animate-marquee whitespace-nowrap">
										<p className="text-sm mx-3">{ activeSong.artist }</p>
									</div>

									<div class="absolute top-0 animate-marquee2 whitespace-nowrap">
										<p className="text-sm mx-3">{ activeSong.artist }</p>
									</div>
								</div>
							</>
						:
							<>
								<p className="text-xl mx-3">{ activeSong.name }</p>
								<p className="text-sm mx-3">{ activeSong.artist }</p>
							</>

					)

			}
		</div>
	);
}

export default DisplayTrack;