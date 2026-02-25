import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: 102px 20px 110px;

  @media (max-width: 768px) {
    padding: 82px 16px 150px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 34px;
`;

const Label = styled.span`
  display: inline-block;
  color: #8deaff;
  font-size: 0.88rem;
  letter-spacing: 0.1em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: clamp(2rem, 4.4vw, 3rem);
  margin-bottom: 12px;
  font-family: var(--font-heading);
  line-height: 1.2;
  word-break: keep-all;
  text-wrap: balance;

  @media (max-width: 768px) {
    max-width: 18ch;
    margin: 0 auto 12px;
    font-size: clamp(1.86rem, 8.6vw, 2.34rem);
    line-height: 1.24;
    letter-spacing: -0.01em;
  }
`;

const Desc = styled.p`
  color: rgba(206, 220, 244, 0.82);
  max-width: 760px;
  margin: 0 auto;
  font-size: 1.02rem;
  line-height: 1.65;
  word-break: keep-all;
  text-wrap: pretty;

  @media (max-width: 768px) {
    max-width: 34ch;
    font-size: 0.95rem;
    line-height: 1.62;
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const TrackCard = styled(motion.div)`
  position: relative;
  border: 1px solid ${({ themeColor }) => `${themeColor}35`};
  border-radius: 22px;
  background: linear-gradient(155deg, rgba(13, 22, 38, 0.88), rgba(8, 12, 22, 0.95));
  padding: 20px 20px 18px;
  overflow: hidden;
  min-height: 310px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 82% 0, ${({ themeColor }) => `${themeColor}24`}, transparent 58%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    min-height: 360px;
    padding: 18px 16px 16px;
  }
`;

const TrackHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
    margin-bottom: 12px;
  }
`;

const TrackName = styled.h3`
  color: #fff;
  font-size: 1.45rem;
  margin: 0;
  font-family: var(--font-heading);
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.95rem;
  }
`;

const Tag = styled.span`
  color: ${({ themeColor }) => themeColor};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  border: 1px solid ${({ themeColor }) => `${themeColor}40`};
  background: ${({ themeColor }) => `${themeColor}1a`};
  border-radius: 999px;
  padding: 6px 10px;
  max-width: 100%;
  word-break: keep-all;
  white-space: normal;
`;

const Pair = styled.div`
  margin-top: 8px;
  position: relative;
  z-index: 1;
`;

const PairLabel = styled.h4`
  color: rgba(194, 213, 240, 0.95);
  font-size: 0.86rem;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
`;

const PairText = styled.p`
  color: rgba(221, 234, 251, 0.9);
  font-size: 0.95rem;
  line-height: 1.58;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const DetailList = styled.ul`
  margin-top: 12px;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 1;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: rgba(209, 224, 247, 0.9);
    font-size: 0.9rem;
    line-height: 1.52;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
`;

const Bullet = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 8px;
  background: ${({ themeColor }) => themeColor};
`;

const MobileControls = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
    margin-top: 12px;
  }
`;

const NavButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(122, 194, 255, 0.35);
  background: rgba(11, 20, 36, 0.72);
  color: #e5f3ff;
  font-size: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const IndicatorRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Indicator = styled.button`
  width: ${({ $active }) => ($active ? '26px' : '9px')};
  height: 9px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(102, 252, 241, 0.48)' : 'rgba(255, 255, 255, 0.16)')};
  background: ${({ $active }) => ($active ? 'linear-gradient(90deg, #66fcf1, #8fc9ff)' : 'rgba(255, 255, 255, 0.24)')};
  transition: all 0.2s ease;
`;

