import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import productLogo from '../assets/productLogo.png';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 20px 60px;
  background: radial-gradient(circle at 50% 40%, rgba(20, 20, 30, 1) 0%, #000 70%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 100px 20px 40px;
    min-height: 80vh;
  }
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  z-index: 5;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  width: 130px;
  height: auto;
  margin-bottom: 16px;
  position: relative;
  z-index: 10;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(102, 153, 255, 0.4));
  }
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.08);
  color: #ccc;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 1px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  font-family: var(--font-heading);
  font-weight: 800;
  color: #fff;
  word-break: keep-all;
  
  span {
    background: linear-gradient(90deg, #6699ff, #9e66ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #c5c6c7;
  max-width: 600px;
  line-height: 1.6;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ApplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  background-color: #ffffff;
  color: #121212;
  font-size: 1.15rem;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.25);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const StatusText = styled.div`
  color: #ffb86c;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const CenterGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102, 153, 255, 0.2) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const Hero = () => {
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
            scale: { duration: 1, type: "spring", bounce: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.img
            src={productLogo}
            alt="UMC Product Logo"
            style={{
              filter: "drop-shadow(0 0 30px rgba(102, 153, 255, 0.4))"
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
          흩어진 도구들은 하나로, 반복되는 업무는 자동으로.<br />
          동아리가 온전히 성장에만 집중할 수 있도록.
        </Subtitle>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ApplyButton
            href="https://docs.google.com/forms/d/1sHW8V8WzdPl22VGLbab978OyEU2S6D-pCSIxMQ-nGw8/viewform?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            2기 지원하기
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </ApplyButton>
          <StatusText>모집 중!</StatusText>
        </ButtonGroup>
      </Content>
    </Section>
  );
};

export default Hero;
