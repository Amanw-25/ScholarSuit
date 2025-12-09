import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Global from './../../../../../service/Global'
import { toast } from 'sonner'
import { LoaderCircle, Brain, FileText, Sparkles, Check } from 'lucide-react'
import { AIChatSession } from './../../../../../service/ALmodel'

const prompt = "Job Title: {jobTitle}, depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience level and summary with experience level for fresher,mid level and experienced give me the data in the form of an object which has a key 'result' which has the value array of objects in object there are two keys experience_level and summary and only give the data"

function Summarydetails({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [AIGeneratedSummaryList, setAIGeneratedSummaryList] = useState()

    useEffect(() => {
        summary && setResumeInfo({ ...resumeInfo, summery: summary })
    }, [summary])

    // Enable next button if summary already exists
    useEffect(() => {
        if (resumeInfo?.summery) {
            setSummary(resumeInfo.summery)
            enabledNext(true)
        }
    }, [resumeInfo])

    const generateSummaryFromAI = async () => {
        // Validate job title exists
        if (!resumeInfo?.jobTitle) {
            toast.error('Please enter a job title first in Personal Details section')
            return
        }

        console.log('=== AI Generation Started ===')
        console.log('Job Title:', resumeInfo?.jobTitle)
        
        setLoading(true)
        setAIGeneratedSummaryList(null) // Clear previous results
        
        try {
            const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle)
            console.log('🚀 Sending AI request with prompt:', PROMPT)
            console.log('⏳ Waiting for AI response...')
            
            const resp = await AIChatSession.sendMessage(PROMPT)
            
            console.log('📦 Raw response object:', resp)
            
            const responseText = resp.response.text()
            
            console.log('✅ AI Response text received:', responseText)
            console.log('📝 Response length:', responseText?.length)
            
            // Parse the response
            const parsedResponse = JSON.parse(responseText)
            
            console.log('✅ Parsed response:', parsedResponse)
            
            // Validate response structure
            if (!parsedResponse.result || !Array.isArray(parsedResponse.result)) {
                console.error('❌ Invalid response structure:', parsedResponse)
                throw new Error('Invalid AI response format')
            }
            
            console.log('✅ Response validation passed')
            console.log('📊 Number of summaries generated:', parsedResponse.result.length)
            
            setAIGeneratedSummaryList(parsedResponse)
            toast.success('✨ AI summaries generated successfully!')
            
            console.log('=== AI Generation Completed Successfully ===')
            
        } catch (error) {
            console.error('=== AI Generation Failed ===')
            console.error('❌ Error type:', error.name)
            console.error('❌ Error message:', error.message)
            console.error('❌ Full error:', error)
            console.error('❌ Error stack:', error.stack)
            
            // More specific error messages
            if (error.message?.includes('API key')) {
                toast.error('API key is invalid. Please check your configuration.')
            } else if (error.message?.includes('JSON')) {
                toast.error('Failed to parse AI response. The response format was invalid.')
            } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
                toast.error('Network error. Please check your internet connection.')
            } else {
                toast.error(`Failed to generate AI summaries: ${error.message}`)
            }
        } finally {
            setLoading(false)
            console.log('=== AI Generation Process Ended ===')
        }
    }

    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            data: {
                summery: summary || resumeInfo?.summery || ""
            }
        }
        Global.UpdateResume(params?.resumeid, data).then(resp => {
            enabledNext(true)
            setLoading(false)
            toast.success("Summary updated successfully!")
        }, (error) => {
            setLoading(false)
            toast.error("Failed to update summary")
        })
    }

    const selectedSummary = (element) => {
        const selected = AIGeneratedSummaryList?.result?.find((item) => item?.experience_level === element)
        setSummary(selected?.summary)
    }

    return (
        <div className='bg-white p-8 shadow-xl rounded-2xl border border-gray-100 mt-10'>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>Professional Summary</h2>
                    <p className='text-gray-600'>Write a compelling summary about yourself</p>
                </div>
            </div>

            <form onSubmit={onSave} className="space-y-6">
                <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                        <label htmlFor='summary' className='text-sm font-semibold text-gray-700'>
                            Summary <span className="text-red-500">*</span>
                        </label>
                        <Button 
                            variant='outline' 
                            onClick={(e) => {
                                e.preventDefault()
                                generateSummaryFromAI()
                            }}
                            size='sm' 
                            type='button' 
                            className='border-primary text-primary hover:bg-primary hover:text-white transition-all'
                            disabled={loading || !resumeInfo?.jobTitle}
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle className='h-4 w-4 animate-spin mr-2' />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className='h-4 w-4 mr-2' />
                                    Generate with AI
                                </>
                            )}
                        </Button>
                    </div>

                    <Textarea 
                        id='summary' 
                        value={resumeInfo?.summery || summary} 
                        required 
                        onChange={(e) => setSummary(e.target.value)} 
                        className='min-h-[180px] text-base border-gray-300 focus:border-primary resize-none' 
                        placeholder='Write a brief professional summary highlighting your key skills, experience, and career goals...'
                    />

                    {/* Character Count */}
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Write 3-5 sentences about yourself</span>
                        <span>{(resumeInfo?.summery || summary || '').length} characters</span>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-900">
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        <strong>AI Tip:</strong> Click "Generate with AI" to get professional summaries tailored to your job title!
                        {!resumeInfo?.jobTitle && (
                            <span className="block mt-1 text-red-700">⚠️ Please add your job title in Personal Details first</span>
                        )}
                    </p>
                </div>

                {/* Save Button */}
                <div className='flex justify-end'>
                    <Button 
                        type="submit"
                        disabled={loading}
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

            {/* AI Generated Summaries */}
            {AIGeneratedSummaryList && (
                <div className='mt-8 pt-8 border-t border-gray-200 animate-fade-in'>
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className='h-5 w-5 text-primary' />
                        <h3 className='font-bold text-lg text-gray-900'>AI Generated Summaries</h3>
                    </div>
                    <p className='text-sm text-gray-600 mb-4'>Choose a summary that best fits your experience level:</p>
                    
                    <div className='grid gap-4'>
                        {AIGeneratedSummaryList?.result?.map((item, index) => (
                            <div 
                                key={index}
                                onClick={() => {
                                    selectedSummary(item?.experience_level)
                                    toast.success(`Selected ${item?.experience_level} summary`)
                                }}
                                className='relative group cursor-pointer bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-primary rounded-xl p-5 transition-all duration-300 hover:shadow-lg'
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary border border-primary/20 mb-3">
                                    <Check className="w-3 h-3" />
                                    {item?.experience_level}
                                </div>
                                
                                <p className='text-sm text-gray-700 leading-relaxed'>
                                    {item?.summary}
                                </p>

                                {/* Hover indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Summarydetails