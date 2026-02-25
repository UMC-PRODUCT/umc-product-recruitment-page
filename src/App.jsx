import React from 'react'
import styled, { keyframes } from 'styled-components'
import Hero from './components/Hero'
import WhatWeBuild from './components/WhatWeBuild'
import Sprints from './components/Sprints'
import Vision from './components/Vision'
import Apply from './components/Apply'
import LegacyLandingSection from './components/LegacyLandingSection'
import TrackComparisonSection from './components/TrackComparisonSection'
import FaqSection from './components/FaqSection'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-bottom: calc(92px + env(safe-area-inset-bottom));
  }

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -2;
    background-image:
      linear-gradient(rgba(162, 185, 228, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(162, 185, 228, 0.08) 1px, transparent 1px);
    background-size: 112px 112px;
    mask-image: radial-gradient(circle at center, black 44%, transparent 100%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(circle at 25% 12%, rgba(52, 126, 255, 0.18), transparent 32%),
      radial-gradient(circle at 74% 74%, rgba(20, 224, 172, 0.14), transparent 36%);
    pointer-events: none;
  }
`;

const Footer = styled.footer`
  position: relative;
  padding: 42px 20px 58px;
  border-top: 1px solid rgba(163, 184, 221, 0.2);
  background: linear-gradient(180deg, rgba(9, 13, 23, 0), rgba(8, 13, 24, 0.88));
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(840px, 88%);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124, 208, 255, 0.58), transparent);
  }

  @media (max-width: 768px) {
    padding: 34px 16px calc(138px + env(safe-area-inset-bottom));
  }
`

const FooterInner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(151, 173, 213, 0.22);
  background: linear-gradient(155deg, rgba(11, 19, 33, 0.78), rgba(7, 12, 22, 0.9));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 14px 16px;
    border-radius: 14px;
  }
`

const FooterBrand = styled.span`
  color: rgba(231, 241, 255, 0.9);
  font-size: 0.88rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-weight: 700;
`

const FooterCopy = styled.p`
  color: var(--text-tertiary);
  font-size: 0.84rem;
  letter-spacing: 0.03em;
`

const FooterYear = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #d7ebff;
  border: 1px solid rgba(118, 204, 255, 0.34);
  background: rgba(95, 166, 255, 0.12);
`

const pulse = keyframes`
  0% {
    box-shadow: 0 12px 30px rgba(251, 227, 77, 0.32);
  }
  50% {
    box-shadow: 0 14px 36px rgba(251, 227, 77, 0.5);
  }
  100% {
    box-shadow: 0 12px 30px rgba(251, 227, 77, 0.32);
  }
`;

const FloatingActions = styled.div`
  position: fixed;
  right: 24px;
  bottom: calc(24px + env(safe-area-inset-bottom));
  z-index: 120;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  @media (max-width: 768px) {
    right: 12px;
    left: auto;
    bottom: calc(12px + env(safe-area-inset-bottom));
    align-items: flex-end;
    gap: 0;
    padding: 0;
    border: 0;
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
  }
`;

const FloatingContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  max-width: calc(100vw - 32px);
  gap: 8px;
  padding: 12px 16px;
  border-radius: 999px;
  background: #fee500;
  color: #181600;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${pulse} 2.4s ease-in-out infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 38px rgba(251, 227, 77, 0.58);
  }

  @media (max-width: 768px) {
    width: auto;
    max-width: none;
    min-width: 152px;
    padding: 11px 14px;
    font-size: 0.82rem;
    gap: 6px;
    box-shadow: 0 10px 24px rgba(214, 185, 0, 0.42);
  }
`;

const FabText = styled.span`
  white-space: nowrap;
`;

function App() {
  return (
    <AppContainer>
      <Hero />
      <WhatWeBuild />
      <LegacyLandingSection />
      <Sprints />
      <Vision />
      <TrackComparisonSection />
      <FaqSection />
      <Apply />
      <Footer>
        <FooterInner>
          <FooterBrand>UMC Product</FooterBrand>
          <FooterCopy>&copy; 2026 UMC Product. All rights reserved.</FooterCopy>
          <FooterYear>2026</FooterYear>
        </FooterInner>
      </Footer>
      <FloatingActions>
        <FloatingContactButton
          href="http://pf.kakao.com/_MDxhqX/chat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 문의하기"
        >
          💬 <FabText>카카오톡 문의</FabText>
        </FloatingContactButton>
      </FloatingActions>
    </AppContainer>
  )
}

export default App
