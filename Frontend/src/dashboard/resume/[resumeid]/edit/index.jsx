import { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import FormSection from './../../components/FormSection'
import ResumePreview from './../../components/ResumePreview'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useState } from 'react'
import Global from '../../../../../service/Global'

function EditResume() {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [resumeInfo, setResumeInfo] = useState()
    const [activeFormIndex, setActiveFormIndex] = useState(1)

    useEffect(() => {
        GetResumeInfo()
    }, [])

    useEffect(() => {
        // Check if we need to navigate to skills section (only once when hash is present)
        if (location.hash === '#skills' && resumeInfo) {
            // Set to skills section (index 5: Personal=1, Summary=2, Experience=3, Education=4, Skills=5)
            setActiveFormIndex(5)
            
            // Clear the hash from URL to prevent flickering
            navigate(location.pathname, { replace: true })
        }
    }, [location.hash, resumeInfo])

    const GetResumeInfo = () => {
        Global.GetResumeById(params?.resumeid).then(res => {
            setResumeInfo(res?.data?.data)
        })
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                <FormSection activeFormIndex={activeFormIndex} setActiveFormIndex={setActiveFormIndex} />
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume