import React, { useState } from 'react';
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
  padding: 120px 20px 180px;
  background: transparent;
  position: relative;

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
  margin-bottom: 64px;

  @media (max-width: 768px) {
    margin-bottom: 34px;
  }
`;

const Label = styled(motion.span)`
  display: inline-block;
  color: #80e8ff;
  font-size: 0.92rem;
  letter-spacing: 0.18em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 14px;
`;

const Title = styled(motion.h2)`
  font-size: 3.4rem;
  color: #fff;
  margin-bottom: 18px;
  font-family: var(--font-heading);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.35rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(206, 218, 241, 0.78);
  font-size: 1.08rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const RailLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 390px) minmax(0, 1fr);
  gap: 26px;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;

const RailNav = styled.div`
  border-radius: 24px;
  border: 1px solid var(--line-soft);
  background: linear-gradient(155deg, rgba(14, 21, 36, 0.84), rgba(7, 12, 22, 0.92));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 16px 14px;
    border-radius: 18px;
  }
`;

const RailTitle = styled.p`
  color: rgba(196, 210, 236, 0.78);
  font-size: 0.84rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-left: 8px;
`;

const RailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    overflow: visible;
    padding: 0;
  }
`;

const RailStep = styled(motion.div)`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  min-height: 56px;

  @media (max-width: 768px) {
    min-width: 0;
    grid-template-columns: 1fr;
    gap: 0;
    min-height: auto;
  }
`;

const Marker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MarkerDot = styled.div`
  width: ${({ $isActive }) => ($isActive ? '12px' : '10px')};
  height: ${({ $isActive }) => ($isActive ? '12px' : '10px')};
  border-radius: 999px;
  margin-top: 6px;
  background: ${({ $visited, $color }) => ($visited ? $color : 'rgba(172, 187, 217, 0.4)')};
  box-shadow: ${({ $isActive, $color }) => ($isActive ? `0 0 16px ${withAlpha($color, 0.75)}` : 'none')};
  transition: all 0.25s ease;
`;

const MarkerLine = styled.div`
  width: 2px;
  flex: 1;
  margin-top: 4px;
  border-radius: 999px;
  background: ${({ $visited, $color }) => ($visited ? `linear-gradient(180deg, ${withAlpha($color, 0.9)}, ${withAlpha($color, 0.32)})` : 'rgba(151, 170, 205, 0.24)')};
`;

const RailButton = styled.button`
  text-align: left;
  border-radius: 14px;
  padding: 12px 14px;
  background: ${({ $active, $color }) => ($active ? `linear-gradient(120deg, ${withAlpha($color, 0.2)}, ${withAlpha($color, 0.1)})` : 'transparent')};
  border: 1px solid ${({ $active, $color }) => ($active ? withAlpha($color, 0.62) : 'transparent')};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ $color }) => withAlpha($color, 0.45)};
    background: ${({ $color }) => withAlpha($color, 0.12)};
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 2px solid rgba(102, 252, 241, 0.6);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.99);
  }

  @media (max-width: 768px) {
    padding: 11px 12px;

    &:hover {
      transform: none;
    }
  }
`;

const RailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 2px;
  }
`;

const RailNum = styled.span`
  color: ${({ $active, $color }) => ($active ? $color : 'rgba(166, 182, 209, 0.74)')};
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const RailName = styled.span`
  color: ${({ $active }) => ($active ? '#f7fbff' : 'rgba(203, 215, 236, 0.8)')};
  font-size: 0.98rem;
  font-weight: ${({ $active }) => ($active ? '700' : '600')};

  @media (max-width: 768px) {
    white-space: normal;
    font-size: 0.92rem;
  }
`;

const RailSub = styled.p`
  color: ${({ $active }) => ($active ? 'rgba(219, 231, 250, 0.84)' : 'rgba(162, 180, 209, 0.72)')};
  font-size: 0.88rem;
  line-height: 1.45;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 0.82rem;
  }
`;

const DetailPanel = styled.article`
  position: relative;
  border-radius: 24px;
  border: 1px solid ${({ $color }) => withAlpha($color, 0.55)};
  background: linear-gradient(150deg, rgba(15, 23, 38, 0.92), rgba(8, 13, 24, 0.95));
  box-shadow: 0 20px 48px ${({ $color }) => withAlpha($color, 0.2)};
  overflow: hidden;
  min-height: 490px;

  @media (max-width: 1024px) {
    min-height: 440px;
  }

  @media (max-width: 768px) {
    min-height: 400px;
    border-radius: 18px;
    min-height: 0;
  }
`;

const PanelGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 0%, ${({ $color }) => withAlpha($color, 0.26)}, transparent 56%);
  pointer-events: none;
`;

const PanelBody = styled(motion.div)`
  position: relative;
  z-index: 1;
  padding: 30px 32px 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
  touch-action: pan-y;

  @media (max-width: 768px) {
    padding: 22px 18px;
  }
`;

const PanelMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const ValueBadge = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => withAlpha($color, 0.16)};
  border: 1px solid ${({ $color }) => withAlpha($color, 0.38)};
  border-radius: 999px;
  padding: 7px 12px;
`;

const IndexText = styled.span`
  font-size: 0.82rem;
  color: rgba(192, 208, 233, 0.84);
  letter-spacing: 0.04em;
  font-weight: 600;
`;

const PanelTitle = styled.h3`
  color: #ffffff;
  font-size: clamp(1.65rem, 3vw, 2.3rem);
  line-height: 1.18;
  letter-spacing: -0.01em;
  margin-bottom: 14px;
  word-break: keep-all;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: clamp(1.35rem, 6.4vw, 1.75rem);
    line-height: 1.24;
  }
`;

const PanelSubtitle = styled.p`
  color: ${({ $color }) => withAlpha($color, 0.95)};
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
`;

const PanelDesc = styled.p`
  color: rgba(225, 235, 250, 0.9);
  font-size: 1.04rem;
  line-height: 1.75;
  word-break: keep-all;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.62;
  }
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const Keyword = styled.span`
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.82rem;
  color: rgba(225, 238, 255, 0.9);
  border: 1px solid ${({ $color }) => withAlpha($color, 0.35)};
  background: ${({ $color }) => withAlpha($color, 0.12)};
`;

const Controls = styled.div`
  margin-top: auto;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-top: 22px;
  }
`;

const DotRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '26px' : '9px')};
  height: 9px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'linear-gradient(90deg, #66fcf1, #8fc9ff)' : 'rgba(255, 255, 255, 0.24)')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(102, 252, 241, 0.48)' : 'rgba(255, 255, 255, 0.15)')};
  transition: all 0.2s ease;
