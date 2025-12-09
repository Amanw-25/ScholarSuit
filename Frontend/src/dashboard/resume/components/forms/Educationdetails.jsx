import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { PlusSquare, MinusSquare, GraduationCap, Building2, Calendar, BookOpen, Trash2 } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import Global from '../../../../../service/Global'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Educationdetails({ enabledNext }) {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [educationList, setEducationList] = useState([
        {
            universityName: "",
            degree: "",
            startDate: "",
            endDate: "",
            major: "",
            description: "",
            currentlyPursuing: false,
        }
    ])
    const [dateErrors, setDateErrors] = useState({})

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        if (resumeInfo?.education && resumeInfo.education.length > 0) {
            setEducationList(resumeInfo.education)
            // Enable next button if education data exists
            enabledNext(true)
        }
    }, [resumeInfo?.education])

    const validateDates = (index, startDate, endDate, currentlyPursuing) => {
        const errors = { ...dateErrors }

        // Skip validation if currently pursuing
        if (currentlyPursuing) {
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

    const AddNewEducation = () => {
        setEducationList([...educationList, { 
            universityName: "", 
            degree: "", 
            startDate: "", 
            endDate: "", 
            major: "", 
            description: "",
            currentlyPursuing: false,
        }])
    }

    const RemoveEducation = () => {
        setEducationList(educationList.slice(0, -1))
    }

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target
        const newEntries = [...educationList]
        
        if (type === 'checkbox') {
            newEntries[index][name] = checked
            // Clear end date if currently pursuing
            if (checked) {
                newEntries[index].endDate = ''
            }
        } else {
            newEntries[index][name] = value
        }
        
        setEducationList(newEntries)
        setResumeInfo({ ...resumeInfo, education: newEntries })

        // Validate dates when date fields change
        if (name === 'startDate' || name === 'endDate' || name === 'currentlyPursuing') {
            validateDates(index, newEntries[index].startDate, newEntries[index].endDate, newEntries[index].currentlyPursuing)
        }
    }

    const onSave = () => {
        // Validate all dates before saving
        let hasErrors = false
        educationList.forEach((edu, index) => {
            if (!validateDates(index, edu.startDate, edu.endDate, edu.currentlyPursuing)) {
                hasErrors = true
            }
        })

        if (hasErrors) {
            toast.error('Please fix date validation errors before saving')
            return
        }

        setLoading(true)
        enabledNext(false)
        const data = {
            data: {
                education: educationList.map(({ id, ...rest }) => ({
                    universityName: rest.universityName || "",
                    degree: rest.degree || "",
                    major: rest.major || "",
                    startDate: rest.startDate || "",
                    endDate: rest.endDate || "",
                    description: rest.description || "",
                    currentlyPursuing: rest.currentlyPursuing || false
                }))
            }
        }
        Global.UpdateResume(params.resumeid, data)
            .then((res) => {
                setLoading(false)
                enabledNext(true)
                toast.success('Education details updated successfully!')
            })
            .catch((err) => {
                console.error('Error updating education details:', err)
                setLoading(false)
                toast.error('Failed to update education details')
            })
    }

    return (
        <div className='bg-white p-8 shadow-xl rounded-2xl border border-gray-100 mt-10'>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>Education</h2>
                    <p className='text-gray-600'>Add your educational background</p>
                </div>
            </div>

            <div className='space-y-6'>
                {educationList?.map((education, index) => (
                    <div key={index} className='bg-gradient-to-br from-gray-50 to-purple-50 border-2 border-gray-200 p-6 rounded-2xl space-y-4 hover:border-primary/50 transition-all'>
                        {/* Education Number Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">Education #{index + 1}</span>
                            </div>
                            {educationList.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        const updated = educationList.filter((_, i) => i !== index)
                                        setEducationList(updated)
                                    }}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* University Name */}
                            <div className='col-span-1 md:col-span-2 space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Building2 className="w-4 h-4 text-primary" />
                                    University / College Name
                                </label>
                                <Input
                                    name='universityName'
                                    onChange={(e) => handleChange(e, index)}
                                    value={education?.universityName}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. Harvard University"
                                />
                            </div>

                            {/* Major */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <BookOpen className="w-4 h-4 text-primary" />
                                    Major / Field of Study
                                </label>
                                <Input
                                    name='major'
                                    onChange={(e) => handleChange(e, index)}
                                    value={education?.major}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. Computer Science"
                                />
                            </div>

                            {/* Degree */}
                            <div className="space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <GraduationCap className="w-4 h-4 text-primary" />
                                    Degree
                                </label>
                                <Input
                                    name='degree'
                                    onChange={(e) => handleChange(e, index)}
                                    value={education?.degree}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. Bachelor's, Master's"
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
                                    value={education?.startDate}
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
                                    value={education?.endDate}
                                    max={today}
                                    disabled={education?.currentlyPursuing}
                                    className={`h-11 text-base border-gray-300 ${dateErrors[`endDate_${index}`] || dateErrors[`dateRange_${index}`] ? 'border-red-500' : ''} ${education?.currentlyPursuing ? 'bg-gray-100' : ''}`}
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
                            </div>

                            {/* Currently Pursuing Checkbox */}
                            <div className='col-span-1 md:col-span-2'>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="currentlyPursuing"
                                        checked={education?.currentlyPursuing || false}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                        I am currently pursuing this degree
                                    </span>
                                </label>
                            </div>

                            {/* Description */}
                            <div className='col-span-1 md:col-span-2 space-y-2'>
                                <label className='text-sm font-semibold text-gray-700'>
                                    Description (Optional)
                                </label>
                                <Textarea
                                    name='description'
                                    onChange={(e) => handleChange(e, index)}
                                    value={education?.description}
                                    className="min-h-[100px] text-base border-gray-300 resize-none"
                                    placeholder="Describe your achievements, relevant coursework, GPA, honors, etc."
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
                        onClick={AddNewEducation}
                    >
                        <PlusSquare className="w-4 h-4 mr-2" />
                        Add Education
                    </Button>
                    {educationList.length > 1 && (
                        <Button
                            variant='outline'
                            className='border-2 border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-all h-11'
                            onClick={RemoveEducation}
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

export default Educationdetails