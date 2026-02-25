import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  background: var(--bg-color);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Label = styled(motion.span)`
  color: var(--accent-color);
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: inline-block;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 24px;
  font-family: var(--font-heading);
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ color }) => color || 'var(--gradient-main)'};
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }

    .icon-wrapper {
      transform: scale(1.1);
      box-shadow: 0 0 20px ${({ color }) => color}40;
    }
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 16px;
  font-family: var(--font-heading);
`;

const CardText = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
  word-break: keep-all;
`;

const pillars = [
  {
    title: "Web",
    icon: "💻",
    desc: "전국 단위의 UMC 리크루팅 서비스와 중앙운영사무국을 위한 효율적인 통합 관리자 페이지(Admin)를 제작 및 운영합니다.",
    color: "#6699ff",
    delay: 0.2
  },
  {
    title: "Server",
    icon: "⚙️",
    desc: "대규모 트래픽을 처리할 수 있는 분산 아키텍처 설계 및 CI/CD 자동화를 통해 탄탄하고 확장 가능한 핵심 인프라를 구축합니다.",
    color: "#46e891",
    delay: 0.4
  },
  {
    title: "iOS",
    icon: "🍎",
    desc: "Apple Watch, 위젯 연동 및 최신 iOS 환경 전반에 걸친 성능 개선을 통해 한 차원 높은 모바일 서비스 경험을 제공합니다.",
    color: "#ff66a3",
    delay: 0.6
  },
  {
    title: "Android",
    icon: "🤖",
    desc: "다양한 폼팩터에 대응하는 유연한 UI설계와 백그라운드 프로세스 고도화를 통해 안정적이고 생동감 넘치는 서비스를 구현합니다.",
    color: "#ffb86c",
    delay: 0.8
  }
];

const WhatWeBuild = () => {
  return (
    <Section id="what-we-build">
      <Container>
        <Header>
          <Label
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Our Teams
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            무엇을 만드는가
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            우리는 아이디어를 현실로 만들기 위해 4개의 핵심 파트가 협력하여 하나의 완전한 프로덕트를 탄생시킵니다.
          </Description>
        </Header>
        <Grid>
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              color={pillar.color}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: pillar.delay }}
            >
              <IconWrapper className="icon-wrapper">
                {pillar.icon}
              </IconWrapper>
              <CardTitle>{pillar.title}</CardTitle>
              <CardText>
                {pillar.desc}
              </CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default WhatWeBuild;
