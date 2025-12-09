import { MoreVertical, NotebookIcon, FileText, Edit, Eye, Download, Trash2, Calendar } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Global from '../../../service/Global'

function ResumeCard({ resume, refreshData }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const onDelete = async () => {
        setLoading(true)
        try {
            await Global.DeleteResume(resume.documentId)
            toast.success("Resume deleted successfully")
            setOpen(false)
            refreshData()
        } catch (err) {
            console.error('Error deleting resume:', err)
            toast.error("Failed to delete resume")
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Recently'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
        <div className="group">
            <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
                <div className='relative bg-white rounded-2xl h-[280px] border-2 border-gray-200 hover:border-primary hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden'>
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50" />
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FileText className='w-10 h-10 text-primary' />
                        </div>
                        
                        <div className="text-center space-y-2">
                            <h3 className='font-bold text-lg text-gray-900 line-clamp-2 px-4'>
                                {resume.title}
                            </h3>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>Updated {formatDate(resume.updatedAt)}</span>
                            </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </Link>

            <div className='flex justify-between items-center mt-3 px-1'>
                <div className="flex-1">
                    <h4 className='font-semibold text-gray-900 truncate'>{resume.title}</h4>
                    <p className='text-xs text-gray-500'>Click to edit</p>
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                        <MoreVertical className='w-5 h-5 text-gray-600' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem 
                            className='cursor-pointer flex items-center gap-2' 
                            onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
                        >
                            <Edit className="w-4 h-4" />
                            Edit Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className='cursor-pointer flex items-center gap-2' 
                            onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                        >
                            <Eye className="w-4 h-4" />
                            View Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className='cursor-pointer flex items-center gap-2' 
                            onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className='cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600' 
                            onClick={() => setOpen(true)}
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </div>
                            Delete Resume?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base pt-2">
                            Are you sure you want to delete "<span className="font-semibold">{resume.title}</span>"? 
                            This action cannot be undone and all your resume data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)} disabled={loading}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={onDelete} 
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-spin mr-2' />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Resume
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ResumeCard