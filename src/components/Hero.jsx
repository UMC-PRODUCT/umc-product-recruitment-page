import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import productLogo from '../assets/productLogo.png';

const Section = styled.section`
  min-height: 112vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: calc(128px + env(safe-area-inset-top)) 20px 96px;
  background: transparent;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    min-height: 105vh;
    padding: calc(108px + env(safe-area-inset-top)) 20px 80px;
  }

  @media (max-width: 768px) {
    min-height: 100svh;
    padding: calc(88px + env(safe-area-inset-top)) 18px calc(56px + env(safe-area-inset-bottom));
  }

  @media (max-width: 480px) {
    padding: calc(78px + env(safe-area-inset-top)) 16px calc(48px + env(safe-area-inset-bottom));
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  z-index: 5;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 4px;
  }
`;

const StatusStrip = styled(motion.div)`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: min(880px, 100%);
  margin-bottom: 24px;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 8px 14px;
  border: 1px solid rgba(142, 211, 255, 0.35);
  background: rgba(16, 31, 54, 0.7);
  color: #eaf3ff;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  font-weight: 700;

  strong {
    color: #66fcf1;
    font-size: 0.86rem;
  }
`;

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #66fcf1;
  box-shadow: 0 0 0 0 rgba(102, 252, 241, 0.55);
  animation: ping 2.1s cubic-bezier(0, 0, 0.2, 1) infinite;

  @keyframes ping {
    0% {
      box-shadow: 0 0 0 0 rgba(102, 252, 241, 0.45);
    }

    70% {
      box-shadow: 0 0 0 12px rgba(102, 252, 241, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(102, 252, 241, 0);
    }
  }
`;

const LogoContainer = styled(motion.div)`
  width: clamp(132px, 11vw, 186px);
  height: auto;
  margin-bottom: 18px;
  position: relative;
  z-index: 10;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(102, 153, 255, 0.4));
  }

  @media (max-width: 768px) {
    width: clamp(110px, 28vw, 146px);
    margin-bottom: 14px;
  }
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 8px 18px;
  background: rgba(100, 175, 255, 0.12);
  color: #d4d8e2;
  border-radius: 50px;
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
  font-weight: 550;
  margin-bottom: 12px;
  border: 1px solid rgba(133, 203, 255, 0.3);
  letter-spacing: 0.06em;

  @media (max-width: 768px) {
    font-size: 0.84rem;
    padding: 7px 14px;
    margin-bottom: 10px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(3.2rem, 8.2vw, 5.5rem);
  line-height: 1.04;
  margin-bottom: 18px;
  letter-spacing: -0.02em;
  font-family: var(--font-heading);
  font-weight: 800;
  color: #fff;
  word-break: keep-all;

  span {
    background: linear-gradient(95deg, #88b6ff, #66fcf1 45%, #7399ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 1024px) {
    font-size: clamp(3rem, 9vw, 4.6rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(2.35rem, 12vw, 3.35rem);
    margin-bottom: 14px;
    letter-spacing: -0.018em;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.05rem, 11.8vw, 2.6rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.08rem, 1.6vw, 1.4rem);
  color: rgba(219, 229, 245, 0.9);
  max-width: 760px;
  line-height: 1.72;
  word-break: keep-all;
  padding: 0 8px;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 94%;
    line-height: 1.58;
    padding: 0;
  }

  @media (max-width: 480px) {
    font-size: 0.94rem;
    max-width: 100%;
    line-height: 1.54;
  }
`;

const ButtonGroup = styled(motion.div)`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    margin-top: 28px;
    gap: 10px;
    width: 100%;
    max-width: 360px;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  padding: 16px 38px;
  background: linear-gradient(120deg, #f4f8ff, #dff5ff);
  color: #101827;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(128, 206, 255, 0.35);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  padding: 14px 24px;
  border-radius: 999px;
  border: 1px solid rgba(145, 206, 255, 0.42);
  background: rgba(10, 22, 38, 0.42);
  color: #e6f1ff;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;

  &:hover {
    border-color: rgba(141, 235, 255, 0.72);
    background: rgba(17, 32, 55, 0.66);
  }
`;

const MiniText = styled.p`
  color: #ffd89a;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  font-weight: 600;
`;

const CenterGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(72vw, 860px);
  height: min(72vw, 860px);
  background: radial-gradient(circle, rgba(102, 175, 255, 0.28) 0%, transparent 72%);
  filter: blur(88px);
  z-index: 0;
  pointer-events: none;

  @media (max-width: 768px) {
    width: min(95vw, 520px);
    height: min(95vw, 520px);
    filter: blur(54px);
  }
`;

const scheduleRows = [
  {
    title: '모집',
    value: '2026년 2월 26일(목) - 3월 1일(일)'
  },
  {
    title: '서류 평가',
    value: '2026년 3월 2일(월) - 3월 7일(토)'
  }
]

const Hero = () => {
  return (
    <Section>
      <CenterGlow />
      <Content>
        <StatusStrip
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <StatusBadge>
            <LiveDot />
            <strong>모집 중</strong>
            UMC Product 2기 지금 합류하세요
          </StatusBadge>
          {scheduleRows.map((row) => (
            <StatusBadge key={row.title}>
              <strong>{row.title}</strong> {row.value}
            </StatusBadge>
          ))}
        </StatusStrip>

        <LogoContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [-10, 10, -10]
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1, type: 'spring', bounce: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.img
            src={productLogo}
            alt="UMC Product Logo"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(102, 153, 255, 0.4))'
            }}
          />
        </LogoContainer>

        <Badge
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          University MakeUs Challenge
        </Badge>

        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>UMC Product</span>
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          흩어진 도구들은 하나로, 반복되는 업무는 자동으로.
          <br />
          동아리가 온전히 성장에만 집중할 수 있도록.
        </Subtitle>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <PrimaryButton
            href="https://docs.google.com/forms/d/1sHW8V8WzdPl22VGLbab978OyEU2S6D-pCSIxMQ-nGw8/viewform?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            2기 지원하기
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </PrimaryButton>
          <SecondaryButton
            href="https://product.umc.it.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            1기 랜딩 페이지 보기
          </SecondaryButton>
          <MiniText>📅 더 자세한 모집 일정은 하단에서 확인하세요.</MiniText>
        </ButtonGroup>
      </Content>
    </Section>
  );
};

export default Hero;
