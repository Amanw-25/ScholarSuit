import React from 'react'

function PersonalPreviewDetails({ resumeInfo }) {
    return (
        <div>
            <h2 className='text-xl font-bold text-center'>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
            <h2 className='text-sm text-center font-medium'>{resumeInfo?.jobTitle}</h2>
            <h2 className='text-xs text-center font-normal' style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.address}</h2>
            <div className='flex justify-between gap-2'>
                <h2 className='text-xs font-normal' style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.phone}</h2>
                <h2 className='text-xs font-normal' style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.email}</h2>
            </div>
            <hr className='my-2 border-[1.5px]' style={{ borderColor: resumeInfo?.themeColor }} />
        </div>
    )
}

export default PersonalPreviewDetails