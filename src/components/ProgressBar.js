import React from 'react'

function ProgressBar({ width }) {
    return (
        <div className="bar">
            <div style={{width: width + "%"}} className="bar__done"></div>
        </div>
    )
}

export default ProgressBar
