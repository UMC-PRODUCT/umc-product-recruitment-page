import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px 150px;
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
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

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 60px;
  position: relative;
  z-index: 10;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(102, 252, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.active ? 'rgba(102, 252, 241, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#fff' : '#8b949e'};
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(102, 252, 241, 0.1);
    color: #fff;
  }

  ${props => props.active && `
    box-shadow: 0 0 20px rgba(102, 252, 241, 0.2);
  `}
`;

// Isometric Cover Flow Carousel Styles
const CarouselContainer = styled(motion.div)`
  perspective: 2000px; /* Increased for a flatter, wider look */
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
  width: 380px;
  height: 480px;
  background: ${props => props.$isActive ? props.$color : '#0a0c10'}; /* Solid dark background to prevent text overlap */
  border: 1px solid ${props => props.$isActive ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 24px;
  padding: 40px;
  cursor: grab;
  box-shadow: ${props => props.$isActive ? `0 20px 50px ${props.$color}55` : '0 10px 30px rgba(0,0,0,0.6)'};
  display: flex;
  flex-direction: column;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;

  &:active {
    cursor: grabbing;
  }

  /* Z-index bump when active */
  ${props => props.$isActive && `
    z-index: 20 !important;
  `}

  @media (max-width: 768px) {
    width: 320px;
    height: 450px;
    padding: 30px 20px;
  }

  /* Dim inactive text to emphasize focus and depth */
  opacity: ${props => props.$isActive ? 1 : 0.4};
  transition: opacity 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;

  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-heading);
    letter-spacing: 0.5px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  li {
    color: #c9d1d9;
    font-size: 1.05rem;
    padding-left: 24px;
    position: relative;
    line-height: 1.5;

    &::before {
      content: '✦';
      color: #66fcf1;
      position: absolute;
      left: 0;
      top: 2px;
      font-size: 0.9rem;
    }
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  position: relative;
  z-index: 20;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#66fcf1' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${props => props.$active ? '0 0 10px rgba(102, 252, 241, 0.5)' : 'none'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? '#66fcf1' : 'rgba(255, 255, 255, 0.5)'};
    transform: scale(1.2);
  }
`;

const sprintData = {
  dev: [
    {
      title: '💻 Web Sprint',
      color: '#2962FF',
      items: [
        'React/Vue 기반의 SPA 아키텍처 설계',
        '컴포넌트 단위의 UI 구현 및 상태 관리',
        '서버 API 연동 및 비동기 통신 처리',
        '배포 파이프라인(CI/CD) 구축 및 최적화'
      ]
    },
    {
      title: '⚙️ Server Sprint',
      color: '#00C853',
      items: [
        'RESTful API 설계 및 명세서 작성',
        '관계형/비관계형 데이터베이스 스키마 설계',
        'Spring Boot/Node.js 기반의 비즈니스 로직 구현',
        '보안(JWT, OAuth) 및 성능 최적화(Caching)'
      ]
    },
    {
      title: '🍎 iOS Sprint',
      color: '#FF5722',
      items: [
        'iOS 26 패러다임 개발 및 최신 기술 스택 적용',
        '애플 워치 연동 및 홈 화면 위젯 개발',
        '유지보수와 확장을 고려한 모듈화 개발',
        'TestFlight를 통한 배포 및 QA 진행'
      ]
    },
    {
      title: '🤖 Android Sprint',
      color: '#00BCD4',
      items: [
        'Jetpack Compose / XML 기반의 모듈러 아키텍처를 통한 개발',
        'Material Design 가이드를 준수하는 UI 구현',
        'Retrofit, Room 등 필수 라이브러리 활용',
        'Google Play Store 배포 준비 및 테스트'
      ]
    }
  ],
  design: [
    {
      title: '💻 Web Design Sprint',
      color: '#FFB300',
      items: [
        '데스크탑 및 모바일 웹 뷰에 최적화된 반응형 UI 설계',
        '그리드 시스템 및 웹 타이포그래피 활용',
        '웹 접근성 및 브라우저 호환성 고려',
        '인터랙션 및 마이크로 애니메이션 기획'
      ]
    },
    {
      title: '🍎 iOS Design Sprint',
      color: '#651FFF',
      items: [
        'Apple Human Interface Guidelines(HIG) 이해',
        'iOS 특화 네비게이션 및 컴포넌트 활용',
        '동적인 화면 전환 및 제스처 기반 인터랙션 기획',
        '개발자와의 에셋 핸드오프 패키징'
      ]
    },
    {
      title: '🤖 Android Design Sprint',
      color: '#F50057',
      items: [
        'Google Material Design 3 시스템 이해',
        '안드로이드 폼팩터 다양성을 고려한 레이아웃',
        '시스템 UI(상태바, 네비게이션바)와의 통합',
        '명확한 피드백을 위한 애니메이션/트랜지션 기획'
      ]
    }
  ]
};

const Sprints = () => {
  const [activeTab, setActiveTab] = useState('dev');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50; // Minimum distance to register a swipe
    if (offset.x < -swipeThreshold && activeIndex < sprintData[activeTab].length - 1) {
      setActiveIndex(prev => prev + 1); // Swipe left, go next
    } else if (offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1); // Swipe right, go prev
    }
  };

  const calculateTransform = (i) => {
    const diff = i - activeIndex;
    const absDiff = Math.abs(diff);
    const direction = Math.sign(diff);

    // Wider horizontal layout metrics
    const xOffset = isMobile ? 180 : 380; // Spread cards further apart initially
    const xMultiplier = isMobile ? 60 : 120; // Spread subsequent cards further

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
      z: -(absDiff * 100), // Less severe depth pushback
      rotateY: direction * -35, // Less severe rotation for wider reading layout
      scale: 1 - (absDiff * 0.05), // Slight scale down
      opacity: absDiff > 2 ? 0 : 1, // Keep opacity high since we use dimming in CSS
      zIndex: 10 - absDiff
    };
  };

  return (
    <Section id="sprints">
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            스프린트 커리큘럼
          </Title>
        </Header>

        <TabContainer>
          <Tab
            active={activeTab === 'dev'}
            onClick={() => handleTabChange('dev')}
          >
            개발 스프린트
          </Tab>
          <Tab
            active={activeTab === 'design'}
            onClick={() => handleTabChange('design')}
          >
            디자인 스프린트
          </Tab>
        </TabContainer>

        <AnimatePresence mode="wait">
          <CarouselContainer
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {sprintData[activeTab].map((sprint, idx) => (
              <CarouselCard
                key={idx}
                $isActive={idx === activeIndex}
                $color={sprint.color}
                onClick={() => setActiveIndex(idx)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={calculateTransform(idx)}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <h3>{sprint.title}</h3>
                <ul>
                  {sprint.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CarouselCard>
            ))}
          </CarouselContainer>
        </AnimatePresence>

        <Indicators>
          {sprintData[activeTab].map((_, idx) => (
            <Dot
              key={idx}
              $active={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </Indicators>

      </Container>
    </Section>
  );
};

export default Sprints;
