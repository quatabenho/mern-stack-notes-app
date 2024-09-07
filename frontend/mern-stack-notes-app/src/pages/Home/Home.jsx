import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNote from './AddEditNote'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../../src/assets/addnote.svg'
const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const [showToastMsg, setShowToastMsg] = React.useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const [allNotes, setAllNotes] = React.useState([])
  const [userInfo, setUserInfo] = React.useState(null)
  const navigate = useNavigate()

  const handleEdit = (noteDetails)  => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: noteDetails })
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type})
  }

  const handleCloseToast = () => {  
    setShowToastMsg({ isShown: false, message: '' })
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
    }
  }
    

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes')

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstance.delete('/delete-note/' + noteId)

      if(response.data && !response.data.error){
        showToastMessage('Note deleted successfully', 'delete')
        getAllNotes()
      }
    }
    catch (error) {
      (error.response && error.response.data && error.response.data.message) ? showToastMessage(error.response.data.message) : showToastMessage('Something went wrong')
    }
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id
    const isPinned = !noteData.isPinned
    try {
      const response = await axiosInstance.put('/update-note-pinned/' + noteId, {
        isPinned
      })

      if(response.data && response.data.note){
        showToastMessage('Note pinned successfully')
        getAllNotes()
      }
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ? showToastMessage(error.response.data.message) : showToastMessage('Something went wrong')
    }
  }


  React.useEffect(() => {
    getAllNotes()
    getUserInfo()
    return () => {}
  }
  , [])




  return (
    <>
      <Navbar userInfo={userInfo}/>
       
        <div className='container mx-auto'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item, index) => (            
              < NoteCard 
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
            />
          ))}
          </div>
          ):(
          <EmptyCard
            imgSrc={AddNotesImg}
            message={`Start creating your first note! Click the 'add' button to jot down your thoughts, ideas, and reminders.`}/>)}
        </div>

        <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
         onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null })
         }}>

          <MdAdd className='text-[32px] text-white' />
        </button>

        <Modal 
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style = {{overlay:{backgroundColor: 'rgba(0,0,0,0.2)'}}}
          contentLabel=''
          className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden'
          >
            <AddEditNote 
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({ isShown: false, type: 'add', data: null })
              }}

              getAllNotes={getAllNotes}
              showToastMessage={showToastMessage}
            />
        </Modal>

        <ToastMessage 
          isShown = {showToastMsg.isShown}
          type = {showToastMsg.type}
          message = {showToastMsg.message}
          onClose = {handleCloseToast}
        />
      
    </>
  )
}

export default Home