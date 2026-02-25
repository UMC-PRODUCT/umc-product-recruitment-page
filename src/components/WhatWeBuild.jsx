import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const mobilePulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(104, 207, 255, 0.22);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(104, 207, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(104, 207, 255, 0);
  }
`;

const Section = styled.section`
  padding: 120px 20px;
  background: transparent;
  position: relative;

  @media (max-width: 768px) {
    padding: 92px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 42px;
  }
`;

const Label = styled(motion.span)`
  color: #7deaff;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: inline-block;
`;

const Title = styled(motion.h2)`
  font-size: 3.2rem;
  color: #fff;
  margin-bottom: 24px;
  font-family: var(--font-heading);
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.14rem;
  color: rgba(201, 213, 233, 0.85);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const MobileHint = styled.p`
  display: none;
  text-align: center;
  color: rgba(221, 237, 255, 0.92);
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  margin: -16px auto 16px;
  width: fit-content;
  padding: 8px 13px;
  border-radius: 999px;
  border: 1px solid rgba(130, 201, 255, 0.36);
  background: rgba(12, 24, 42, 0.72);
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    display: block;
    animation: ${mobilePulse} 2.2s ease-out infinite;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0;
  }
`;

const DesktopGrid = styled(Grid)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileDeck = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileToggle = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    width: 100%;
    margin-bottom: 12px;
    padding: 6px;
    border-radius: 999px;
    border: 1px solid rgba(140, 196, 255, 0.24);
    background: rgba(9, 18, 33, 0.72);
    backdrop-filter: blur(10px);
    gap: 6px;
  }
`;

const ToggleButton = styled.button`
  flex: 1;
  border-radius: 999px;
  padding: 10px 12px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ $active }) => ($active ? '#eef8ff' : 'rgba(181, 199, 228, 0.82)')};
  background: ${({ $active }) => ($active ? 'linear-gradient(120deg, rgba(103, 215, 255, 0.24), rgba(110, 140, 255, 0.24))' : 'transparent')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(123, 216, 255, 0.44)' : 'transparent')};
`;

const Card = styled(motion.div)`
  background: linear-gradient(162deg, rgba(15, 23, 38, 0.86), rgba(7, 12, 22, 0.94));
  border: 1px solid var(--line-soft);
  border-radius: 24px;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ color }) => `linear-gradient(90deg, transparent, ${color || '#74e0ff'}, transparent)`};
    opacity: 0.82;
    transition: all 0.35s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 0%, ${({ color }) => `${color || '#74e0ff'}2f`}, transparent 54%);
    opacity: 0.5;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ color }) => `${color}66`};
    transform: translateY(-9px);
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.34), 0 10px 34px ${({ color }) => `${color}35`};
    
    &::before {
      opacity: 1;
      height: 4px;
    }

    &::after {
      opacity: 1;
    }

    .icon-wrapper {
      transform: scale(1.08);
      box-shadow: 0 0 24px ${({ color }) => `${color}56`};
    }
  }

  @media (max-width: 768px) {
    padding: 24px 18px;
    min-height: auto;
    border-radius: 18px;
    align-items: flex-start;
    text-align: left;

    &:hover {
      transform: none;
      box-shadow: none;
      border-color: var(--line-soft);
    }
  }
`;

const MobileCardFrame = styled.div`
  position: relative;
  min-height: 0;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

const PartBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ color }) => color || '#74e0ff'};
  border: 1px solid ${({ color }) => `${color || '#74e0ff'}66`};
  background: ${({ color }) => `${color || '#74e0ff'}1f`};
`;

const PartIndex = styled.span`
  color: rgba(183, 205, 236, 0.72);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  font-weight: 600;
`;

const MobileControls = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 12px;
    margin-top: 14px;
    width: min(980px, 100%);
    margin-left: auto;
    margin-right: auto;
  }
`;

const MobileArrow = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid rgba(113, 186, 255, 0.3);
  background: linear-gradient(150deg, rgba(10, 19, 34, 0.86), rgba(5, 11, 22, 0.78));
  color: rgba(241, 246, 255, 0.9);
  font-size: 1.5rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.24s ease;

  &:hover {
    background: linear-gradient(150deg, rgba(15, 31, 55, 0.92), rgba(6, 16, 30, 0.86));
    border-color: rgba(119, 219, 255, 0.58);
    box-shadow: 0 0 24px rgba(107, 212, 255, 0.26);
  }

  &:disabled {
    opacity: 0.36;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const MobileDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
`;

const MobileDot = styled.button`
  width: ${({ $active }) => ($active ? '26px' : '9px')};
  height: 9px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'linear-gradient(90deg, #66fcf1, #8fc9ff)' : 'rgba(255, 255, 255, 0.24)')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(102, 252, 241, 0.48)' : 'rgba(255, 255, 255, 0.15)')};
  transition: all 0.2s ease;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  border: 1px solid rgba(190, 211, 245, 0.22);

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    font-size: 1.7rem;
    margin-bottom: 14px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 16px;
  font-family: var(--font-heading);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 10px;
    width: 100%;
  }
`;

const CardText = styled.p`
  color: rgba(193, 205, 224, 0.84);
  line-height: 1.7;
  font-size: 0.98rem;
  word-break: keep-all;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.56;
  }
