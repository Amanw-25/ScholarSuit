import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, User, Briefcase, MapPin, Phone, Mail } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Global from './../../../../../service/Global'
import { toast } from 'sonner'

function PersonalDetail({ enabledNext }) {
    const params = useParams()
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(false)
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')

    // Enable next button if data already exists
    useEffect(() => {
        if (resumeInfo?.firstName && resumeInfo?.email) {
            enabledNext(true)
        }
    }, [resumeInfo])

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/
        return phoneRegex.test(phone)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleInputChange = (e) => {
        enabledNext(false)
        const { name, value } = e.target

        // Phone validation
        if (name === 'phone') {
            if (value && !validatePhone(value)) {
                setPhoneError('Phone number must be exactly 10 digits')
            } else {
                setPhoneError('')
            }
        }

        // Email validation
        if (name === 'email') {
            if (value && !validateEmail(value)) {
                setEmailError('Please enter a valid email address')
            } else {
                setEmailError('')
            }
        }

        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    const onSave = (e) => {
        e.preventDefault()

        // Final validation before save
        if (formData?.phone && !validatePhone(formData.phone)) {
            toast.error('Please enter a valid 10-digit phone number')
            return
        }

        if (formData?.email && !validateEmail(formData.email)) {
            toast.error('Please enter a valid email address')
            return
        }

        setLoading(true)
        const data = {
            data: {
                firstName: formData?.firstName || resumeInfo?.firstName || "",
                lastName: formData?.lastName || resumeInfo?.lastName || "",
                jobTitle: formData?.jobTitle || resumeInfo?.jobTitle || "",
                address: formData?.address || resumeInfo?.address || "",
                phone: formData?.phone || resumeInfo?.phone || "",
                email: formData?.email || resumeInfo?.email || ""
            }
        }
        Global.UpdateResume(params?.resumeid, data).then(resp => {
            enabledNext(true)
            setLoading(false)
            toast.success("Personal details updated successfully!")
        }, (error) => {
            setLoading(false)
            toast.error("Failed to update details")
        })
    }

    return (
        <div className='bg-white p-8 shadow-xl rounded-2xl border border-gray-100 mt-10'>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>Personal Details</h2>
                    <p className='text-gray-600'>Let's start with your basic information</p>
                </div>
            </div>

            <form onSubmit={onSave} className="space-y-6">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* First Name */}
                    <div className="space-y-2">
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <User className="w-4 h-4 text-primary" />
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            name="firstName" 
                            defaultValue={resumeInfo?.firstName} 
                            required 
                            onChange={handleInputChange}
                            className="h-12 text-base border-gray-300 focus:border-primary"
                            placeholder="John"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <User className="w-4 h-4 text-primary" />
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            name="lastName" 
                            required 
                            onChange={handleInputChange}
                            defaultValue={resumeInfo?.lastName}
                            className="h-12 text-base border-gray-300 focus:border-primary"
                            placeholder="Doe"
                        />
                    </div>

                    {/* Job Title */}
                    <div className='col-span-1 md:col-span-2 space-y-2'>
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <Briefcase className="w-4 h-4 text-primary" />
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            name="jobTitle" 
                            required
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleInputChange}
                            className="h-12 text-base border-gray-300 focus:border-primary"
                            placeholder="e.g. Full Stack Developer"
                        />
                    </div>

                    {/* Address */}
                    <div className='col-span-1 md:col-span-2 space-y-2'>
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <MapPin className="w-4 h-4 text-primary" />
                            Address <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            name="address" 
                            required
                            defaultValue={resumeInfo?.address}
                            onChange={handleInputChange}
                            className="h-12 text-base border-gray-300 focus:border-primary"
                            placeholder="123 Main St, City, State, ZIP"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <Phone className="w-4 h-4 text-primary" />
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            name="phone" 
                            type="tel"
                            required
                            defaultValue={resumeInfo?.phone}
                            onChange={handleInputChange}
                            className={`h-12 text-base border-gray-300 focus:border-primary ${phoneError ? 'border-red-500' : ''}`}
                            placeholder="1234567890"
                            maxLength={10}
                            pattern="[0-9]{10}"
                        />
                        {phoneError && (
                            <p className="text-xs text-red-600 flex items-center gap-1">
                                <span>⚠️</span> {phoneError}
                            </p>
                        )}
                        <p className="text-xs text-gray-500">Enter 10-digit phone number without spaces or dashes</p>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                            <Mail className="w-4 h-4 text-primary" />
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            name="email" 
                            type="email"
                            required
                            defaultValue={resumeInfo?.email}
                            onChange={handleInputChange}
                            className={`h-12 text-base border-gray-300 focus:border-primary ${emailError ? 'border-red-500' : ''}`}
                            placeholder="john.doe@example.com"
                        />
                        {emailError && (
                            <p className="text-xs text-red-600 flex items-center gap-1">
                                <span>⚠️</span> {emailError}
                            </p>
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-900">
                        💡 <strong>Tip:</strong> Make sure all information is accurate and up-to-date for the best results.
                    </p>
                </div>

                {/* Save Button */}
                <div className='flex justify-end pt-4'>
                    <Button 
                        type="submit"
                        disabled={loading || phoneError || emailError}
                        className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className='animate-spin mr-2' />
                                Saving...
                            </>
                        ) : (
                            'Save & Continue'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail