import React from 'react'

function ProfessionalExperiencePreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-sm font-bold mb-2 text-center' style={{ color: resumeInfo?.themeColor }}>Professional Experience</h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold' style={{ color: resumeInfo?.themeColor }}>{experience?.title}</h2>
                    <h2 className='text-xs font-normal flex justify-between' >{experience?.companyName}, {experience?.city}, {experience?.state}
                        <span className='text-xs font-normal'>{experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span>
                    </h2>
                    <div className='text-xs font-normal my-2' dangerouslySetInnerHTML={{ __html: experience?.workSummery }} />
                </div>
            ))}
        </div>
    )
}

export default ProfessionalExperiencePreview