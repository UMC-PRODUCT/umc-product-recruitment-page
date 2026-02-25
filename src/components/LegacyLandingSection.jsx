import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 76px 16px;
  }
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  border: 1px solid rgba(132, 176, 255, 0.24);
  border-radius: 28px;
  padding: 36px 40px;
  background: linear-gradient(160deg, rgba(11, 20, 37, 0.86), rgba(8, 12, 21, 0.94));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 28px 20px;
    border-radius: 20px;
  }
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 85% 22%, rgba(113, 184, 255, 0.2), transparent 55%);
  pointer-events: none;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Label = styled.span`
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(129, 196, 255, 0.36);
  background: rgba(103, 172, 255, 0.14);
  color: #8deaff;
  font-size: 0.78rem;
  letter-spacing: 0.11em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4.2vw, 2.55rem);
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: rgba(206, 222, 245, 0.9);
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.64;
`;

const ActionRow = styled.div`
  margin-top: 24px;
  display: inline-flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 190px;
  padding: 14px 20px;
  border-radius: 999px;
  border: 1px solid rgba(145, 206, 255, 0.45);
  background: rgba(15, 27, 46, 0.65);
  color: #ebf5ff;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-decoration: none;

  &:hover {
    border-color: rgba(138, 255, 253, 0.68);
    background: rgba(17, 31, 57, 0.75);
  }
`;

const LegacyLandingSection = () => {
  return (
    <Section>
      <Container>
        <Glow />
        <Content
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Label>기수 운영 사례</Label>
          <Title>1기 랜딩 페이지로 실서비스 사례를 확인하세요.</Title>
          <Description>
            운영 중인 서비스가 어떤 방식으로 구성되는지, 실제 화면과 운영 방식이 궁금하다면
            이전 기수의 랜딩 페이지에서 제품 방향을 먼저 볼 수 있습니다.
          </Description>
          <ActionRow>
            <ActionButton
              href="https://product.umc.it.kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              1기 랜딩 페이지 보기
            </ActionButton>
          </ActionRow>
        </Content>
      </Container>
    </Section>
  );
};

export default LegacyLandingSection;
