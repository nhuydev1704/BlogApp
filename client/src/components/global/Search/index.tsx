import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';


const Search = (props: any) => {
    const [valueSearch, setValueSearch] = useState('')

    return (
        <div className={props.classes.search}>
            <div className={props.classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: props.classes.inputRoot,
                    input: props.classes.inputInput,
                }}
                value={valueSearch}
                onChange={(item) => setValueSearch(item.target.value)}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

export default Search
