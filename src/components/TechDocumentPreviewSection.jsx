import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const iosDocCover = new URL('../assets/docs/ios/io1.jpg', import.meta.url).href;
const iosDocPage2 = new URL('../assets/docs/ios/io2.jpg', import.meta.url).href;
const iosDesignDocCover = new URL('../assets/docs/ios-design/iod1.jpg', import.meta.url).href;
const iosDesignDocPage2 = new URL('../assets/docs/ios-design/iod2.jpg', import.meta.url).href;
const androidDocCover = new URL('../assets/docs/android/a1.jpg', import.meta.url).href;
const androidDocPage2 = new URL('../assets/docs/android/a2.jpg', import.meta.url).href;
const androidDesignDocCover = new URL('../assets/docs/android-design/ad1.jpg', import.meta.url).href;
const androidDesignDocPage2 = new URL('../assets/docs/android-design/ad2.jpg', import.meta.url).href;
const serverDocCover = new URL('../assets/docs/server/s1.jpg', import.meta.url).href;
const serverDocPage2 = new URL('../assets/docs/server/s2.jpg', import.meta.url).href;

const Section = styled.section`
  padding: 0 20px 120px;

  @media (max-width: 768px) {
    padding: 0 16px 96px;
  }
`;

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`;

const Shell = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(132, 196, 255, 0.18);
  background: linear-gradient(160deg, rgba(10, 18, 33, 0.95), rgba(6, 12, 22, 0.98));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  padding: 34px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 15% 10%, rgba(94, 170, 255, 0.12), transparent 24%),
      radial-gradient(circle at 88% 8%, rgba(102, 252, 241, 0.1), transparent 28%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 22px 18px;
    border-radius: 24px;
  }
`;

const Header = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 980px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderCopy = styled.div`
  max-width: 720px;
`;

const Label = styled(motion.span)`
  display: inline-flex;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(132, 214, 255, 0.28);
  background: rgba(88, 169, 255, 0.1);
  color: #8deaff;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled(motion.h2)`
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.15;
  margin-bottom: 12px;
  word-break: keep-all;
`;

const Desc = styled(motion.p)`
  color: rgba(206, 220, 242, 0.84);
  font-size: 1rem;
  line-height: 1.7;
  word-break: keep-all;
`;

const PartTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 980px) {
    width: calc(100% + 4px);
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
    margin-right: -4px;
    scroll-snap-type: x proximity;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const PartTab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(132, 214, 255, 0.34)' : 'rgba(132, 160, 196, 0.14)')};
  background: ${({ $active }) => ($active ? 'rgba(132, 214, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)')};
  color: ${({ $active }) => ($active ? '#eef8ff' : 'rgba(195, 211, 236, 0.76)')};
  font-size: 0.84rem;
  font-weight: 700;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-1px)')};
    border-color: ${({ disabled, $active }) => (disabled ? 'rgba(132, 160, 196, 0.14)' : $active ? 'rgba(132, 214, 255, 0.34)' : 'rgba(132, 214, 255, 0.22)')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  @media (max-width: 980px) {
    scroll-snap-align: start;
  }
`;

const PartState = styled.span`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'rgba(102, 252, 241, 0.14)' : 'rgba(255, 255, 255, 0.06)')};
  color: ${({ $active }) => ($active ? '#8deaff' : 'rgba(193, 206, 229, 0.62)')};
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Layout = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 320px) minmax(0, 1fr);
  gap: 22px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled.div`
  padding: 22px 20px;
  border-radius: 24px;
  border: 1px solid rgba(132, 196, 255, 0.16);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012));
  display: grid;
  gap: 16px;
  align-self: start;
`;

const MetaKicker = styled.span`
  color: #8deaff;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MetaTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  font-family: var(--font-heading);
  line-height: 1.2;
`;

const MetaText = styled.p`
  color: rgba(200, 215, 238, 0.84);
  line-height: 1.65;