`;

const ArrowControls = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ArrowButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
  color: #e8f3ff;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(102, 252, 241, 0.12);
    border-color: rgba(102, 252, 241, 0.42);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const visions = [
  {
    id: 1,
    num: '01',
    color: '#79C2FF',
    icon: '🎯',
    title: 'User Value First',
    titleKo: '사용자 가치 최우선',
    desc: '기능보다 문제 해결을 먼저 봅니다. 사용자가 실제로 더 편해지는 변화인지 끝까지 검증합니다.',
    keywords: ['User Problem', 'Practical Value', 'Outcome']
  },
  {
    id: 2,
    num: '02',
    color: '#5FD9B8',
    icon: '🔍',
    title: 'Clarity in Craft',
    titleKo: '명확한 완성도',
    desc: '복잡함을 단순하게 정리합니다. 정보 구조, 화면 흐름, 코드 구조를 모두 읽기 쉽게 다듬습니다.',
    keywords: ['Clear UI', 'Readable Code', 'Consistency']
  },
  {
    id: 3,
    num: '03',
    color: '#FFB86B',
    icon: '⚡️',
    title: 'Fast Experiment',
    titleKo: '빠른 실험과 학습',
    desc: '작게 만들고 빠르게 확인합니다. 실패 비용은 줄이고 학습 속도는 높여 더 나은 답에 빨리 도달합니다.',
    keywords: ['Ship Fast', 'Validate Early', 'Learn Quickly']
  },
  {
    id: 4,
    num: '04',
    color: '#A994FF',
    icon: '🤝',
    title: 'One Team, One Context',
    titleKo: '열린 협업',
    desc: '정보를 독점하지 않고 공유합니다. 직군을 넘어 같은 맥락에서 의사결정하고 실행합니다.',
    keywords: ['Shared Context', 'Transparent Communication', 'Co-creation']
  },
  {
    id: 5,
    num: '05',
    color: '#66E8FF',
    icon: '🧩',
    title: 'System Thinking',
    titleKo: '구조적 문제 해결',
    desc: '증상보다 원인을 봅니다. 단기 처방이 아닌 재발을 줄이는 시스템 단위 해결책을 설계합니다.',
    keywords: ['Root Cause', 'System Design', 'Scalable Fix']
  },
  {
    id: 6,
    num: '06',
    color: '#FF7CAD',
    icon: '🎉',
    title: 'Playful Product',
    titleKo: '재미와 몰입',
    desc: '일은 진지하게, 경험은 즐겁게 만듭니다. 작은 인터랙션과 감성적인 디테일로 사용자의 몰입을 높입니다.',
    keywords: ['Delight', 'Immersive UX', 'Meaningful Motion']
  },
  {
    id: 7,
    num: '07',
    color: '#8FE388',
    icon: '🌱',
    title: 'Sustainable Impact',
    titleKo: '지속 가능한 임팩트',
    desc: '단기 성과보다 오래가는 변화를 만듭니다. 팀과 프로덕트가 함께 건강하게 성장하는 구조를 지향합니다.',
    keywords: ['Long-term Value', 'Healthy Process', 'Team Growth']
  }
];

const Vision = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVision = visions[activeIndex];

  const goPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setActiveIndex((prev) => Math.min(prev + 1, visions.length - 1));

  const handleKeyNavigation = (event) => {
    if ((event.key === 'ArrowDown' || event.key === 'ArrowRight') && activeIndex < visions.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }

    if ((event.key === 'ArrowUp' || event.key === 'ArrowLeft') && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <Section id="visions">
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
            실행력, 완성도, 협업, 그리고 재미까지.
            <br />
            우리 팀이 제품을 만드는 방식을 7가지 비전으로 정리했습니다.
          </Subtitle>
        </Header>

        <DesktopOnly>
          <RailLayout>
          <RailNav
            role="region"
            aria-label="비전 레일"
            tabIndex={0}
            onKeyDown={handleKeyNavigation}
          >
            <RailTitle>Vision Rail</RailTitle>
            <RailList>
              {visions.map((vision, idx) => {
                const isActive = idx === activeIndex;
                const isVisited = idx <= activeIndex;
                const isLast = idx === visions.length - 1;

                return (
                  <RailStep
                    key={vision.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <Marker>
                      <MarkerDot
                        $isActive={isActive}
                        $visited={isVisited}
                        $color={vision.color}
                      />
                      {!isLast && (
                        <MarkerLine
                          $visited={idx < activeIndex}
                          $color={vision.color}
                        />
                      )}
                    </Marker>
                    <RailButton
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      $active={isActive}
                      $color={vision.color}
                      aria-pressed={isActive}
                    >
                      <RailRow>
                        <RailNum $active={isActive} $color={vision.color}>{vision.num}</RailNum>
                        <RailName $active={isActive}>{vision.icon} {vision.title}</RailName>
                      </RailRow>
                      <RailSub $active={isActive}>{vision.titleKo}</RailSub>
                    </RailButton>
                  </RailStep>
                );
              })}
            </RailList>
          </RailNav>

          <DetailPanel $color={activeVision.color}>
            <PanelGlow $color={activeVision.color} />
            <AnimatePresence mode="wait">
              <PanelBody
                key={activeVision.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <PanelMeta>
                  <ValueBadge $color={activeVision.color}>Vision</ValueBadge>
                  <IndexText>{activeIndex + 1} / {visions.length}</IndexText>
                </PanelMeta>

                <PanelTitle>{activeVision.icon} {activeVision.title}</PanelTitle>
                <PanelSubtitle $color={activeVision.color}>{activeVision.titleKo}</PanelSubtitle>
                <PanelDesc>{activeVision.desc}</PanelDesc>

                <KeywordList>
                  {activeVision.keywords.map((keyword) => (
                    <Keyword key={keyword} $color={activeVision.color}>{keyword}</Keyword>
                  ))}
                </KeywordList>

                <Controls>
                  <DotRow>
                    {visions.map((_, idx) => (
                      <Dot
                        key={idx}
                        $active={idx === activeIndex}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to vision ${idx + 1}`}
                      />
                    ))}
                  </DotRow>

                  <ArrowControls>
                    <ArrowButton onClick={goPrev} disabled={activeIndex === 0} aria-label="Previous vision">
                      ‹
                    </ArrowButton>
                    <ArrowButton onClick={goNext} disabled={activeIndex === visions.length - 1} aria-label="Next vision">
                      ›
                    </ArrowButton>
                  </ArrowControls>
                </Controls>
              </PanelBody>
            </AnimatePresence>
          </DetailPanel>
          </RailLayout>
        </DesktopOnly>

        <MobileOnly>
          <DetailPanel $color={activeVision.color}>
            <PanelGlow $color={activeVision.color} />
            <AnimatePresence mode="wait">
              <PanelBody
                key={`mobile-${activeVision.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <PanelMeta>
                  <ValueBadge $color={activeVision.color}>Vision</ValueBadge>
                  <IndexText>{activeIndex + 1} / {visions.length}</IndexText>
                </PanelMeta>

                <PanelTitle>{activeVision.icon} {activeVision.title}</PanelTitle>
                <PanelSubtitle $color={activeVision.color}>{activeVision.titleKo}</PanelSubtitle>
                <PanelDesc>{activeVision.desc}</PanelDesc>

                <KeywordList>
                  {activeVision.keywords.map((keyword) => (
                    <Keyword key={keyword} $color={activeVision.color}>{keyword}</Keyword>
                  ))}
                </KeywordList>

                <Controls>
                  <DotRow>
                    {visions.map((_, idx) => (
                      <Dot
                        key={idx}
                        $active={idx === activeIndex}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to vision ${idx + 1}`}
                      />
                    ))}
                  </DotRow>

                  <ArrowControls>
                    <ArrowButton onClick={goPrev} disabled={activeIndex === 0} aria-label="Previous vision">
                      ‹
                    </ArrowButton>
                    <ArrowButton onClick={goNext} disabled={activeIndex === visions.length - 1} aria-label="Next vision">
                      ›
                    </ArrowButton>
                  </ArrowControls>
                </Controls>
              </PanelBody>
            </AnimatePresence>
          </DetailPanel>
        </MobileOnly>
      </Container>
    </Section>
  );
};

export default Vision;
