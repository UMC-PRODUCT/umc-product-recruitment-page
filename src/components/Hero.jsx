import React, { useEffect, useState } from 'react';
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
  gap: ${({ $top }) => ($top ? '12px' : '10px')};
  width: ${({ $top }) => ($top ? 'min(760px, 100%)' : 'min(880px, 100%)')};
  margin-top: ${({ $top }) => ($top ? '0' : '24px')};
  margin-bottom: ${({ $top }) => ($top ? '16px' : '0')};

  @media (min-width: 769px) {
    flex-direction: column;
    flex-wrap: nowrap;
    width: ${({ $top }) => ($top ? 'min(760px, 100%)' : 'min(980px, 100%)')};
  }

  @media (max-width: 768px) {
    margin-top: ${({ $top }) => ($top ? '0' : '16px')};
    margin-bottom: ${({ $top }) => ($top ? '10px' : '0')};
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-radius: 999px;
  padding: ${({ $top }) => ($top ? '9px 18px' : '10px 16px')};
  border: 1px solid ${({ $join }) => ($join ? 'rgba(99, 241, 226, 0.48)' : 'rgba(142, 211, 255, 0.35)')};
  background: ${({ $join }) => ($join ? 'linear-gradient(120deg, rgba(9, 33, 56, 0.86), rgba(12, 26, 47, 0.9))' : 'rgba(16, 31, 54, 0.7)')};
  color: #eaf3ff;
  font-size: ${({ $top }) => ($top ? '0.84rem' : '0.88rem')};
  letter-spacing: ${({ $top }) => ($top ? '0.02em' : '0.01em')};
  font-weight: 700;
  min-height: 48px;
  width: ${({ $top }) => ($top ? 'min(560px, 100%)' : 'auto')};
  text-align: center;

  strong {
    color: #66fcf1;
    font-size: ${({ $top }) => ($top ? '0.88rem' : '0.95rem')};
    min-width: ${({ $top }) => ($top ? '76px' : '0')};
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 44px;
    font-size: ${({ $top }) => ($top ? '0.8rem' : '0.84rem')};
    padding: ${({ $top }) => ($top ? '9px 12px' : '9px 14px')};

    strong {
      min-width: 0;
      font-size: ${({ $top }) => ($top ? '0.84rem' : '0.9rem')};
    }
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
  width: clamp(120px, 10vw, 164px);
  height: auto;
  margin-bottom: 14px;
  position: relative;
  z-index: 10;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(102, 153, 255, 0.4));
  }

  @media (max-width: 768px) {
    width: clamp(100px, 26vw, 132px);
    margin-bottom: 12px;
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
  margin-bottom: 10px;
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
  margin-bottom: 14px;
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
  max-width: 720px;
  line-height: 1.66;
  word-break: keep-all;
  padding: 0 8px;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 96%;
    line-height: 1.56;
    padding: 0;
  }

  @media (max-width: 480px) {
    font-size: 0.94rem;
    max-width: 100%;
    line-height: 1.54;
  }
`;

const ButtonGroup = styled(motion.div)`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

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
  max-width: 328px;
  padding: 16px 34px;
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

const ScrollGuide = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(130, 199, 255, 0.36);
  background: rgba(8, 20, 38, 0.66);
  color: rgba(217, 233, 255, 0.92);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  font-weight: 700;
  backdrop-filter: blur(8px);
  cursor: pointer;
  margin-top: 14px;

  &:hover {
    border-color: rgba(124, 238, 255, 0.72);
    background: rgba(12, 28, 49, 0.84);
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    padding: 8px 12px;
    font-size: 0.74rem;
  }
`;

const ScrollDot = styled.span`
  width: 18px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid rgba(148, 213, 255, 0.5);
  display: inline-flex;
  justify-content: center;
  padding-top: 5px;
  position: relative;

  &::after {
    content: '';
    width: 4px;
    height: 7px;
    border-radius: 999px;
    background: #73e9ff;
    animation: scrollDotMove 1.35s ease-in-out infinite;
  }

  @keyframes scrollDotMove {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    35% {
      opacity: 1;
      transform: translateY(5px);
    }
    80% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 0;
      transform: translateY(0);
    }
  }
`;

const scheduleRows = [
  {
    title: '모집',
    value: '2026년 2월 26일(목) - 3월 1일(일)'
  },
  {
    title: '서류 평가',
    value: '2026년 3월 2일(월) - 3월 6일(금)'
  },
  {
    title: '합격 발표',
    value: '2026년 3월 7일(토) 14시'
  }
]

const Hero = () => {
  const [showScrollGuide, setShowScrollGuide] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollGuide(window.scrollY < 140);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleGuideClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  return (
    <Section>
      <CenterGlow />
      <Content>
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

        <StatusStrip
          $top
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {scheduleRows.map((row) => (
            <StatusBadge $top key={row.title}>
              <strong>{row.title}</strong> {row.value}
            </StatusBadge>
          ))}
        </StatusStrip>

        <StatusStrip
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <StatusBadge $join>
            <LiveDot />
            <strong>모집 중</strong>
            UMC Product 2기 지금 합류하세요
          </StatusBadge>
        </StatusStrip>

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
        </ButtonGroup>
        {showScrollGuide && (
          <ScrollGuide
            type="button"
            onClick={handleGuideClick}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            aria-label="아래 콘텐츠로 스크롤"
          >
            <ScrollDot />
            아래로 스크롤
          </ScrollGuide>
        )}
      </Content>
    </Section>
  );
};

export default Hero;