`;

const MetaGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const MetaCard = styled.div`
  padding: 14px 14px 12px;
  border-radius: 18px;
  border: 1px solid rgba(132, 196, 255, 0.12);
  background: rgba(255, 255, 255, 0.028);
`;

const MetaLabel = styled.span`
  display: inline-flex;
  margin-bottom: 8px;
  color: rgba(144, 226, 248, 0.88);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MetaValue = styled.p`
  color: #eef5ff;
  font-weight: 700;
  line-height: 1.55;
`;

const MetaNote = styled.p`
  padding: 14px 14px 0;
  border-top: 1px solid rgba(132, 196, 255, 0.12);
  color: rgba(186, 202, 226, 0.72);
  font-size: 0.84rem;
  line-height: 1.58;
`;

const PreviewStage = styled.div`
  padding: 22px;
  border-radius: 28px;
  border: 1px solid rgba(132, 196, 255, 0.16);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  min-width: 0;

  @media (max-width: 980px) {
    padding: 16px;
    border-radius: 22px;
  }
`;

const MobileStageCue = styled.div`
  display: none;

  @media (max-width: 980px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 0 0 14px;
    padding: 10px 12px;
    border-radius: 16px;
    border: 1px solid rgba(132, 196, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(196, 213, 236, 0.82);
    font-size: 0.76rem;
    line-height: 1.45;

    & > span:nth-child(2) {
      flex: 1;
      min-width: 0;
      word-break: auto-phrase;
      overflow-wrap: anywhere;
    }
  }
`;

const MobileStagePart = styled.span`
  color: #eef8ff;
  font-weight: 800;
  letter-spacing: 0.04em;
`;

const StageTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;

  @media (max-width: 980px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 14px;
  }
`;

const StageTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  font-family: var(--font-heading);
`;

const StageSub = styled.p`
  color: rgba(189, 205, 229, 0.76);
  font-size: 0.9rem;
  line-height: 1.55;

  @media (max-width: 980px) {
    font-size: 0.96rem;
    line-height: 1.6;
    word-break: keep-all;
  }
`;

const StageBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 999px;
  border: 1px solid rgba(132, 214, 255, 0.22);
  background: rgba(132, 214, 255, 0.08);
  color: #eaf6ff;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 980px) {
    width: auto;
    max-width: 100%;
    padding: 8px 12px;
    font-size: 0.78rem;
  }
