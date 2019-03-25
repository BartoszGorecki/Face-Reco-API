import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {

    return (isSignedIn &&
        (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => onRouteChange('signin')}>Sign Out</button>
            </nav>)
    )
}

export default Navigation