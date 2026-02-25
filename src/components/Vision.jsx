import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px 180px;
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0b0f15;
  pointer-events: none;
  z-index: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Label = styled(motion.span)`
  color: rgba(102, 252, 241, 0.8);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: inline-block;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 24px;
  font-family: var(--font-heading);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: #8b949e;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

// Isometric Cover Flow Carousel Styles
const CarouselContainer = styled(motion.div)`
  perspective: 2000px;
  position: relative;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transform-style: preserve-3d;
  
  @media (max-width: 768px) {
    height: 480px;
  }
`;

const CarouselCard = styled(motion.div)`
  position: absolute;
  width: 340px;
  height: 480px;
  background: ${props => props.$isActive ? props.$color : '#12161c'}; /* Solid background to prevent overlap */
  border: 1px solid ${props => props.$isActive ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 12px;
  padding: 40px 30px;
  cursor: grab;
  box-shadow: ${props => props.$isActive ? `0 20px 50px ${props.$color}55` : '0 10px 30px rgba(0,0,0,0.6)'};
  display: flex;
  flex-direction: column;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 440px;
    padding: 30px 24px;
  }

  /* Emphasis on active */
  opacity: ${props => props.$isActive ? 1 : 0.4};
  transition: opacity 0.4s ease, background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const CardNumber = styled.span`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
  transition: color 0.4s ease;
`;

const ActiveContent = styled(motion.div)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  p {
    font-size: 1.35rem;
    line-height: 1.7;
    color: #fff;
    font-weight: 600;
    word-break: keep-all;
    white-space: pre-line;
    text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  }
`;

const InactiveContent = styled(motion.div)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-bottom: 10px;
`;

const LargeIcon = styled.div`
  font-size: 4.5rem;
  margin-bottom: auto;
  align-self: center;
  filter: grayscale(100%) opacity(0.3);
  transition: all 0.4s ease;

  ${CarouselCard}:hover & {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.1);
  }
`;

const TitleEn = styled.h3`
  font-size: 2rem;
  font-family: var(--font-heading);
  color: #fff;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

const TitleKo = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 60px;
  position: relative;
  z-index: 20;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${props => props.$active ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    transform: scale(1.2);
  }
`;

const visions = [
  { id: 1, num: '01', color: '#FF5722', icon: '🎯', title: 'User-Centric', titleKo: '사용자 중심', desc: '모든 결정의 중심에는 항상 사용자가 있습니다.\n사용자 경험을 최우선으로 생각합니다.' },
  { id: 2, num: '02', color: '#2962FF', icon: '📊', title: 'Data-Driven', titleKo: '데이터 기반', desc: '직관이 아닌 데이터에 기반하여\n객관적이고 정확한 의사결정을 내립니다.' },
  { id: 3, num: '03', color: '#00C853', icon: '⚡️', title: 'Agile Execution', titleKo: '애자일 실행', desc: '완벽함보다는 빠른 실행과 피드백을 통한\n반복적인 개선을 추구합니다.' },
  { id: 4, num: '04', color: '#FFB300', icon: '🤝', title: 'Collaborative', titleKo: '긴밀한 협업', desc: '서로 다른 전문성을 가진 팀원들의\n긴밀한 협업으로 시너지를 극대화합니다.' },
  { id: 5, num: '05', color: '#651FFF', icon: '🧩', title: 'Problem Solving', titleKo: '문제 해결', desc: '표면적인 현상이 아닌 본질적인 문제를\n깊이 파고들어 창의적으로 해결합니다.' },
  { id: 6, num: '06', color: '#00BCD4', icon: '✨', title: 'Continuous Polish', titleKo: '끝없는 다듬음', desc: '타협하지 않고 끊임없이 디테일을 다듬어\n프로덕트의 완성도를 높입니다.' },
  { id: 7, num: '07', color: '#F50057', icon: '🌱', title: 'Sustainable', titleKo: '지속 가능한', desc: '단기적인 성과를 넘어 프로덕트와 팀의\n지속 가능한 성장을 목표로 합니다.' }
];

const Vision = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold && activeIndex < visions.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const calculateTransform = (i) => {
    const diff = i - activeIndex;
    const absDiff = Math.abs(diff);
    const direction = Math.sign(diff);

    // Wider horizontal layout metrics
    const xOffset = isMobile ? 160 : 340;
    const xMultiplier = isMobile ? 50 : 110;

    if (diff === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10
      };
    }

    return {
      x: direction * (xOffset + absDiff * xMultiplier),
      z: -(absDiff * 120),
      rotateY: direction * -40,
      scale: 1 - (absDiff * 0.05),
      opacity: absDiff > 2 ? 0 : 1, // Let CSS handle opacity damping
      zIndex: 10 - absDiff
    };
  };

  return (
    <Section id="visions">
      <DarkOverlay />
      <Container>
        <Header>
          <Label
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Values
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            우리의 7가지 비전
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            본질적이고 깊이 있는 7가지 코어 밸류를 바탕으로, 압도적인 퀄리티의 프로덕트를 만듭니다.
          </Subtitle>
        </Header>

        <CarouselContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {visions.map((node, idx) => (
            <CarouselCard
              key={node.id}
              $isActive={activeIndex === idx}
              $color={node.color}
              onClick={() => setActiveIndex(idx)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={false}
              animate={calculateTransform(idx)}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <CardHeader>
                <CardNumber $isActive={activeIndex === idx}>{node.num}</CardNumber>
              </CardHeader>

              <AnimatePresence mode="wait">
                {activeIndex === idx ? (
                  <ActiveContent
                    key={`active-${node.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{node.desc}</p>
                  </ActiveContent>
                ) : (
                  <InactiveContent
                    key={`inactive-${node.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LargeIcon>{node.icon}</LargeIcon>
                    <div>
                      <TitleEn>{node.title}</TitleEn>
                      <TitleKo>{node.titleKo}</TitleKo>
                    </div>
                  </InactiveContent>
                )}
              </AnimatePresence>
            </CarouselCard>
          ))}
        </CarouselContainer>

        <Indicators>
          {visions.map((_, idx) => (
            <Dot
              key={idx}
              $active={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to vision ${idx + 1}`}
            />
          ))}
        </Indicators>

      </Container>
    </Section>
  );
};

export default Vision;
