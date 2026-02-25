import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  background: var(--bg-color);
  position: relative;
  text-align: center;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 40px;
  background: linear-gradient(180deg, rgba(30, 35, 45, 0.4) 0%, rgba(11, 12, 16, 0.8) 100%);
  border: 1px solid rgba(102, 252, 241, 0.15);
  border-radius: 40px;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 60px 20px;
    border-radius: 30px;
  }
`;

const GlowRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0 0 80px rgba(102, 252, 241, 0.1);
  z-index: -1;
  pointer-events: none;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 24px;
  font-family: var(--font-heading);
  position: relative;
  z-index: 1;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Text = styled(motion.p)`
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 50px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const ButtonGroup = styled(motion.div)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 10;
`;

const ApplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 18px 40px;
  background-color: #ffffff;
  color: #121212;
  font-size: 1.2rem;
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
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const Apply = () => {
  return (
    <Section>
      <Container>
        <GlowRing
          animate={{
            boxShadow: ['0 0 60px rgba(102, 252, 241, 0.1)', '0 0 120px rgba(102, 252, 241, 0.2)', '0 0 60px rgba(102, 252, 241, 0.1)']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          UMC Product Team과 함께하시겠습니까?
        </Title>

        <Text
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          우리의 비전에 공감하고 가슴 뛰는 도전을 즐길 준비가 되었다면 지금 바로 지원하세요.
        </Text>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ApplyButton
            href="https://docs.google.com/forms/d/1sHW8V8WzdPl22VGLbab978OyEU2S6D-pCSIxMQ-nGw8/viewform?hl=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            2기 지원하기
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </ApplyButton>
          <StatusText>모집 중!</StatusText>
        </ButtonGroup>
      </Container>
    </Section>
  );
};

export default Apply;
