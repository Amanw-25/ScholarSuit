import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import Global from '../../../../service/Global'
import { useParams } from 'react-router-dom'
function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor] = useState()
    const params = useParams()
    const handleThemeColorChange = (color) => {
        setSelectedColor(color)
        setResumeInfo({ ...resumeInfo, themeColor: color })
        const data = {
            data: {
                themeColor: color
            }
        }
        Global.UpdateResume(params?.resumeid, data).then((res) => {
            toast.success('Theme color updated successfully')
        }).catch((err) => {
            toast.error('Something went wrong')
        })
    }
    return (
        // <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid />Theme</Button>
            </PopoverTrigger>
            <PopoverContent>
                <p className='text-sm font-bold mb-2'>Select Theme Color</p>
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color, index) => (
                        <div key={index} onClick={() => handleThemeColorChange(color)} className={`w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 ${selectedColor === color ? 'scale-110 border-2 border-black' : ''}`} style={{ backgroundColor: color }}></div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>

        // </div>

    )
}

export default ThemeColor