import React from 'react'
import styled from 'styled-components'
import Hero from './components/Hero'
import WhatWeBuild from './components/WhatWeBuild'
import Sprints from './components/Sprints'
import Vision from './components/Vision'
import Apply from './components/Apply'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

function App() {
  return (
    <AppContainer>
      <Hero />
      <WhatWeBuild />
      <Sprints />
      <Vision />
      <Apply />
      <Footer>
        <p>&copy; 2024 UMC Product Team. All rights reserved.</p>
      </Footer>
    </AppContainer>
  )
}

export default App
