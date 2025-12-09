import React from 'react'
import Addresume from './conponents/Addresume'
import { useUser } from '@clerk/clerk-react'
import Global from '../../service/Global'
import { useEffect, useState } from 'react'
import ResumeCard from './conponents/ResumeCard'
import { FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

function DashboardPage() {
    const { user } = useUser()
    const [resumeList, setResumeList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (user) {
            getResumeList()
        }
    }, [user])

    const getResumeList = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await Global.GetResume(user?.primaryEmailAddress?.emailAddress)
            setResumeList(res.data.data)
        } catch (err) {
            setError('Failed to load resumes. Please try again.')
            console.error('Error fetching resumes:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto p-6 md:p-10 lg:px-20">
                {/* Resume Analyzer Banner */}
                <div className='mb-8'>
                    <div className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                            <div className='text-white flex-1'>
                                <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>
                                    <FileText className='w-6 h-6' />
                                    AI Resume Analyzer
                                </h3>
                                <p className='text-blue-100 text-sm md:text-base'>
                                    Get detailed resume analysis, ATS compatibility score, and personalized improvement suggestions based on job descriptions
                                </p>
                            </div>
                            <a 
                                href='https://resume-analyzer-major.streamlit.app/' 
                                target='_blank' 
                                rel='noopener noreferrer'
                            >
                                <Button 
                                    size='lg'
                                    className='bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all h-12 px-8'
                                >
                                    Analyze Resume
                                    <ExternalLink className='w-4 h-4 ml-2' />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Resumes</h1>
                            <p className="text-gray-600 mt-1">Create and manage your professional resumes</p>
                        </div>
                    </div>
                    
                    {/* Stats Bar */}
                    {!loading && (
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 inline-flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">{resumeList.length}</span>
                            <span className="text-gray-600">Resume{resumeList.length !== 1 ? 's' : ''} Created</span>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-white rounded-xl h-[280px] animate-pulse">
                                <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-red-900 mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-700 mb-4">{error}</p>
                        <button 
                            onClick={getResumeList}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && resumeList.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Resumes Yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start building your professional resume now and land your dream job!
                        </p>
                        <div className="max-w-xs mx-auto">
                            <Addresume />
                        </div>
                    </div>
                )}

                {/* Resume Grid */}
                {!loading && !error && resumeList.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        <Addresume />
                        {resumeList.map((resume, index) => (
                            <ResumeCard 
                                resume={resume} 
                                key={resume.documentId || index} 
                                refreshData={getResumeList} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardPage
