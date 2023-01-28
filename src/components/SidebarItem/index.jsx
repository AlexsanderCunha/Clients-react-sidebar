import React from 'react'
import {
  Link
} from "react-router-dom";
import { Container } from './styles'

const SidebarItem = ({ Icon, Text }) => {
  return (
      <Container>
        <Icon />
        {Text}
      </Container>
  )
}

export default SidebarItem
