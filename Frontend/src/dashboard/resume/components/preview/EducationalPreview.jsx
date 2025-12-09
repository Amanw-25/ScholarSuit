import React from 'react'

function EducationalPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-sm font-bold mb-2 text-center' style={{ color: resumeInfo?.themeColor }}>Education</h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.education?.map((education, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold' style={{ color: resumeInfo?.themeColor }}>{education?.universityName}</h2>
                    <h2 className='text-xs font-normal flex justify-between'>
                        {education?.degree} in {education?.major}
                        <span className='text-xs font-normal'>
                            {education?.startDate} - {education?.currentlyPursuing ? 'Present' : (education?.endDate || 'Present')}
                        </span>
                    </h2>
                    <p className='text-xs font-normal my-2'>{education?.description}</p>
                </div>
            ))}
        </div>
    )
}

export default EducationalPreview