import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom'

const Navbar = ({userInfo}) => {

  const [searchQuery, setSearchQuery] = React.useState('')

  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
    // Logout API Call
  }

  const handleSearch = () => {}

  const onClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <div className='flex'>
        <Link to="/" className="flex items-center">
          <img src="/src/assets/notes-icon.png" alt="" className="w-10"/>
          <h2 className="text-xl font-medium text-black py-2 ml-2">Mind Memos</h2>
        </Link>
      </div>


        <SearchBar
          value={searchQuery}
          onChange={({target}) => {
            setSearchQuery(target.value)
          }} 
          
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}

          />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}
 
export default Navbar