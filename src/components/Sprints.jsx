import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return null;
  return {
    r: parseInt(cleanHex.slice(0, 2), 16),
    g: parseInt(cleanHex.slice(2, 4), 16),
    b: parseInt(cleanHex.slice(4, 6), 16)
  };
};

const withAlpha = (hex, alpha) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(255, 255, 255, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

const Section = styled.section`
  padding: 120px 20px 150px;
  background: transparent;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 96px 16px 132px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 52px;

  @media (max-width: 768px) {
    margin-bottom: 36px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3.4rem;
  color: #fff;
  margin-bottom: 16px;
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 2.35rem;
    line-height: 1.26;
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(229, 233, 242, 0.74);
  font-size: 1.08rem;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.75;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const TabContainer = styled.div`
  width: fit-content;
  display: inline-flex;
  justify-content: center;
  gap: 16px;
  margin: 0 auto 60px;
  padding: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
    max-width: 420px;
    margin: 0 auto 30px;
  }
`;

const Tab = styled.button`
  background: ${({ $active }) => ($active ? 'linear-gradient(120deg, rgba(73, 221, 248, 0.2), rgba(84, 130, 255, 0.22))' : 'transparent')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(108, 207, 255, 0.55)' : 'rgba(255, 255, 255, 0.08)')};
  color: ${({ $active }) => ($active ? '#fff' : '#94a5bf')};
  padding: 13px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  min-width: 160px;

  &:hover {
    background: rgba(102, 252, 241, 0.12);
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid rgba(102, 252, 241, 0.7);
    outline-offset: 2px;
  }

  ${({ $active }) => $active && `
    box-shadow: 0 10px 26px rgba(56, 199, 246, 0.24);
  `}

  @media (max-width: 768px) {
    flex: 1;
    min-width: unset;
    font-size: 0.92rem;
    padding: 12px 18px;
  }
`;

const CarouselContainer = styled(motion.div)`
  perspective: 1900px;
  position: relative;
  height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transform-style: preserve-3d;
  
  @media (max-width: 768px) {
    perspective: none;
    transform-style: flat;
    height: auto;
    min-height: 0;
    display: block;
    max-width: 560px;
  }
`;

const CarouselCard = styled(motion.article)`
  position: ${({ $isMobile }) => ($isMobile ? 'relative' : 'absolute')};
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'clamp(280px, 31vw, 390px)')};
  height: ${({ $isMobile }) => ($isMobile ? 'auto' : '490px')};
  min-height: ${({ $isMobile }) => ($isMobile ? '380px' : '0')};
  background: linear-gradient(145deg, rgba(16, 20, 31, 0.96), rgba(6, 9, 15, 0.94));
  border: 1px solid ${({ $isActive, $color }) => ($isActive ? withAlpha($color, 0.58) : 'rgba(255, 255, 255, 0.08)')};
  border-radius: ${({ $isMobile }) => ($isMobile ? '20px' : '24px')};
  padding: ${({ $isMobile }) => ($isMobile ? '20px 16px 18px' : '30px 34px 34px')};
  cursor: ${({ $isMobile }) => ($isMobile ? 'default' : 'grab')};
  touch-action: ${({ $isMobile }) => ($isMobile ? 'auto' : 'pan-y')};
  box-shadow: ${({ $isActive, $color }) => ($isActive ? `0 22px 55px ${withAlpha($color, 0.3)}` : '0 12px 30px rgba(0, 0, 0, 0.55)')};
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  backdrop-filter: blur(8px);
  overflow: hidden;
  ${({ $isMobile, $isActive }) => $isMobile && !$isActive && 'display: none;'}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, ${({ $color }) => withAlpha($color, 0.26)}, transparent 58%);
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.35)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${({ $color }) => withAlpha($color, 0.2)}, ${({ $color }) => $color}, ${({ $color }) => withAlpha($color, 0.2)});
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.45)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:active {
    cursor: grabbing;
  }

  ${({ $isActive }) => $isActive && `
    z-index: 20 !important;
  `}

  opacity: ${({ $isMobile, $isActive }) => ($isMobile ? ($isActive ? 1 : 0) : ($isActive ? 1 : 0.72))};

  h3 {
    color: #fff;
    font-size: clamp(1.34rem, 2.7vw, 1.74rem);
    margin-bottom: 26px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-heading);
    letter-spacing: -0.01em;
    line-height: 1.2;
    position: relative;
    z-index: 1;
    white-space: normal;

    @media (max-width: 768px) {
      font-size: clamp(1.22rem, 5.4vw, 1.44rem);
      margin-bottom: 20px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 1;
    overflow-y: auto;
    padding-right: 6px;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(166, 186, 220, 0.4);
      border-radius: 999px;
    }

    @media (max-width: 768px) {
      overflow-y: visible;
      padding-right: 0;
    }
  }

  li {
    color: ${({ $isActive }) => ($isActive ? 'rgba(239, 244, 255, 0.92)' : 'rgba(204, 214, 232, 0.76)')};
    font-size: 0.95rem;
    padding-left: 24px;
    position: relative;
    line-height: 1.5;
    word-break: keep-all;
    overflow-wrap: anywhere;

    &::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 10px;
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: ${({ $color }) => $color};
      box-shadow: ${({ $color }) => `0 0 12px ${withAlpha($color, 0.75)}`};
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.45;
    }
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const TrackBadge = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => withAlpha($color, 0.16)};
  border: 1px solid ${({ $color }) => withAlpha($color, 0.36)};
  border-radius: 999px;
  padding: 7px 12px;
