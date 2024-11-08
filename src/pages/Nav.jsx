import React from "react";

const Nav = ({ search, setSearch }) => {
    return (
        <>
            <label htmlFor="searchItem">Search</label>
            <input
                id="searchItem"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    );
};

export default Nav;
