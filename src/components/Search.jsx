// import '../App.css';

export default function Search_box({ setSearchQuery }) { 
  return(
      <div className='container h-full my-1 backdrop-blur-sm bg-white/30 rounded-md px-10 py-3'>
          <input 
            placeholder='Search the song'
            id='hash_id'
            type={'text'} 
            onChange={ event => setSearchQuery(event.target.value) }
            className="w-full col-span-4 h-8 rounded-md bg-white focus:shadow-[12px_12px_19px_3px_#00000024] p-2 focus:outline-0 duration-200"></input>
      </div>
    );
}