`;

const SlideIndex = styled.span`
  font-size: 0.8rem;
  color: rgba(190, 205, 228, 0.85);
  letter-spacing: 0.04em;
  font-weight: 600;
`;

const NavigationRow = styled.div`
  margin-top: 34px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  width: min(980px, 100%);
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 20;

  @media (max-width: 768px) {
    margin-top: 14px;
    gap: 12px;
    grid-template-columns: auto 1fr auto;
  }
`;

const ProgressHeader = styled.div`
  margin: 0 auto 18px;
  width: min(640px, 100%);
  text-align: center;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ProgressMeta = styled.p`
  color: rgba(212, 228, 249, 0.9);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 0.06em;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(146, 175, 215, 0.28);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  width: ${({ $percent }) => `${$percent}%`};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #8deaff, #76c8ff);
  transition: width 0.25s ease;
`;

const ProgressHint = styled.p`
  margin-top: 8px;
  color: rgba(179, 200, 227, 0.84);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
`;

const Indicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '26px' : '9px')};
  height: 9px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'linear-gradient(90deg, #66fcf1, #8fc9ff)' : 'rgba(255, 255, 255, 0.24)')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(102, 252, 241, 0.48)' : 'rgba(255, 255, 255, 0.15)')};
  transition: all 0.2s ease;
`;

const ArrowButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid rgba(122, 194, 255, 0.35);
  background: rgba(11, 20, 36, 0.72);
  color: #e5f3ff;
  font-size: 1.75rem;
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
    opacity: 0.38;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 1.25rem;
  }
`;