`;

const pillars = [
  {
    title: "Web",
    icon: "💻",
    desc: "전국 단위의 UMC 리크루팅 서비스와 중앙운영사무국을 위한 효율적인 통합 관리자 페이지(Admin)를 제작 및 운영합니다.",
    color: "#6699ff",
    group: "dev",
    delay: 0.2
  },
  {
    title: "Server",
    icon: "⚙️",
    desc: "대규모 트래픽을 처리할 수 있는 분산 아키텍처 설계 및 CI/CD 자동화를 통해 탄탄하고 확장 가능한 핵심 인프라를 구축합니다.",
    color: "#46e891",
    group: "dev",
    delay: 0.4
  },
  {
    title: "iOS",
    icon: "🍎",
    desc: "Apple Watch 및 홈 화면 위젯 연동, 최신 iOS 환경 전반의 성능 개선을 통해 한 차원 높은 모바일 서비스 경험을 제공합니다.",
    color: "#ff66a3",
    group: "dev",
    delay: 0.6
  },
  {
    title: "Android",
    icon: "🤖",
    desc: "다양한 폼팩터에 대응하는 유연한 UI설계와 백그라운드 프로세스 고도화를 통해 안정적이고 생동감 넘치는 서비스를 구현합니다.",
    color: "#ffb86c",
    group: "dev",
    delay: 0.8
  },
  {
    title: "Web Design",
    icon: "🎨",
    desc: "복잡한 데이터도 직관적으로 이해할 수 있는 대시보드와 컴포넌트 중심의 확장형 디자인 시스템을 설계합니다.",
    color: "#8e7bff",
    group: "design",
    delay: 1
  },
  {
    title: "iOS Design",
    icon: "🍏",
    desc: "iOS 26 HIG 기반으로 서비스 디자인을 설계하고, Apple Watch UI와 홈 화면 위젯 디자인으로 확장해 일관된 사용자 경험을 완성합니다.",
    color: "#b28dff",
    group: "design",
    delay: 1.1
  },
  {
    title: "Android Design",
    icon: "📱",
    desc: "정보 구조를 재정리하고 가이드를 통합해, 다양한 안드로이드 환경에서 명확하고 정돈된 사용자 흐름을 구축합니다.",
    color: "#ff7fb7",
    group: "design",
    delay: 1.2
  }
];

const WhatWeBuild = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeGroup, setActiveGroup] = useState('dev');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobilePillars = pillars.filter((pillar) => pillar.group === activeGroup);
  const activePillar = mobilePillars[activeIndex];

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveIndex(0);
  };

  const goPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setActiveIndex((prev) => Math.min(prev + 1, mobilePillars.length - 1));

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 70;
    if ((info.offset.x < -swipeThreshold || info.velocity.x < -420) && activeIndex < mobilePillars.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if ((info.offset.x > swipeThreshold || info.velocity.x > 420) && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

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
            UMC Product는 10기부터 실제 운영에 투입됩니다.
            <br />
            UMC 챌린저와 운영진이 매일 사용하는 서비스를 당신이 직접 개선하고 확장하게 됩니다.
          </Description>
        </Header>
        <MobileHint>개발/디자인을 전환하고 카드를 넘겨 핵심 파트를 확인해보세요.</MobileHint>

        <DesktopGrid>
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              color={pillar.color}
              initial={isMobile ? { opacity: 0, y: 28, scale: 0.97 } : { opacity: 0, y: 40 }}
              whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: isMobile ? 0.48 : 0.8,
                delay: isMobile ? Math.min(index * 0.06, 0.36) : pillar.delay
              }}
              whileTap={isMobile ? { scale: 0.985 } : undefined}
            >
              <CardMeta>
                <PartBadge color={pillar.color}>Part</PartBadge>
                <PartIndex>{String(index + 1).padStart(2, '0')} / {pillars.length}</PartIndex>
              </CardMeta>
              <IconWrapper className="icon-wrapper">
                {pillar.icon}
              </IconWrapper>
              <CardTitle>{pillar.title}</CardTitle>
              <CardText>
                {pillar.desc}
              </CardText>
            </Card>
          ))}
        </DesktopGrid>

        <MobileDeck>
          <MobileToggle>
            <ToggleButton
              type="button"
              $active={activeGroup === 'dev'}
              onClick={() => handleGroupChange('dev')}
            >
              개발 파트
            </ToggleButton>
            <ToggleButton
              type="button"
              $active={activeGroup === 'design'}
              onClick={() => handleGroupChange('design')}
            >
              디자인 파트
            </ToggleButton>
          </MobileToggle>

          <MobileCardFrame>
            <AnimatePresence mode="wait">
              {activePillar && (
                <Card
                  key={`${activeGroup}-${activeIndex}`}
                  color={activePillar.color}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.98 }}
                  transition={{ duration: 0.36 }}
                  whileTap={{ scale: 0.985 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={handleDragEnd}
                >
                  <CardMeta>
                    <PartBadge color={activePillar.color}>Part</PartBadge>
                    <PartIndex>{String(pillars.findIndex((item) => item.title === activePillar.title) + 1).padStart(2, '0')} / {pillars.length}</PartIndex>
                  </CardMeta>
                  <IconWrapper className="icon-wrapper">
                    {activePillar.icon}
                  </IconWrapper>
                  <CardTitle>{activePillar.title}</CardTitle>
                  <CardText>{activePillar.desc}</CardText>
                </Card>
              )}
            </AnimatePresence>
          </MobileCardFrame>

          <MobileControls>
            <MobileArrow onClick={goPrev} disabled={activeIndex === 0} aria-label="이전 파트">
              ‹
            </MobileArrow>
            <MobileDots>
              {mobilePillars.map((_, idx) => (
                <MobileDot
                  key={idx}
                  type="button"
                  $active={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`${idx + 1}번 카드 보기`}
                />
              ))}
            </MobileDots>
            <MobileArrow onClick={goNext} disabled={activeIndex === mobilePillars.length - 1} aria-label="다음 파트">
              ›
            </MobileArrow>
          </MobileControls>
        </MobileDeck>
      </Container>
    </Section>
  );
};

export default WhatWeBuild;
