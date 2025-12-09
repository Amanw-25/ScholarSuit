import React, { useState, useEffect } from 'react'
import Personaldetails from './forms/Personaldetails'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Experiencedetails from './forms/Experiencedetails'
import Summarydetails from './forms/Summarydetails'
import Educationdetails from './forms/Educationdetails'
import Skilldetails from './forms/Skilldetails'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import ThemeColor from './ThemeColor'

function FormSection({ activeFormIndex, setActiveFormIndex }) {
    const [activeForm, setActiveForm] = useState(activeFormIndex || 1)
    const [enabledNext, setEnabledNext] = useState(false)
    const params = useParams()

    // Update activeForm when activeFormIndex prop changes
    useEffect(() => {
        if (activeFormIndex) {
            setActiveForm(activeFormIndex)
        }
    }, [activeFormIndex])

    // Update parent state when activeForm changes
    useEffect(() => {
        if (setActiveFormIndex) {
            setActiveFormIndex(activeForm)
        }
    }, [activeForm])

    return (
        <div>
            <div className='flex justify-between items-center'>
                <ThemeColor />
                <div className='flex gap-2'>
                    {activeForm > 1 && <Button onClick={() => setActiveForm(activeForm - 1)}><ArrowLeft /></Button>}
                    {activeForm < 6 && <Button disabled={!enabledNext} onClick={() => setActiveForm(activeForm + 1)}>Next<ArrowRight /></Button>}
                </div>
            </div>
            {activeForm === 1 ? <Personaldetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 2 ? <Summarydetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 3 ? <Experiencedetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 4 ? <Educationdetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 5 ? <Skilldetails enabledNext={(v) => setEnabledNext(v)}/>
            : activeForm === 6 ? <Navigate to={`/my-resume/${params?.resumeid}/view`} />
            : null}
        </div>
    )
}

export default FormSection