const sprintData = {
  dev: [
    {
      title: '💻 Web Sprint',
      color: '#2962FF',
      items: [
        '컴포넌트 단위의 재사용성 높은 아키텍처를 설계하고, 효율적인 상태 관리를 주도하실 분',
        '명확한 프론트엔드 코드 컨벤션을 확립하고, 체계적인 Git/PR 워크플로우를 구축하실 분'
      ]
    },
    {
      title: '🍎 iOS Sprint',
      color: '#FF5722',
      items: [
        'iOS 26에서 공개된 Apple의 새로운 디자인 언어를 실제 프로덕트에 적용하실 분',
        '빛과 환경에 반응하는 반투명 소재감, GlassEffect, 머티리얼 시스템을 직접 설계·구현하실 분',
        '기능 단위로 분리된 Tuist 기반 멀티 모듈 구조에서 빌드 최적화와 의존성 설계를 경험하실 분',
        '위젯, Live Activity, watchOS까지 확장되는 Apple 생태계 경험을 구현하실 분'
      ]
    },
    {
      title: '🤖 Android Sprint',
      color: '#00BCD4',
      items: [
        'Hilt 및 Clean Architecture 기반의 재사용성 높은 코드를 설계하고, 지속 가능한 유지보수 구조를 구축하실 분',
        '다양한 디바이스에 최적화된 적응형 UI와 사용자 중심의 매끄러운 워크플로우를 설계하실 분',
        '팀 전체가 활용 가능한 공통 컴포넌트를 개발하고 기술 가이드라인을 명확히 제시하실 분',
        '명확한 Issue 발행과 PR 작성으로 체계적이고 신뢰 중심의 협업 프로세스에 참여하실 분'
      ]
    },
    {
      title: '⚙️ Server Sprint',
      color: '#00C853',
      items: [
        '적절한 로깅 및 모니터링을 통해 자동화된 서버 리소스 관리 시스템을 구축해보고 싶으신 분',
        'k6 기반 성능/부하 테스트로 병목 지점을 파악하고 AWS 클라우드 인프라의 최적 인스턴스를 선정해보고 싶으신 분',
        'RBAC · ABAC 기반으로 복잡한 권한 및 관리 체계를 설계하고 개선해보고 싶으신 분',
        '실사용자가 있는 서비스에서 마이그레이션 및 점진적 개선을 함께 경험하고 싶으신 분',
        '헥사고날 아키텍처를 실무에 적용해보고 싶으신 분',
        '팀 컨벤션을 존중하며 코드 스타일, Issue · PR 규칙을 준수해 협업하실 수 있는 분'
      ]
    }
  ],
  design: [
    {
      title: '💻 Web Design Sprint',
      color: '#FFB300',
      items: [
        '복잡한 데이터를 한눈에 파악할 수 있는 직관적이고 심플한 대시보드 UI/UX에 관심이 많으신 분',
        '컴포넌트 기반의 확장 가능한 디자인 시스템을 구축하고, 세세한 디자인 가이드라인 문서화를 실천하실 분'
      ]
    },
    {
      title: '🍎 iOS Design Sprint',
      color: '#651FFF',
      items: [
        'iOS 26에서 공개된 Apple의 새로운 디자인 언어를 깊이 이해하고, 실제 서비스에 자연스럽게 적용하실 분',
        '빛과 배경에 반응하는 반투명 레이어, GlassEffect, 머티리얼 시스템을 활용해 공간감 있는 UI를 설계하실 분',
        '전환 애니메이션, 버튼 반응, 스크롤 인터랙션까지 포함한 부드러운 사용자 경험을 설계하실 분',
        '카드, 모달, 네비게이션 등 모든 요소가 하나의 공간 안에서 유기적으로 연결되도록 구조를 설계하실 분',
        '위젯, Live Activity, watchOS까지 확장되는 Apple 생태계 전반의 경험을 일관되게 디자인하실 분',
        '컬러, 타이포그래피, 여백, 모서리 곡률 등 세부 요소까지 정리하여 디자인 시스템을 구축하실 분'
      ]
    },
    {
      title: '🤖 Android Design Sprint',
      color: '#F50057',
      items: [
        '현재 서비스의 UI를 분석하고 문제점을 도출하여, 더 직관적이고 정돈된 화면으로 개선하실 분',
        '복잡한 정보 구조를 재정리하여 사용자가 더 빠르게 이해할 수 있는 인터페이스로 리디자인하실 분',
        '기존 컴포넌트의 일관성을 점검하고, 통일된 디자인 가이드로 정비하실 분',
        '홈 화면에서 핵심 정보를 명확하게 전달할 수 있는 Android 위젯을 설계하실 분',
        '작은 위젯 영역 안에서도 정보의 우선순위를 정리하고 가독성을 극대화하실 분',
        '위젯과 앱 본 화면 간의 흐름을 자연스럽게 연결하여 일관된 사용자 경험을 설계하실 분'
      ]
    }
  ]
};

const mobileCardVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? 64 : -64,
    opacity: 0,
    scale: 0.97
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction >= 0 ? -64 : 64,
    opacity: 0,
    scale: 0.97
  })
};

