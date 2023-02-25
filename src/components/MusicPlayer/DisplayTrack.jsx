const DisplayTrack = ({ activeSong }) => {
	return (
		<div className="my-2 w-min truncate">
			{ 
				!activeSong ?  
					<>
						<p className="text-xl">No Song</p>
						<p className="text-sm left-0">Unkown Artist</p>
					</>
				:
					<>
						<p className="text-xl">{ activeSong.name }</p>
						<p className="text-sm">{ activeSong.artist }</p>
					</>
			}
		</div>
	);
}

export default DisplayTrack;