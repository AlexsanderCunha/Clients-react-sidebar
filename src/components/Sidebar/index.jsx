import React from 'react'
import { Container, Content } from './styles'
import {
  FaTimes,
  FaHome,
  FaUserAlt
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <a href={`/`}>
          <SidebarItem Icon={FaHome} Text="Página Inicial" />
        </a>
        <a href='/clients'>
          <SidebarItem Icon={FaUserAlt} Text="Clientes" />
        </a>
      </Content>
    </Container>
  )
}

export default Sidebar
