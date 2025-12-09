import { PlusSquare, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Global from '../../../service/Global'
import { Loader2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Addresume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useUser()

    const toCreateResume = async () => {
        if (!resumeTitle.trim()) {
            toast.error('Please enter a resume title')
            return
        }

        setLoading(true)
        const id = uuidv4()
        const data = {
            data: {
                title: resumeTitle,
                resumeid: id,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        try {
            const res = await Global.CreateNewResume(data)
            toast.success('Resume created successfully!')
            setOpenDialog(false)
            navigate(`/dashboard/resume/${res.data.data.documentId}/edit`)
        } catch (err) {
            console.error('Error creating resume:', err)
            toast.error('Failed to create resume. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div 
                className="group relative bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl h-[280px] border-2 border-dashed border-primary/30 hover:border-primary hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden"
                onClick={() => setOpenDialog(true)}
            >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-grid-slate-100 opacity-20" />
                
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <PlusSquare className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Resume</h3>
                    <p className="text-sm text-gray-600">Start building your professional resume with AI</p>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 opacity-20">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            Create New Resume
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            Give your resume a title to get started. You can always change it later.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                Resume Title <span className="text-red-500">*</span>
                            </label>
                            <Input 
                                id="title"
                                className="h-12 text-base" 
                                placeholder="e.g., Full Stack Developer Resume" 
                                value={resumeTitle}
                                onChange={(e) => setResumeTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && resumeTitle.trim()) {
                                        toCreateResume()
                                    }
                                }}
                                autoFocus
                            />
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900 flex items-start gap-2">
                                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>Our AI will help you write professional content for your resume!</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setOpenDialog(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            disabled={!resumeTitle.trim() || loading} 
                            onClick={toCreateResume}
                            className="min-w-[120px]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Create Resume
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Addresume