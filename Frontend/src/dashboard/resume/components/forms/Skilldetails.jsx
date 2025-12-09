import React, { useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusSquare, MinusSquare, Loader2, Sparkles, Trash2, Award } from 'lucide-react'
import { useEffect, useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import Global from '../../../../../service/Global'
import { toast } from 'sonner'

function Skilldetails({ enabledNext }) {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams()
    const [skillsList, setSkillsList] = useState([{
        name: "",
        rating: 0
    }])

    useEffect(() => {
        if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
            setSkillsList(resumeInfo.skills)
            // Enable next button if skills data exists
            enabledNext(true)
        }
    }, [resumeInfo?.skills])

    const handleSkillChange = (index, field, value) => {
        const newSkills = [...skillsList]
        newSkills[index][field] = value
        setSkillsList(newSkills)
        setResumeInfo({ ...resumeInfo, skills: newSkills })
    }

    const AddNewSkill = () => {
        setSkillsList([...skillsList, { name: "", rating: 0 }])
    }

    const RemoveSkill = () => {
        const newSkills = [...skillsList]
        newSkills.pop()
        setSkillsList(newSkills)
    }

    const onSave = async () => {
        setLoading(true)
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => ({
                    name: rest.name || "",
                    rating: rest.rating || 0
                }))
            }
        }

        Global.UpdateResume(params?.resumeid, data)
            .then((res) => {
                setLoading(false)
                enabledNext(true)
                toast.success('Skills updated successfully!')
            })
            .catch((err) => {
                setLoading(false)
                console.error('Save error:', err)
                toast.error('Failed to update skills')
            })
    }

    return (
        <div className='bg-white p-8 shadow-xl rounded-2xl border border-gray-100 mt-10'>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>Skills</h2>
                    <p className='text-gray-600'>Add your technical and professional skills</p>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-900">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    <strong>Tip:</strong> Rate your proficiency level from 1 to 5 stars for each skill
                </p>
            </div>

            <div className='space-y-4'>
                {skillsList?.map((skill, index) => (
                    <div key={index} className='bg-gradient-to-br from-gray-50 to-green-50 border-2 border-gray-200 p-5 rounded-2xl hover:border-primary/50 transition-all'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                            <div className="flex-1 space-y-2">
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Award className="w-4 h-4 text-primary" />
                                    Skill Name
                                </label>
                                <Input
                                    type='text'
                                    value={skill?.name}
                                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                    className="h-11 text-base border-gray-300"
                                    placeholder="e.g. JavaScript, Project Management"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="space-y-2">
                                    <label className='text-sm font-semibold text-gray-700 block text-center'>
                                        Proficiency
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <Rating
                                            style={{ maxWidth: 150 }}
                                            value={skill?.rating}
                                            onChange={(value) => handleSkillChange(index, 'rating', value)}
                                        />
                                        <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                                            {skill?.rating}/5
                                        </span>
                                    </div>
                                </div>

                                {skillsList.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            const updated = skillsList.filter((_, i) => i !== index)
                                            setSkillsList(updated)
                                        }}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-6"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
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
                        onClick={AddNewSkill}
                    >
                        <PlusSquare className="w-4 h-4 mr-2" />
                        Add Skill
                    </Button>
                    {skillsList.length > 1 && (
                        <Button
                            variant='outline'
                            className='border-2 border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-all h-11'
                            onClick={RemoveSkill}
                        >
                            <MinusSquare className="w-4 h-4 mr-2" />
                            Remove Last
                        </Button>
                    )}
                </div>

                <Button
                    onClick={onSave}
                    disabled={loading}
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

export default Skilldetails