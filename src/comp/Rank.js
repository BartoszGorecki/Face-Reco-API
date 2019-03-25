import React from 'react'

const Rank = ({ user }) => {

    return (
        <div className='rank'>
            <span>{user.name}, your current rank is: </span><span>{user.entries}</span>
        </div>
    )
}

export default Rank