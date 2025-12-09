import React from 'react'

function SummaryPreview({ resumeInfo }) {
    return (
        <div>
            {/* <h2 className='text-xl font-bold'>Summary</h2> */}
            <p className='text-xs font-normal'>{resumeInfo?.summery}</p>
        </div>
    )
}

export default SummaryPreview