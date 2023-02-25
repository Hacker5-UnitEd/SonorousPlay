const Seekbar = ({ seekbarRef,seekTime, duration, audioRef }) => {
	const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;
	
	const handleSeekbarChange = () => {
		audioRef.current.currentTime = seekbarRef.current.value
	};
	
	return (
		<div className="flex flex-row items-center w-full">
			<p>{ getTime(seekTime) }</p>
			<input 
				type="range"
				step="any"
				defaultValue={ 0 }
				className="md:block h-1 mx-1 rounded-lg w-full cursor-pointer"
				ref={ seekbarRef }
				onChange={ handleSeekbarChange }
			/>
			<p>{ getTime(duration) }</p>
		</div>
	);
}

export default Seekbar;