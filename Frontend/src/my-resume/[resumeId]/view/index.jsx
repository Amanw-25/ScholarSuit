import React, { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useParams, useNavigate } from 'react-router-dom'
import Global from '../../../../service/Global'
import { RWebShare } from "react-web-share"
import { Download, Share2, ArrowLeft, Edit } from 'lucide-react'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState()
    const params = useParams()
    const navigate = useNavigate()

    const GetResumeInfo = async () => {
        Global.GetResumeById(params?.resumeid).then((res) => {
            setResumeInfo(res?.data?.data)
        })
    }

    const HandleDownload = () => {
        window.print()
    }

    const HandleBackToEdit = () => {
        // Navigate to edit page with hash to scroll to skills section
        navigate(`/dashboard/resume/${params?.resumeid}/edit#skills`)
    }

    useEffect(() => {
        GetResumeInfo()
    }, [])

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='non-print'>
                <Header />
                <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10'>
                    <div className='container mx-auto px-4'>
                        {/* Success Message */}
                        <div className='text-center mb-8 animate-fade-in'>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
                                <span className="text-xl">🎉</span>
                                <span>Resume Created Successfully!</span>
                            </div>
                            <h1 className='text-4xl font-bold text-gray-900 mb-3'>
                                Congratulations!
                            </h1>
                            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                                Your professional resume is ready. Download it as PDF or share it with potential employers.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap justify-center gap-4 mb-10'>
                            <Button 
                                onClick={HandleBackToEdit}
                                variant="outline"
                                className="h-12 px-6 text-base border-2 border-gray-300 hover:border-primary"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Edit
                            </Button>

                            <Button 
                                onClick={HandleDownload}
                                className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </Button>

                            <RWebShare
                                data={{
                                    text: "Check out my professional resume!",
                                    url: `${import.meta.env.VITE_BASE_URL}/my-resume/${params?.resumeid}/view`,
                                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} - Resume`,
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <Button 
                                    variant="outline"
                                    className="h-12 px-8 text-base border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share Resume
                                </Button>
                            </RWebShare>
                        </div>

                        {/* Quick Actions Info */}
                        <div className='grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10'>
                            <div className='bg-white rounded-xl p-4 border border-gray-200 text-center'>
                                <Edit className='w-8 h-8 text-primary mx-auto mb-2' />
                                <h3 className='font-semibold text-gray-900 mb-1'>Edit Resume</h3>
                                <p className='text-xs text-gray-600'>Go back and make changes to your resume</p>
                            </div>
                            <div className='bg-white rounded-xl p-4 border border-gray-200 text-center'>
                                <Download className='w-8 h-8 text-primary mx-auto mb-2' />
                                <h3 className='font-semibold text-gray-900 mb-1'>Download</h3>
                                <p className='text-xs text-gray-600'>Save as PDF for job applications</p>
                            </div>
                            <div className='bg-white rounded-xl p-4 border border-gray-200 text-center'>
                                <Share2 className='w-8 h-8 text-primary mx-auto mb-2' />
                                <h3 className='font-semibold text-gray-900 mb-1'>Share</h3>
                                <p className='text-xs text-gray-600'>Share your resume link with employers</p>
                            </div>
                        </div>

                        {/* Resume Preview */}
                        <div className='max-w-3xl mx-auto'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-4 text-center'>Resume Preview</h2>
                            <div className='bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-200'>
                                <div className='transform scale-90 origin-top'>
                                    <ResumePreview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Preview for Print - Single Page */}
            <div id='print-area' className='print-page'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume