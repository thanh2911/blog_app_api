import React, { useState } from 'react'

const Search = () => {

    const [search,setSearch] = useState('');

    // console.log(search);
    

  return (
    <div className="search">
        <input 
            type="text" 
            value={search}
            placeholder='Enter your search...'
            onChange={e => setSearch(e.target.value)}
        />
    </div>
  )
}

export default Search