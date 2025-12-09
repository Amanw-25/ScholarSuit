import React from 'react'

function SkillPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-sm font-bold mb-2 text-center' style={{ color: resumeInfo?.themeColor }}>Skills</h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            <div className='grid grid-cols-2 gap-3 my-4'>
                {resumeInfo?.skills?.map((skill, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-xs font-bold'>{skill?.name}</h2>
                            <span className='text-[10px] text-gray-600'>{skill?.rating}/5</span>
                        </div>
                        <div className='h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
                            <div 
                                className='h-full rounded-full transition-all duration-300' 
                                style={{ 
                                    width: `${skill?.rating * 20}%`, 
                                    backgroundColor: resumeInfo?.themeColor 
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillPreview