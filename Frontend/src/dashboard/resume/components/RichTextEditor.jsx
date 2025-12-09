import { Editor, EditorProvider, Toolbar, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, BtnClearFormatting } from 'react-simple-wysiwyg'
import { useState } from 'react'
import { BtnBold, BtnItalic, BtnUndo, BtnRedo, Separator } from 'react-simple-wysiwyg'
import { Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext } from 'react'
import { toast } from 'sonner';
import { AIChatSession } from '../../../../service/ALmodel';
import { LoaderCircle } from 'lucide-react'

const prompt = "position title: {positionTitle}, give me 3 short bullet points for my experience in resume (max 50 words each), give me result as object with key 'experience' and value in simple text format without HTML tags"

function RichTextEditor({ index, onRichTextEditorChange, defaultValue }) {
    const [value, setValue] = useState(defaultValue)
    const { resumeInfo , setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)

    const generateFromAI = async () => {
        setLoading(true)
        if(!resumeInfo?.experience[index]?.title){
            toast.error('Please add position title first')
            setLoading(false)
            return
        }
        const PROMPT = prompt.replace('{positionTitle}', resumeInfo?.experience[index]?.title)
        const resp = await AIChatSession.sendMessage(PROMPT)
        console.log(PROMPT)
        console.log(resp.response.text());
        const data = JSON.parse(resp.response.text())
        setValue(data?.experience)
        
        // Create a synthetic event to trigger the onChange callback
        const syntheticEvent = {
            target: {
                value: data?.experience
            }
        }
        onRichTextEditorChange(syntheticEvent)
        
        setLoading(false)
    }
    return (
        <div>
            <div className='flex items-center justify-between my-2'>
                <label className='text-xs'>Work Summary</label>
                <Button variant='outline' onClick={generateFromAI} disabled={loading}  size='sm' className='text-primary border-primary flex items-center gap-2'>{loading ? <LoaderCircle className='w-4 h-4 animate-spin' /> : <Brain className='w-4 h-4' />}Generate from AI</Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {setValue(e.target.value);
                    onRichTextEditorChange(e)
                }} className='border-none'>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor