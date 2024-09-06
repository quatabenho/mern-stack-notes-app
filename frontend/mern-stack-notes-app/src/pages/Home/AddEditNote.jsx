import { data } from 'autoprefixer'
import React from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'

const AddEditNote = ({noteData, type, onClose}) => {

    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [error, setError] = React.useState(null)

    const addNewNote = async () => {}

    const editNote = async () => {}
    
    const handleAddNote = ()=>{
        if(!title){
            setError('Title is required')
            return
        }

        if(!content){
            setError('Content is required')
            return
        }

        setError('')

        if(type === 'edit'){
            editNote()
        }else{
            addNewNote()
        }
        //API here
    }

    return (
        <div className='relative'>

            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type='text'
                    placeholder='Go to gym at 5'
                    className='text-2xl text-slate-950 outline-none'
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                />
            </div>
        
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    type='text'
                    placeholder='Content'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    row={10}
                    value={content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
                ADD
            </button>
        
        </div>
  )
}

export default AddEditNote