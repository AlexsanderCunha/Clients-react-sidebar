import React, { useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'

const Header = ({setShowHome, setShowUsers}) => {
  const [sidebar, setSidebar] = useState(false)
  const showSiderbar = () => setSidebar(!sidebar)
  return (
    <Container>
      <FaBars onClick={showSiderbar} />
      {sidebar && <Sidebar active={setSidebar} setShowHome={setShowHome} setShowUsers={setShowUsers} />}
    </Container>
  )
}

export default Header
