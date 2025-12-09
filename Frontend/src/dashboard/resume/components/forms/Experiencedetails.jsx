import React from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import Global from '../../../../../service/Global'
import { PlusSquare, MinusSquare, Briefcase, Building2, MapPin, Calendar, Trash2 } from 'lucide-react'
import RichTextEditor from './../RichTextEditor'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

function Experiencedetails({ enabledNext }) {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [experienceList, setExperienceList] = useState([
        {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: '',
            currentlyWorking: false,
        }
    ])
    const [dateErrors, setDateErrors] = useState({})

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
            setExperienceList(resumeInfo.experience)
            // Enable next button if experience data exists
            enabledNext(true)
        }
    }, [resumeInfo?.experience])

    const validateDates = (index, startDate, endDate, currentlyWorking) => {
        const errors = { ...dateErrors }
        
        // Skip validation if currently working
        if (currentlyWorking) {
            delete errors[`endDate_${index}`]
            delete errors[`dateRange_${index}`]
            setDateErrors(errors)
            return true
        }

        // Check if end date is in the future
        if (endDate && endDate > today) {
            errors[`endDate_${index}`] = 'End date cannot be in the future'
        } else {
            delete errors[`endDate_${index}`]
        }

        // Check if start date is after end date
        if (startDate && endDate && startDate > endDate) {
            errors[`dateRange_${index}`] = 'Start date cannot be after end date'
        } else {
            delete errors[`dateRange_${index}`]
        }

        setDateErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target
        const updatedExperienceList = [...experienceList]
        
        if (type === 'checkbox') {
            updatedExperienceList[index][name] = checked
            // Clear end date if currently working
            if (checked) {
                updatedExperienceList[index].endDate = ''
            }
        } else {
            updatedExperienceList[index][name] = value
        }
        
        setExperienceList(updatedExperienceList)
        setResumeInfo({ ...resumeInfo, experience: updatedExperienceList })

        // Validate dates when date fields change
        if (name === 'startDate' || name === 'endDate' || name === 'currentlyWorking') {
            validateDates(index, updatedExperienceList[index].startDate, updatedExperienceList[index].endDate, updatedExperienceList[index].currentlyWorking)
        }
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: '',
            currentlyWorking: false,
        }])
    }

    const RemoveExperience = () => {
        const updatedExperienceList = [...experienceList]
        updatedExperienceList.pop()
        setExperienceList(updatedExperienceList)
        setResumeInfo({ ...resumeInfo, experience: updatedExperienceList })
    }

    const handleRichTextEditorChange = (e, name, index) => {
        const newEntries = experienceList.slice()
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)
        setResumeInfo({ ...resumeInfo, experience: newEntries })
    }

    const onSave = () => {
        // Validate all dates before saving
        let hasErrors = false
        experienceList.forEach((exp, index) => {
            if (!validateDates(index, exp.startDate, exp.endDate, exp.currentlyWorking)) {
                hasErrors = true
            }
        })

        if (hasErrors) {
            toast.error('Please fix date validation errors before saving')
            return
        }

        setLoading(true)
        const data = {
            data: {
                experience: experienceList.map(({ id, ...rest }) => ({
                    title: rest.title || "",
                    companyName: rest.companyName || "",
                    city: rest.city || "",
                    state: rest.state || "",
                    startDate: rest.startDate || "",
                    endDate: rest.endDate || "",
                    workSummery: rest.workSummery || "",
                    currentlyWorking: rest.currentlyWorking || false
                }))
            }
        }

        Global.UpdateResume(params?.resumeid, data).then(res => {
            setLoading(false)
            enabledNext(true)
            toast.success('Experience details updated successfully!')
        }, (error) => {
            setLoading(false)
            console.error('Save error:', error)
            toast.error('Failed to update experience')
        })
    }

    return (
        <div className='bg-white p-8 shadow-xl rounded-2xl border border-gray-100 mt-10'>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>Professional Experience</h2>
                    <p className='text-gray-600'>Add your work history and achievements</p>
                </div>
            </div>

            <div className='space-y-6'>
                {experienceList.map((experience, index) => (
                    <div key={index} className='bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 p-6 rounded-2xl space-y-4 hover:border-primary/50 transition-all'>
                        {/* Experience Number Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                <Briefcase className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">Experience #{index + 1}</span>
                            </div>
                            {experienceList.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        const updated = experienceList.filter((_, i) => i !== index)
                                        setExperienceList(updated)
                                    }}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* Position Title */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Briefcase className="w-4 h-4 text-primary" />
                                    Position Title
                                </label>
                                <Input
                                    name='title'
                                    onChange={(e) => handleChange(e, index)}
                                    value={experience?.title}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. Senior Developer"
                                />
                            </div>

                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Building2 className="w-4 h-4 text-primary" />
                                    Company Name
                                </label>
                                <Input
                                    name='companyName'
                                    onChange={(e) => handleChange(e, index)}
                                    value={experience?.companyName}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. Tech Corp"
                                />
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <MapPin className="w-4 h-4 text-primary" />
                                    City
                                </label>
                                <Input
                                    name='city'
                                    onChange={(e) => handleChange(e, index)}
                                    value={experience?.city}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. New York"
                                />
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <MapPin className="w-4 h-4 text-primary" />
                                    State
                                </label>
                                <Input
                                    name='state'
                                    onChange={(e) => handleChange(e, index)}
                                    value={experience?.state}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. NY"
                                />
                            </div>

                            {/* Start Date */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Calendar className="w-4 h-4 text-primary" />
                                    Start Date
                                </label>
                                <Input
                                    type='date'
                                    name='startDate'
                                    onChange={(e) => handleChange(e, index)}
                                    value={experience?.startDate}
                                    max={today}
                                    className="h-11 text-base border-gray-300"
                                />
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Calendar className="w-4 h-4 text-primary" />
                                    End Date
                                </label>
                                <Input
                                    type='date'
                                    name='endDate'
                                    onChange={(e) => handleChange(e, index)}
                                    value={experience?.endDate}
                                    max={today}
                                    disabled={experience?.currentlyWorking}
                                    className={`h-11 text-base border-gray-300 ${dateErrors[`endDate_${index}`] || dateErrors[`dateRange_${index}`] ? 'border-red-500' : ''} ${experience?.currentlyWorking ? 'bg-gray-100' : ''}`}
                                />
                                {dateErrors[`endDate_${index}`] && (
                                    <p className="text-xs text-red-600 flex items-center gap-1">
                                        <span>⚠️</span> {dateErrors[`endDate_${index}`]}
                                    </p>
                                )}
                                {dateErrors[`dateRange_${index}`] && (
                                    <p className="text-xs text-red-600 flex items-center gap-1">
                                        <span>⚠️</span> {dateErrors[`dateRange_${index}`]}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500">Leave blank if currently working here</p>
                            </div>

                            {/* Currently Working Checkbox */}
                            <div className='col-span-1 md:col-span-2'>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="currentlyWorking"
                                        checked={experience?.currentlyWorking || false}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                        I currently work here
                                    </span>
                                </label>
                            </div>

                            {/* Work Summary - Full Width */}
                            <div className='col-span-1 md:col-span-2 space-y-2'>
                                <RichTextEditor
                                    index={index}
                                    defaultValue={experience?.workSummery}
                                    onRichTextEditorChange={(e) => handleRichTextEditorChange(e, 'workSummery', index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-200'>
                <div className='flex gap-3'>
                    <Button
                        variant='outline'
                        className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all h-11'
                        onClick={AddNewExperience}
                    >
                        <PlusSquare className="w-4 h-4 mr-2" />
                        Add Experience
                    </Button>
                    {experienceList.length > 1 && (
                        <Button
                            variant='outline'
                            className='border-2 border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-all h-11'
                            onClick={RemoveExperience}
                        >
                            <MinusSquare className="w-4 h-4 mr-2" />
                            Remove Last
                        </Button>
                    )}
                </div>

                <Button
                    onClick={onSave}
                    disabled={loading || Object.keys(dateErrors).length > 0}
                    className="h-11 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className='animate-spin mr-2' />
                            Saving...
                        </>
                    ) : (
                        'Save & Continue'
                    )}
                </Button>
            </div>
        </div>
    )
}

export default Experiencedetails