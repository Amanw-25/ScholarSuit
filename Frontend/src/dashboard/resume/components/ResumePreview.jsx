import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useContext } from 'react'
import PersonalPreviewDetails from './preview/PersonalPreviewDetails'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'
function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    return (
        <div className='p-14 shadow-lg border-t-[20px] h-full' style={{ borderColor: resumeInfo?.themeColor }}>
            <PersonalPreviewDetails resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <ProfessionalExperiencePreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <SkillPreview resumeInfo={resumeInfo} />
        </div>
        // <div>{resumeInfo.firstName}</div>
    )
}

export default ResumePreview