`;

const StageDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #66fcf1;
  box-shadow: 0 0 12px rgba(102, 252, 241, 0.68);
`;

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 980px) {
    grid-auto-flow: column;
    grid-auto-columns: minmax(100%, 100%);
    grid-template-columns: none;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 6px;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const PageCard = styled(motion.div)`
  padding: 14px;
  border-radius: 24px;
  border: 1px solid rgba(132, 196, 255, 0.14);
  background: linear-gradient(160deg, rgba(9, 16, 29, 0.92), rgba(6, 10, 20, 0.98));
  box-shadow: 0 18px 36px rgba(3, 10, 20, 0.28);
  @media (max-width: 980px) {
    padding: 12px;
    border-radius: 20px;
    scroll-snap-align: start;
    width: 100%;
  }
`;

const PageMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const PageLabel = styled.span`
  color: #eef6ff;
  font-size: 0.9rem;
  font-weight: 700;
`;

const PageHint = styled.span`
  color: rgba(187, 203, 227, 0.7);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const PageFrame = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 210 / 297;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(10, 14, 24, 0.86), rgba(6, 10, 18, 0.96));
  border: 1px solid rgba(132, 196, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
`;

const PageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
`;

const ImageGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(4, 8, 18, 0.18));
  pointer-events: none;
`;

const ImageCaption = styled.div`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(132, 196, 255, 0.16);
  background: rgba(7, 13, 24, 0.74);
  backdrop-filter: blur(12px);
  color: #eef5ff;

  @media (max-width: 980px) {
    left: 10px;
    right: 10px;
    bottom: 10px;
    padding: 8px 10px;
    border-radius: 12px;
  }
`;

const CaptionTitle = styled.p`
  font-size: 0.86rem;
  font-weight: 800;
  margin-bottom: 4px;

  @media (max-width: 980px) {
    font-size: 0.78rem;
  }
`;

const CaptionSub = styled.p`
  color: rgba(190, 206, 229, 0.78);
  font-size: 0.76rem;
  line-height: 1.5;

  @media (max-width: 980px) {
    font-size: 0.68rem;
    line-height: 1.45;
  }
`;

const MobilePageCount = styled.span`
  display: none;

  @media (max-width: 980px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    min-width: 96px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(132, 214, 255, 0.1);
    color: #8deaff;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const docs = [
  {
    key: 'ios',
    name: 'iOS',
    state: 'Preview',
    available: true,
    title: 'iOS 기술문서 미리보기',
    stageTitle: 'iOS Document Sneak Peek',
    stageBadge: 'iOS Preview Active',
    description: '`UMC APP v1` iOS 기술문서를 랜딩 안에서 바로 읽어볼 수 있는 티저 형태로 구성했습니다. 실제 업로드된 iOS 1, 2페이지 이미지를 바로 노출합니다.',
    document: 'iOS 기술문서 / UMC APP v1',
    pages: '업로드된 1페이지 표지 + 2페이지 본문',
    highlights: '실제 표지 디자인, 프로젝트 개요, 모듈 구성, iOS 26 · Liquid Glass 기술 포인트',
    page1Label: 'Page 01',
    page1Hint: 'Cover Preview',
    page1Title: 'iOS 기술문서 표지',
    page1Sub: '타이틀, 버전, 제작자 표기가 담긴 실제 1페이지를 그대로 보여줍니다.',
    page1Src: iosDocCover,
    page2Label: 'Page 02',
    page2Hint: 'Content Preview',
    page2Title: '본문 2페이지 미리보기',
    page2Sub: '프로젝트 개요, 모듈 구성, iOS 26 기반 기술 포인트가 담긴 실제 문서 본문입니다.',
    page2Src: iosDocPage2,
  },
  {
    key: 'ios-design',
    name: 'iOS Design',
    state: 'Preview',
    available: true,
    title: 'iOS Design 기술문서 미리보기',
    stageTitle: 'iOS Design Document Preview',
    stageBadge: 'iOS Design Uploaded',
    description: 'iOS Design 파트 문서도 실제 업로드된 1, 2페이지 이미지를 기준으로 동일한 프리뷰 UI에서 확인할 수 있도록 연결했습니다.',
    document: 'iOS Design 기술문서',
    pages: '업로드된 1페이지 표지 + 2페이지 본문',
    highlights: '표지 레이아웃, 디자인 시스템 관점, iOS 26 UI/UX 흐름',
    page1Label: 'Page 01',
    page1Hint: 'Cover Preview',
    page1Title: 'iOS Design 문서 표지',
    page1Sub: 'iOS Design 파트의 문서 첫 페이지를 그대로 프리뷰합니다.',
    page1Src: iosDesignDocCover,
    page2Label: 'Page 02',
    page2Hint: 'Content Preview',
    page2Title: 'iOS Design 본문 미리보기',
    page2Sub: '디자인 시스템과 화면 구조가 담긴 실제 문서 2페이지입니다.',
    page2Src: iosDesignDocPage2,
  },
  {
    key: 'android',
    name: 'Android',
    state: 'Preview',
    available: true,
    title: 'Android 기술문서 미리보기',
    stageTitle: 'Android Document Preview',
    stageBadge: 'Android Uploaded',
    description: 'Android 파트 문서도 같은 카드형 스테이지에서 확인할 수 있게 연결했습니다. 업로드된 첫 2페이지 이미지가 그대로 노출됩니다.',
    document: 'Android 기술문서',
    pages: '업로드된 1페이지 표지 + 2페이지 본문',
    highlights: 'Android 기술 구조, 구현 방향, 실제 문서 썸네일',
    page1Label: 'Page 01',
    page1Hint: 'Cover Preview',
    page1Title: 'Android 문서 표지',
    page1Sub: 'Android 파트 문서의 실제 첫 페이지입니다.',
    page1Src: androidDocCover,
    page2Label: 'Page 02',
    page2Hint: 'Content Preview',
    page2Title: 'Android 본문 미리보기',
    page2Sub: 'Android 파트의 실제 본문 페이지를 랜딩 안에서 바로 확인할 수 있습니다.',
    page2Src: androidDocPage2,
  },
  {
    key: 'android-design',
    name: 'Android Design',
    state: 'Preview',
    available: true,
    title: 'Android Design 기술문서 미리보기',
    stageTitle: 'Android Design Document Preview',
    stageBadge: 'Android Design Uploaded',
    description: 'Android Design 파트도 동일한 프리뷰 UI에서 실제 업로드 이미지 기반으로 확인할 수 있게 구성했습니다.',
    document: 'Android Design 기술문서',
    pages: '업로드된 1페이지 표지 + 2페이지 본문',
    highlights: '디자인 문서 표지, Android UI 구조, 화면 설계 프리뷰',
    page1Label: 'Page 01',
    page1Hint: 'Cover Preview',
    page1Title: 'Android Design 문서 표지',
    page1Sub: 'Android Design 파트의 문서 표지를 그대로 프리뷰합니다.',
    page1Src: androidDesignDocCover,
    page2Label: 'Page 02',
    page2Hint: 'Content Preview',
    page2Title: 'Android Design 본문 미리보기',
    page2Sub: 'Android Design 문서의 두 번째 페이지를 직접 보여줍니다.',
    page2Src: androidDesignDocPage2,
  },
  {
    key: 'server',
    name: 'Server',
    state: 'Preview',
    available: true,
    title: 'Server 기술문서 미리보기',
    stageTitle: 'Server Document Preview',
    stageBadge: 'Server Uploaded',
    description: 'Server 문서도 업로드된 실제 이미지 기준으로 연결했습니다. 현재는 1페이지와 업로드된 후반 본문 페이지를 프리뷰로 보여줍니다.',
    document: 'Server 기술문서',
    pages: '업로드된 1페이지 표지 + 후반 본문 페이지',
    highlights: '서버 아키텍처 문서, 기술 스택, 구현 개요',
    page1Label: 'Page 01',
    page1Hint: 'Cover Preview',
    page1Title: 'Server 문서 표지',
    page1Sub: 'Server 파트 문서의 첫 페이지 프리뷰입니다.',
    page1Src: serverDocCover,
    page2Label: 'Page 04',
    page2Hint: 'Content Preview',
    page2Title: 'Server 본문 미리보기',
    page2Sub: '업로드된 후반 본문 페이지를 기준으로 실제 문서 분위기를 보여줍니다.',
    page2Src: serverDocPage2,
  },
];

const TechDocumentPreviewSection = () => {
  const [activeKey, setActiveKey] = useState('ios');
  const activeDoc = docs.find((doc) => doc.key === activeKey) ?? docs[0];

  return (
    <Section>
      <Container>
        <Shell>
          <Header>
            <HeaderCopy>
              <Label
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                Tech Docs Preview
              </Label>
              <Title
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.52, delay: 0.06 }}
              >
                파트 기술 문서 미리보기
              </Title>
              <Desc
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.52, delay: 0.12 }}
              >
                각 파트가 어떤 수준의 기술 문서와 산출물을 만들어가는지 한눈에 볼 수 있도록 구성한 프리뷰 섹션입니다.
                업로드하신 실제 문서 이미지를 바탕으로, 파트별 표지와 본문 흐름을 랜딩 안에서 바로 비교해볼 수 있게 정리했습니다.
              </Desc>
            </HeaderCopy>
            <PartTabs>
              {docs.map((part) => (
                <PartTab
                  key={part.key}
                  type="button"
                  $active={part.key === activeKey}
                  onClick={() => {
                    if (!part.available) return;
                    setActiveKey(part.key);
                  }}
                  disabled={!part.available}
                >
                  <span>{part.name}</span>
                  <PartState $active={part.key === activeKey}>{part.state}</PartState>
                </PartTab>
              ))}
            </PartTabs>
          </Header>

          <Layout>
            <InfoPanel>
              <MetaKicker>Featured Doc</MetaKicker>
              <MetaTitle>{activeDoc.title}</MetaTitle>
              <MetaText>{activeDoc.description}</MetaText>
              <MetaGrid>
                <MetaCard>
                  <MetaLabel>Document</MetaLabel>
                  <MetaValue>{activeDoc.document}</MetaValue>
                </MetaCard>
                <MetaCard>
                  <MetaLabel>Pages Previewed</MetaLabel>
                  <MetaValue>{activeDoc.pages}</MetaValue>
                </MetaCard>
                <MetaCard>
                  <MetaLabel>Highlights</MetaLabel>
                  <MetaValue>{activeDoc.highlights}</MetaValue>
                </MetaCard>
              </MetaGrid>
              <MetaNote>
                현재 연결된 모든 파트는 실제 업로드 이미지가 반영된 상태입니다. 탭을 눌러 각 파트 문서를 바로 확인할 수 있습니다.
              </MetaNote>
            </InfoPanel>

            <PreviewStage>
              <MobileStageCue>
                <MobileStagePart>{activeDoc.name}</MobileStagePart>
                <span>좌우로 넘겨 표지와 본문을 확인하세요</span>
                <MobilePageCount>2 Pages</MobilePageCount>
              </MobileStageCue>

              <StageTop>
                <div>
                  <StageTitle>{activeDoc.stageTitle}</StageTitle>
                  <StageSub>업로드된 실제 문서 이미지를 기반으로, 표지와 본문 흐름이 한눈에 보이도록 정제한 프리뷰 레이아웃입니다.</StageSub>
                </div>
                <StageBadge>
                  <StageDot />
                  {activeDoc.stageBadge}
                </StageBadge>
              </StageTop>

              <PageGrid>
                <PageCard
                  key={`${activeDoc.key}-page-1`}
                  initial={{ opacity: 0, y: 18, rotate: -1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.46 }}
                >
                  <PageMeta>
                    <PageLabel>{activeDoc.page1Label}</PageLabel>
                    <PageHint>{activeDoc.page1Hint}</PageHint>
                  </PageMeta>
                  <PageFrame>
                    <PageImage src={activeDoc.page1Src} alt={`${activeDoc.name} 기술문서 첫 페이지 미리보기`} />
                    <ImageGlow />
                    <ImageCaption>
                      <CaptionTitle>{activeDoc.page1Title}</CaptionTitle>
                      <CaptionSub>{activeDoc.page1Sub}</CaptionSub>
                    </ImageCaption>
                  </PageFrame>
                </PageCard>

                <PageCard
                  key={`${activeDoc.key}-page-2`}
                  initial={{ opacity: 0, y: 18, rotate: 1.2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 1.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.46, delay: 0.08 }}
                >
                  <PageMeta>
                    <PageLabel>{activeDoc.page2Label}</PageLabel>
                    <PageHint>{activeDoc.page2Hint}</PageHint>
                  </PageMeta>
                  <PageFrame>
                    <PageImage src={activeDoc.page2Src} alt={`${activeDoc.name} 기술문서 두 번째 프리뷰`} />
                    <ImageGlow />
                    <ImageCaption>
                      <CaptionTitle>{activeDoc.page2Title}</CaptionTitle>
                      <CaptionSub>{activeDoc.page2Sub}</CaptionSub>
                    </ImageCaption>
                  </PageFrame>
                </PageCard>
              </PageGrid>
            </PreviewStage>
          </Layout>
        </Shell>
      </Container>
    </Section>
  );
};

export default TechDocumentPreviewSection;