const data = [
  {
    track: 'Web',
    theme: '백엔드 연계, 대시보드, 사용자 운영성',
    icon: '🌐',
    color: '#57B7FF',
    who: '웹 서비스 UX 개선에 집중하는 파트',
    mission: '실사용 데이터와 운영 흐름이 동시에 보이도록 설계합니다.',
    points: [
      '웹 대시보드/신규 화면 설계 중심',
      '컴포넌트 재사용성과 성능 최적화 동시 확보',
      '관리자/운영 화면까지 포함한 전체 흐름 개선'
    ]
  },
  {
    track: 'iOS',
    theme: 'iOS26 HIG, GlassEffect, Apple Watch',
    icon: '🍎',
    color: '#FF5E5E',
    who: '자연스러운 Apple 경험을 만드는 파트',
    mission: '모바일 핵심 서비스의 감성, 일관성, 연속성을 책임집니다.',
    points: [
      '실 서비스 기준 iOS26 HIG 반영',
      '위젯과 Live Activity, watchOS 경험 확장',
      '자연스러운 트랜지션·모션으로 몰입도 개선'
    ]
  },
  {
    track: 'Android',
    theme: '확장성과 적응형 UI',
    icon: '🤖',
    color: '#57D3A8',
    who: '다양한 화면/기기 최적화를 우선하는 파트',
    mission: '복잡한 기능을 직관적으로 줄여 사용성을 높입니다.',
    points: [
      '위젯과 핵심 화면 중심의 구조 설계',
      '안드로이드 생태계의 기기별 반응형 설계',
      '운영·개발 협업 체계를 유지보수 친화적으로 정리'
    ]
  }
];

const mobileCardVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? 54 : -54,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction >= 0 ? -54 : 54,
    opacity: 0,
    scale: 0.98
  })
};

const TrackComparisonSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goTo = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= data.length || nextIndex === activeIndex) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const handleDragEnd = (_, { offset, velocity }) => {
    const threshold = 65;
    if ((offset.x < -threshold || velocity.x < -420) && activeIndex < data.length - 1) {
      goTo(activeIndex + 1);
    } else if ((offset.x > threshold || velocity.x > 420) && activeIndex > 0) {
      goTo(activeIndex - 1);
    }
  };

  const renderCardContent = (item) => (
    <>
      <TrackHeader>
        <TrackName>{item.icon} {item.track}</TrackName>
        <Tag themeColor={item.color}>{item.theme}</Tag>
      </TrackHeader>

      <Pair>
        <PairLabel>포지션</PairLabel>
        <PairText>{item.who}</PairText>
      </Pair>

      <Pair>
        <PairLabel>핵심 미션</PairLabel>
        <PairText>{item.mission}</PairText>
      </Pair>

      <DetailList>
        {item.points.map((point) => (
          <li key={point}>
            <Bullet themeColor={item.color} />
            {point}
          </li>
        ))}
      </DetailList>
    </>
  );

  return (
    <Section id="tracks">
      <Container>
        <Header>
          <Label>Track Matrix</Label>
          <Title>Web, iOS, Android 트랙 한눈에 비교</Title>
          <Desc>
            포지션별 역할이 어떻게 달라지는지 빠르게 확인하고, 내게 맞는 트랙을 바로 점검하세요.
          </Desc>
        </Header>

        <ComparisonGrid>
          {isMobile ? (
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <TrackCard
                key={data[activeIndex].track}
                themeColor={data[activeIndex].color}
                variants={mobileCardVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
              >
                {renderCardContent(data[activeIndex])}
              </TrackCard>
            </AnimatePresence>
          ) : (
            data.map((item) => (
              <TrackCard
                key={item.track}
                themeColor={item.color}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {renderCardContent(item)}
              </TrackCard>
            ))
          )}
        </ComparisonGrid>

        {isMobile && (
          <MobileControls>
            <NavButton
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="이전 트랙"
            >
              ‹
            </NavButton>
            <IndicatorRow>
              {data.map((item, index) => (
                <Indicator
                  key={item.track}
                  type="button"
                  $active={index === activeIndex}
                  onClick={() => goTo(index)}
                  aria-label={`${item.track} 트랙으로 이동`}
                />
              ))}
            </IndicatorRow>
            <NavButton
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === data.length - 1}
              aria-label="다음 트랙"
            >
              ›
            </NavButton>
          </MobileControls>
        )}
      </Container>
    </Section>
  );
};

export default TrackComparisonSection;