const Sprints = () => {
  const [activeTab, setActiveTab] = useState('dev');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileDirection, setMobileDirection] = useState(1);
  const currentSprintCount = sprintData[activeTab].length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveIndex(0);
    setMobileDirection(1);
  };

  const goToIndex = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= currentSprintCount || nextIndex === activeIndex) return;
    setMobileDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 70;
    if ((offset.x < -swipeThreshold || velocity.x < -420) && activeIndex < currentSprintCount - 1) {
      goToIndex(activeIndex + 1);
    } else if ((offset.x > swipeThreshold || velocity.x > 420) && activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }
  };

  const calculateTransform = (i) => {
    const diff = i - activeIndex;
    const absDiff = Math.abs(diff);
    const direction = Math.sign(diff);

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

    if (isMobile) {
      return {
        x: direction * (220 + absDiff * 50),
        z: -(absDiff * 90),
        rotateY: direction * -18,
        scale: 1 - (absDiff * 0.08),
        opacity: absDiff > 1 ? 0 : 0.7,
        zIndex: 10 - absDiff
      };
    }

    return {
      x: direction * (340 + absDiff * 130),
      z: -(absDiff * 130),
      rotateY: direction * -28,
      scale: 1 - (absDiff * 0.06),
      opacity: absDiff > 2 ? 0 : 0.88,
      zIndex: 12 - absDiff
    };
  };

  const handleKeyNavigation = (event) => {
    if (event.key === 'ArrowRight' && activeIndex < currentSprintCount - 1) {
      goToIndex(activeIndex + 1);
    }

    if (event.key === 'ArrowLeft' && activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }
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
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          실무 플로우를 압축한 트랙별 미션으로, 기획부터 구현과 배포까지 직접 완주합니다.
        </Subtitle>

        <ProgressHeader>
          <ProgressMeta>{activeIndex + 1} / {currentSprintCount}</ProgressMeta>
          <ProgressBar>
            <ProgressFill $percent={((activeIndex + 1) / currentSprintCount) * 100} />
          </ProgressBar>
          <ProgressHint>좌우 버튼 또는 스와이프해서 스프린트를 전환하세요.</ProgressHint>
        </ProgressHeader>
      </Header>

        <TabContainer>
          <Tab
            $active={activeTab === 'dev'}
            onClick={() => handleTabChange('dev')}
            aria-pressed={activeTab === 'dev'}
          >
            개발 스프린트
          </Tab>
          <Tab
            $active={activeTab === 'design'}
            onClick={() => handleTabChange('design')}
            aria-pressed={activeTab === 'design'}
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
            role="region"
            aria-label={`${activeTab === 'dev' ? '개발' : '디자인'} 스프린트 캐러셀`}
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
          >
            {isMobile ? (
              <AnimatePresence custom={mobileDirection} mode="wait" initial={false}>
                <CarouselCard
                  key={`${activeTab}-${activeIndex}`}
                  custom={mobileDirection}
                  variants={mobileCardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  $isActive
                  $color={sprintData[activeTab][activeIndex].color}
                  $isMobile
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={handleDragEnd}
                  aria-selected
                >
                  <CardMeta>
                    <TrackBadge $color={sprintData[activeTab][activeIndex].color}>Track</TrackBadge>
                    <SlideIndex>{activeIndex + 1} / {currentSprintCount}</SlideIndex>
                  </CardMeta>
                  <h3>{sprintData[activeTab][activeIndex].title}</h3>
                  <ul>
                    {sprintData[activeTab][activeIndex].items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CarouselCard>
              </AnimatePresence>
            ) : (
              sprintData[activeTab].map((sprint, idx) => (
                <CarouselCard
                  key={idx}
                  $isActive={idx === activeIndex}
                  $color={sprint.color}
                  $isMobile={false}
                  onClick={() => setActiveIndex(idx)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={handleDragEnd}
                  initial={false}
                  animate={calculateTransform(idx)}
                  transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                  aria-selected={idx === activeIndex}
                >
                  <CardMeta>
                    <TrackBadge $color={sprint.color}>Track</TrackBadge>
                    <SlideIndex>{idx + 1} / {currentSprintCount}</SlideIndex>
                  </CardMeta>
                  <h3>{sprint.title}</h3>
                  <ul>
                    {sprint.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CarouselCard>
              ))
            )}
          </CarouselContainer>
        </AnimatePresence>

        <NavigationRow>
          <ArrowButton
            onClick={() => goToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous sprint"
          >
            ‹
          </ArrowButton>
          <Indicators>
            {sprintData[activeTab].map((_, idx) => (
              <Dot
                key={idx}
                $active={idx === activeIndex}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </Indicators>
          <ArrowButton
            onClick={() => goToIndex(activeIndex + 1)}
            disabled={activeIndex === currentSprintCount - 1}
            aria-label="Next sprint"
          >
            ›
          </ArrowButton>
        </NavigationRow>
      </Container>
    </Section>
  );
};

export default Sprints;
