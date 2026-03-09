import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const Section = styled.section`
  padding: 110px 20px 0;

  @media (max-width: 768px) {
    padding: 84px 16px 0;
  }
`;

const Container = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`;

const Block = styled.div`
  margin-bottom: 28px;
  padding: 34px;
  border-radius: 28px;
  border: 1px solid rgba(140, 188, 255, 0.2);
  background: linear-gradient(160deg, rgba(12, 20, 35, 0.88), rgba(7, 12, 22, 0.95));
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 85% 10%, rgba(102, 252, 241, 0.12), transparent 35%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 24px 18px;
    margin-bottom: 18px;
    border-radius: 22px;
  }
`;

const Label = styled(motion.span)`
  display: inline-flex;
  margin-bottom: 14px;
  padding: 7px 13px;
  border-radius: 999px;
  border: 1px solid rgba(132, 214, 255, 0.3);
  background: rgba(88, 169, 255, 0.12);
  color: #8deaff;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled(motion.h2)`
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.2;
  margin-bottom: 14px;
  word-break: keep-all;
`;

const Description = styled(motion.p)`
  color: rgba(210, 222, 243, 0.9);
  font-size: 1.02rem;
  line-height: 1.74;
  word-break: keep-all;
`;

const SummaryBar = styled(Block)`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

const SummaryIntro = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }
`;

const SummaryIntroCopy = styled.div`
  max-width: 640px;
`;

const SummaryIntroTitle = styled.h3`
  color: #fff;
  font-size: clamp(1.4rem, 2.6vw, 2.1rem);
  font-family: var(--font-heading);
  line-height: 1.2;
  margin-bottom: 8px;
  word-break: keep-all;
`;

const SummaryIntroText = styled.p`
  color: rgba(194, 209, 232, 0.82);
  line-height: 1.65;
  word-break: keep-all;
`;

const SummarySignal = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(132, 214, 255, 0.22);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(227, 237, 248, 0.92);
  font-size: 0.86rem;
  font-weight: 700;
  white-space: nowrap;
`;

const SummarySignalDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #66fcf1;
  box-shadow: 0 0 14px rgba(102, 252, 241, 0.68);
`;

const SummaryGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.article`
  grid-column: span 3;
  padding: 20px 18px 18px;
  border-radius: 20px;
  border: 1px solid rgba(136, 196, 255, 0.16);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.028), rgba(255, 255, 255, 0.012));
  min-height: 124px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 0% 0%, rgba(111, 196, 255, 0.13), transparent 42%);
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    grid-column: auto;
  }

  @media (max-width: 640px) {
    min-height: 0;
  }
`;

const SummaryCtaCard = styled(SummaryCard)`
  grid-column: span 3;
  background:
    radial-gradient(circle at 100% 0%, rgba(102, 252, 241, 0.18), transparent 34%),
    linear-gradient(155deg, rgba(17, 31, 54, 0.96), rgba(8, 14, 26, 0.98));
  border-color: rgba(132, 214, 255, 0.24);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 18px 38px rgba(3, 12, 24, 0.28);

  @media (max-width: 1024px) {
    grid-column: auto;
  }
`;

const SummaryEyebrow = styled.span`
  display: inline-flex;
  margin-bottom: 12px;
  color: #8deaff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
`;

const SummaryMetricRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 8px;
`;

const SummaryFigure = styled.span`
  color: #fff;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
`;

const SummaryFigureUnit = styled.span`
  color: rgba(170, 228, 248, 0.9);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transform: translateY(-4px);
`;

const SummaryValue = styled.p`
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.45;
  word-break: auto-phrase;
  overflow-wrap: anywhere;
  position: relative;
  z-index: 1;
`;

const SummarySub = styled.p`
  margin-top: 8px;
  color: rgba(190, 206, 229, 0.82);
  font-size: 0.86rem;
  line-height: 1.52;
  word-break: auto-phrase;
  overflow-wrap: anywhere;
  position: relative;
  z-index: 1;
`;

const SummaryButton = styled.a`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px 18px;
  border-radius: 16px;
  text-decoration: none;
  background: linear-gradient(120deg, #f5f9ff, #dff5ff);
  color: #101827;
  font-size: 0.98rem;
  font-weight: 800;
  box-shadow: 0 12px 28px rgba(128, 206, 255, 0.22);
  position: relative;
  z-index: 1;
  margin-top: 14px;
`;

const SummaryAccent = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #dff7ff;
  font-size: 1.05rem;
  background: rgba(111, 196, 255, 0.1);
  border: 1px solid rgba(132, 214, 255, 0.2);
`;

const OverviewHero = styled(Block)`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 24px 18px;
  }
`;

const OverviewGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(340px, 0.82fr);
  gap: 28px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const OverviewLeft = styled.div`
  display: grid;
  gap: 18px;
`;

const OverviewKicker = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(150, 223, 248, 0.92);
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    gap: 10px;
    font-size: 0.74rem;
    letter-spacing: 0.08em;
  }
`;

const OverviewKickerLine = styled.span`
  width: 44px;
  height: 1px;
  background: linear-gradient(90deg, rgba(141, 234, 255, 0.72), transparent);

  @media (max-width: 768px) {
    width: 28px;
  }
`;

const OverviewTitle = styled(motion.h2)`
  color: #fff;
  font-family: var(--font-heading);
  font-size: clamp(2.15rem, 4.5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 18px;
  letter-spacing: -0.03em;
  word-break: auto-phrase;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: clamp(2.1rem, 10.5vw, 3rem);
    line-height: 1.04;
    margin-bottom: 10px;
    letter-spacing: -0.025em;
  }
`;

const NoBreak = styled.span`
  white-space: nowrap;
`;

const OverviewBody = styled(motion.p)`
  color: rgba(208, 221, 242, 0.88);
  font-size: 1.05rem;
  line-height: 1.76;
  max-width: 860px;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 0.96rem;
    line-height: 1.72;
    word-break: auto-phrase;
    overflow-wrap: anywhere;
  }
`;

const OverviewSignalRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const OverviewActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const OverviewActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 196px;
  padding: 14px 18px;
  border-radius: 999px;
  text-decoration: none;
  color: #eaf5ff;
  font-weight: 800;
  letter-spacing: 0.01em;
  border: 1px solid rgba(132, 214, 255, 0.22);
  background: linear-gradient(160deg, rgba(17, 33, 57, 0.82), rgba(10, 18, 31, 0.92));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(132, 214, 255, 0.38);
    box-shadow: 0 16px 30px rgba(4, 12, 24, 0.22);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
    padding: 13px 16px;
    font-size: 0.98rem;
  }
`;

const OverviewSignalCard = styled.article`
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(136, 196, 255, 0.13);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.012));
`;

const OverviewSignalLabel = styled.span`
  display: inline-flex;
  margin-bottom: 8px;
  color: #8deaff;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const OverviewSignalValue = styled.p`
  color: rgba(238, 244, 255, 0.94);
  line-height: 1.54;
  font-weight: 700;
  word-break: auto-phrase;
  overflow-wrap: anywhere;
`;

const OverviewLeadCard = styled(motion.div)`
  position: relative;
  padding: 24px 24px 22px;
  border-radius: 26px;
  border: 1px solid rgba(141, 206, 255, 0.2);
  background:
    radial-gradient(circle at 100% 0%, rgba(102, 252, 241, 0.12), transparent 38%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.038), rgba(255, 255, 255, 0.015));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 18px 40px rgba(3, 11, 23, 0.18);
  transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 100% 0%, rgba(102, 252, 241, 0.12), transparent 38%);
    opacity: 0.8;
    pointer-events: none;
    transition: opacity 0.24s ease, transform 0.24s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(141, 206, 255, 0.3);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 34px rgba(4, 12, 24, 0.22);

    &::before {
      opacity: 1;
      transform: scale(1.03);
    }
  }
`;

const OverviewLeadTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const OverviewLeadTitle = styled.h3`
  color: #fff;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-family: var(--font-heading);
`;

const OverviewLeadBadge = styled.span`
  display: inline-flex;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(132, 214, 255, 0.22);
  background: rgba(132, 214, 255, 0.09);
  color: #8deaff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: normal;
  word-break: keep-all;
`;

const OverviewLeadList = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 10px;
`;

const OverviewLeadItem = styled.div`
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 14px 14px 14px 14px;
  border-radius: 20px;
  border: 1px solid rgba(136, 196, 255, 0.13);
  background: rgba(255, 255, 255, 0.025);
  color: rgba(233, 240, 250, 0.9);
  line-height: 1.6;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateX(4px);
    border-color: rgba(136, 196, 255, 0.22);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const OverviewLeadIndex = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8deaff;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: rgba(132, 214, 255, 0.1);
  border: 1px solid rgba(132, 214, 255, 0.18);
`;

const OverviewLeadText = styled.p`
  color: rgba(233, 240, 250, 0.9);
  line-height: 1.62;
  word-break: keep-all;
`;

const OverviewLeadFooter = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(133, 180, 240, 0.14);
  color: rgba(190, 206, 229, 0.78);
  font-size: 0.84rem;
  line-height: 1.55;
`;

const OverviewBottomGrid = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const OverviewMetric = styled.article`
  padding: 18px 18px 16px;
  border-radius: 20px;
  border: 1px solid rgba(136, 196, 255, 0.13);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.012));
  transition: transform 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(136, 196, 255, 0.24);
  }
`;

const OverviewMetricNo = styled.span`
  display: inline-flex;
  margin-bottom: 10px;
  color: #8deaff;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const OverviewMetricText = styled.p`
  color: rgba(233, 240, 250, 0.9);
  line-height: 1.62;
`;

const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: grid;
  gap: 12px;
`;

const HighlightItem = styled.li`
  padding: 15px 18px;
  border-radius: 18px;
  border: 1px solid rgba(136, 196, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(232, 240, 251, 0.92);
  line-height: 1.65;
`;

const TimelineMeta = styled.p`
  margin-top: 8px;
  color: #9feeff;
  font-size: 0.94rem;
  font-weight: 700;
  letter-spacing: 0.03em;
`;

const PhaseGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PhaseCard = styled.article`
  padding: 24px 22px;
  border-radius: 22px;
  border: 1px solid rgba(129, 188, 255, 0.18);
  background: linear-gradient(160deg, rgba(15, 24, 42, 0.92), rgba(8, 13, 24, 0.96));
`;

const PhaseName = styled.h3`
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 6px;
`;

const PhasePeriod = styled.p`
  color: #8deaff;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 14px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
`;

const BulletItem = styled.li`
  position: relative;
  padding-left: 18px;
  color: rgba(220, 231, 248, 0.88);
  line-height: 1.6;
  word-break: auto-phrase;
  overflow-wrap: anywhere;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: ${({ $color }) => $color || '#66fcf1'};
    box-shadow: 0 0 10px ${({ $color }) => $color || 'rgba(102, 252, 241, 0.45)'};
  }
`;

const ShowGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;

  & > * {
    grid-column: span 4;
  }

  & > *:nth-last-child(2):nth-child(3n + 1),
  & > *:last-child:nth-child(3n + 2) {
    grid-column: span 6;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > * {
      grid-column: auto;
    }

    & > *:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileShowcase = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 20px;
  }
`;

const ShowCard = styled(motion.article)`
  position: relative;
  overflow: hidden;
  min-height: 320px;
  padding: 26px 22px 22px;
  border-radius: 24px;
  border: 1px solid ${({ $color }) => `${$color}44`};
  background: linear-gradient(160deg, rgba(14, 22, 38, 0.92), rgba(8, 13, 24, 0.98));
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.22);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, ${({ $color }) => $color}, transparent);
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 15% 0%, ${({ $color }) => `${$color}2e`}, transparent 48%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: 0;
    padding: 22px 18px 18px;
    border-radius: 20px;
  }
`;

const MobileCardFrame = styled.div`
  position: relative;
  min-height: 430px;

  @media (max-width: 768px) {
    min-height: 0;
  }
`;

const CardTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`;

const CardIconWrap = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: ${({ $color }) => `${$color}20`};
  border: 1px solid ${({ $color }) => `${$color}55`};
  box-shadow: 0 0 24px ${({ $color }) => `${$color}30`};
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const CardBadge = styled.span`
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => `${$color}66`};
  background: ${({ $color }) => `${$color}18`};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CardIndex = styled.span`
  color: rgba(190, 205, 228, 0.84);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  font-weight: 700;
`;

const CardName = styled.h3`
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 1.36rem;
  margin-bottom: 10px;
  font-family: var(--font-heading);
`;

const CardSummary = styled.p`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  color: rgba(202, 217, 240, 0.82);
  line-height: 1.64;
  word-break: keep-all;
`;

const NavigationRow = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
`;

const ArrowButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(122, 194, 255, 0.35);
  background: rgba(11, 20, 36, 0.72);
  color: #e5f3ff;
  font-size: 1.25rem;
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

const ProgressMeta = styled.p`
  margin-top: 10px;
  color: rgba(212, 228, 249, 0.9);
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.05em;
`;

const CurriculumExperience = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const CurriculumDesktop = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const CurriculumMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 20px;
  }
`;

const CurriculumRailNav = styled.div`
  position: sticky;
  top: 112px;
  padding: 18px 16px 18px 22px;
  border-radius: 22px;
  border: 1px solid rgba(131, 192, 255, 0.18);
  background: linear-gradient(160deg, rgba(12, 19, 34, 0.9), rgba(8, 13, 24, 0.96));

  @media (max-width: 900px) {
    position: static;
    padding: 0;
    border: 0;
    background: transparent;
  }
`;

const CurriculumRailList = styled.div`
  position: relative;
  display: grid;
  gap: 10px;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 14px;
    bottom: 14px;
    width: 2px;
    background: linear-gradient(180deg, rgba(141, 234, 255, 0.52), rgba(141, 234, 255, 0.08));
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const CurriculumRailButton = styled.button`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 12px 14px 12px 0;
  text-align: left;
  border-radius: 18px;
  background: ${({ $active, $color }) => ($active ? `${$color}14` : 'transparent')};
  border: 1px solid ${({ $active, $color }) => ($active ? `${$color}44` : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $color }) => `${$color}10`};
    border-color: ${({ $color }) => `${$color}36`};
  }
`;

const CurriculumRailDot = styled.div`
  width: ${({ $active }) => ($active ? '16px' : '12px')};
  height: ${({ $active }) => ($active ? '16px' : '12px')};
  border-radius: 999px;
  margin-left: 6px;
  border: 3px solid rgba(9, 17, 31, 0.95);
  background: ${({ $color }) => $color};
  box-shadow: ${({ $active, $color }) => ($active ? `0 0 18px ${$color}88` : 'none')};
  transition: all 0.2s ease;
`;

const CurriculumRailCopy = styled.div`
  display: grid;
  gap: 4px;
`;

const CurriculumRailName = styled.span`
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(216, 227, 245, 0.82)')};
  font-size: 1rem;
  font-weight: 700;
`;

const CurriculumRailSub = styled.span`
  color: ${({ $active, $color }) => ($active ? $color : 'rgba(174, 192, 220, 0.74)')};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CurriculumMobileTabs = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    width: calc(100% + 4px);
    padding: 0 12px 6px 0;
    margin-right: -4px;
    scroll-snap-type: x proximity;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CurriculumMobileTab = styled.button`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  border-radius: 999px;
  border: 1px solid ${({ $active, $color }) => ($active ? `${$color}55` : 'rgba(133, 180, 240, 0.2)')};
  background: ${({ $active, $color }) => ($active ? `${$color}14` : 'rgba(255, 255, 255, 0.03)')};
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(214, 225, 244, 0.82)')};
  font-size: 0.86rem;
  font-weight: 700;

  @media (max-width: 900px) {
    scroll-snap-align: start;
  }
`;

const CurriculumViewport = styled.div`
  min-width: 0;
`;

const CurriculumPanel = styled(motion.div)`
  padding: 24px 22px;
  border-radius: 22px;
  border: 1px solid ${({ $color }) => `${$color}44`};
  background: linear-gradient(165deg, rgba(14, 23, 39, 0.9), rgba(8, 13, 24, 0.96));
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.18);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 0% 10%, ${({ $color }) => `${$color}24`}, transparent 42%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const CurriculumHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CurriculumNameWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const CurriculumIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  background: ${({ $color }) => `${$color}20`};
  border: 1px solid ${({ $color }) => `${$color}55`};
`;

const CurriculumName = styled.h3`
  color: #fff;
  font-size: 1.28rem;
  font-family: var(--font-heading);
  word-break: keep-all;
`;

const CurriculumMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CurriculumPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 11px;
  border-radius: 999px;
  border: 1px solid ${({ $color }) => `${$color}55`};
  background: ${({ $color }) => `${$color}14`};
  color: ${({ $color }) => $color};
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  max-width: 100%;
  white-space: normal;
  word-break: keep-all;

  @media (max-width: 768px) {
    padding: 7px 10px;
    font-size: 0.7rem;
    line-height: 1.4;
  }
`;

const CurriculumLead = styled.p`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  color: rgba(213, 228, 248, 0.84);
  line-height: 1.64;
  word-break: auto-phrase;
  overflow-wrap: anywhere;
`;

const CurriculumFooter = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(133, 180, 240, 0.14);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CurriculumFootText = styled.p`
  color: rgba(197, 212, 236, 0.8);
  font-size: 0.85rem;
  line-height: 1.5;
  word-break: auto-phrase;
  overflow-wrap: anywhere;
`;

const CurriculumPager = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const CurriculumPagerButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(122, 194, 255, 0.35);
  background: rgba(11, 20, 36, 0.72);
  color: #e5f3ff;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }
`;

const DualGrid = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const GuideCard = styled.article`
  padding: 22px 20px;
  border-radius: 22px;
  border: 1px solid rgba(131, 192, 255, 0.18);
  background: rgba(255, 255, 255, 0.03);
`;

const GuideTitle = styled.h3`
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 14px;
`;

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.45 }
};

const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5 }
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

const MobileCarousel = ({ items, renderCard, label }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
  }, [items.length]);

  const goTo = (nextIndex) => {
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const goPrev = () => {
    if (activeIndex === 0) return;
    goTo(activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex === items.length - 1) return;
    goTo(activeIndex + 1);
  };

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 70;

    if ((info.offset.x < -swipeThreshold || info.velocity.x < -420) && activeIndex < items.length - 1) {
      goTo(activeIndex + 1);
    } else if ((info.offset.x > swipeThreshold || info.velocity.x > 420) && activeIndex > 0) {
      goTo(activeIndex - 1);
    }
  };

  return (
    <MobileShowcase>
      <MobileCardFrame>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${label}-${activeIndex}`}
            custom={direction}
            variants={mobileCardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
          >
            {renderCard(items[activeIndex], activeIndex)}
          </motion.div>
        </AnimatePresence>
      </MobileCardFrame>
      <NavigationRow>
        <ArrowButton type="button" onClick={goPrev} disabled={activeIndex === 0} aria-label={`${label} 이전 카드`}>
          ‹
        </ArrowButton>
        <Indicators>
          {items.map((item, index) => (
            <Dot
              key={`${label}-${item.name}-${index}`}
              type="button"
              $active={index === activeIndex}
              onClick={() => goTo(index)}
              aria-label={`${label} ${index + 1}번 카드로 이동`}
            />
          ))}
        </Indicators>
        <ArrowButton type="button" onClick={goNext} disabled={activeIndex === items.length - 1} aria-label={`${label} 다음 카드`}>
          ›
        </ArrowButton>
      </NavigationRow>
      <ProgressMeta>{activeIndex + 1} / {items.length}</ProgressMeta>
    </MobileShowcase>
  );
};

const renderPartCard = (item, index, total) => (
  <ShowCard key={item.name} $color={item.color} {...cardMotion}>
    <CardTop>
      <CardIconWrap $color={item.color}>{item.icon}</CardIconWrap>
      <CardMeta>
        <CardBadge $color={item.color}>Part</CardBadge>
        <CardIndex>{index + 1} / {total}</CardIndex>
      </CardMeta>
    </CardTop>
    <CardName>{item.name}</CardName>
    <CardSummary>{item.summary}</CardSummary>
    <BulletList>
      {item.bullets.map((bullet) => (
        <BulletItem key={bullet} $color={item.color}>{bullet}</BulletItem>
      ))}
    </BulletList>
  </ShowCard>
);

const renderCurriculumPanel = (item, index, total, onPrev, onNext) => (
  <CurriculumPanel
    key={item.name}
    $color={item.color}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.24, ease: 'easeOut' }}
  >
    <CurriculumHeader>
      <CurriculumNameWrap>
        <CurriculumIcon $color={item.color}>{item.icon}</CurriculumIcon>
        <CurriculumName>{item.name}</CurriculumName>
      </CurriculumNameWrap>
      <CurriculumMeta>
        <CurriculumPill $color={item.color}>Track {index + 1}</CurriculumPill>
        <CurriculumPill $color={item.color}>{item.emphasis}</CurriculumPill>
      </CurriculumMeta>
    </CurriculumHeader>
    <CurriculumLead>{item.emphasis}</CurriculumLead>
    <BulletList>
      {item.bullets.map((bullet) => (
        <BulletItem key={bullet} $color={item.color}>{bullet}</BulletItem>
      ))}
    </BulletList>
    <CurriculumFooter>
      <CurriculumFootText>
        한 번에 하나의 트랙만 집중해서 읽을 수 있도록 구성했습니다.
      </CurriculumFootText>
      <CurriculumPager>
        <CurriculumPagerButton type="button" onClick={onPrev} disabled={index === 0} aria-label="이전 커리큘럼">
          ‹
        </CurriculumPagerButton>
        <ProgressMeta>{index + 1} / {total}</ProgressMeta>
        <CurriculumPagerButton type="button" onClick={onNext} disabled={index === total - 1} aria-label="다음 커리큘럼">
          ›
        </CurriculumPagerButton>
      </CurriculumPager>
    </CurriculumFooter>
  </CurriculumPanel>
);

const renderCurriculumMobileCard = (item, index, total) => (
  <CurriculumPanel
    key={item.name}
    $color={item.color}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.24, ease: 'easeOut' }}
  >
    <CurriculumHeader>
      <CurriculumNameWrap>
        <CurriculumIcon $color={item.color}>{item.icon}</CurriculumIcon>
        <CurriculumName>{item.name}</CurriculumName>
      </CurriculumNameWrap>
      <CurriculumMeta>
        <CurriculumPill $color={item.color}>Track {index + 1}</CurriculumPill>
        <CurriculumPill $color={item.color}>{item.emphasis}</CurriculumPill>
      </CurriculumMeta>
    </CurriculumHeader>
    <CurriculumLead>{item.emphasis}</CurriculumLead>
    <BulletList>
      {item.bullets.map((bullet) => (
        <BulletItem key={bullet} $color={item.color}>{bullet}</BulletItem>
      ))}
    </BulletList>
    <CurriculumFooter>
      <CurriculumFootText>
        {index + 1} / {total} 트랙을 보고 있습니다.
      </CurriculumFootText>
    </CurriculumFooter>
  </CurriculumPanel>
);

const renderOverviewMetricCard = (item, index, total) => (
  <OverviewMetric key={`${item.no}-${index}`} {...cardMotion}>
    <OverviewMetricNo>{item.no}</OverviewMetricNo>
    <OverviewMetricText>{item.text}</OverviewMetricText>
    <ProgressMeta>{index + 1} / {total}</ProgressMeta>
  </OverviewMetric>
);

const renderPhaseCard = (phase, index, total) => (
  <PhaseCard key={phase.name} {...cardMotion}>
    <PhaseName>{phase.name}</PhaseName>
    <PhasePeriod>{phase.period}</PhasePeriod>
    <BulletList>
      {phase.items.map((item) => (
        <BulletItem key={item}>{item}</BulletItem>
      ))}
    </BulletList>
    <ProgressMeta>{index + 1} / {total}</ProgressMeta>
  </PhaseCard>
);

const renderGuideCard = (card, index, total) => (
  <GuideCard key={card.title} {...cardMotion}>
    <GuideTitle>{card.title}</GuideTitle>
    <BulletList>
      {card.items.map((item) => (
        <BulletItem key={item}>{item}</BulletItem>
      ))}
    </BulletList>
    <ProgressMeta>{index + 1} / {total}</ProgressMeta>
  </GuideCard>
);

const BTrackRecruitSections = ({ track }) => {
  const { recruitSections, apply } = track;
  const qualificationPreview = recruitSections.guide.qualifications.slice(0, 2).join(' / ');
  const [activeCurriculumIndex, setActiveCurriculumIndex] = useState(0);
  const activeCurriculum = recruitSections.curriculum.tracks[activeCurriculumIndex];
  const partCount = recruitSections.parts.items.length;
  const durationMonthsMatch = recruitSections.schedule.duration.match(/약\s*(\d+)개월/);
  const durationMonths = durationMonthsMatch?.[1] ?? '6';
  const overviewMetrics = [
    { no: '01', text: '문제를 정의하고 구조를 설계한 뒤 실제 구현까지 팀 단위로 이어집니다.' },
    { no: '02', text: '워크북을 넘어 실전형 기준과 협업 방식까지 몸으로 익히는 트랙입니다.' },
    { no: '03', text: '실제 UMC PRODUCT에 참여하는 경험까지 포함된 성장 경로를 제공합니다.' }
  ];
  const guideCards = [
    { title: '이런 분들께 추천해요', items: recruitSections.guide.recommended },
    { title: '공통 지원 자격', items: recruitSections.guide.qualifications }
  ];

  const goCurriculumPrev = () => {
    setActiveCurriculumIndex((prev) => Math.max(prev - 1, 0));
  };

  const goCurriculumNext = () => {
    setActiveCurriculumIndex((prev) => Math.min(prev + 1, recruitSections.curriculum.tracks.length - 1));
  };

  return (
    <Section>
      <Container>
        <SummaryBar>
          <Label {...sectionMotion}>{recruitSections.summary.label}</Label>
          <SummaryIntro>
            <SummaryIntroCopy>
              <SummaryIntroTitle>지원 전에 필요한 핵심 정보만 먼저 확인하세요.</SummaryIntroTitle>
              <SummaryIntroText>
                활동 기간, 모집 파트, 지원 자격, 지원 버튼을 가장 먼저 배치해서
                처음 들어온 사람도 바로 다음 행동으로 이어질 수 있게 정리했습니다.
              </SummaryIntroText>
            </SummaryIntroCopy>
            <SummarySignal>
              <SummarySignalDot />
              B TRACK 모집 진행 중
            </SummarySignal>
          </SummaryIntro>
          <SummaryGrid>
            <SummaryCard>
              <SummaryAccent>⏱</SummaryAccent>
              <SummaryEyebrow>활동기간</SummaryEyebrow>
              <SummaryMetricRow>
                <SummaryFigure>{durationMonths}</SummaryFigure>
                <SummaryFigureUnit>Months</SummaryFigureUnit>
              </SummaryMetricRow>
              <SummaryValue>{recruitSections.summary.duration}</SummaryValue>
              <SummarySub>{recruitSections.schedule.duration}</SummarySub>
            </SummaryCard>
            <SummaryCard>
              <SummaryAccent>🧩</SummaryAccent>
              <SummaryEyebrow>모집 파트</SummaryEyebrow>
              <SummaryMetricRow>
                <SummaryFigure>{partCount}</SummaryFigure>
                <SummaryFigureUnit>Parts</SummaryFigureUnit>
              </SummaryMetricRow>
              <SummaryValue>{recruitSections.summary.parts}</SummaryValue>
              <SummarySub>실제 제품 팀처럼 함께 움직이는 협업 구조</SummarySub>
            </SummaryCard>
            <SummaryCard>
              <SummaryAccent>🎓</SummaryAccent>
              <SummaryEyebrow>지원 자격</SummaryEyebrow>
              <SummaryMetricRow>
                <SummaryFigure>OPEN</SummaryFigure>
                <SummaryFigureUnit>Now</SummaryFigureUnit>
              </SummaryMetricRow>
              {recruitSections.summary.qualification ? (
                <SummaryValue>{recruitSections.summary.qualification}</SummaryValue>
              ) : null}
              <SummarySub>{qualificationPreview}</SummarySub>
            </SummaryCard>
            <SummaryCtaCard>
              <SummaryAccent>→</SummaryAccent>
              <SummaryEyebrow>바로 지원</SummaryEyebrow>
              <SummaryMetricRow>
                <SummaryFigure>GO</SummaryFigure>
                <SummaryFigureUnit>Apply</SummaryFigureUnit>
              </SummaryMetricRow>
              <SummaryValue>지금 B TRACK 지원서를 제출하세요.</SummaryValue>
              <SummarySub>상단, 하단 고정 버튼, 마지막 섹션에서 모두 지원 가능합니다.</SummarySub>
              <SummaryButton href={apply.applyHref} target="_blank" rel="noopener noreferrer">
                {recruitSections.summary.ctaText}
              </SummaryButton>
            </SummaryCtaCard>
          </SummaryGrid>
        </SummaryBar>

        <OverviewHero>
          <Label {...sectionMotion}>{recruitSections.overview.label}</Label>
          <OverviewGrid>
            <OverviewLeft>
              <OverviewKicker>
                <OverviewKickerLine />
                Real Product Track
              </OverviewKicker>
              <OverviewTitle {...sectionMotion}>
                UMC PRODUCT <NoBreak>B TRACK</NoBreak>은 실제로 만들고 증명하는 트랙입니다.
              </OverviewTitle>
              <OverviewBody {...sectionMotion}>{recruitSections.overview.description}</OverviewBody>
              <OverviewActionRow>
                <OverviewActionButton
                  href={recruitSections.overview.landingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {recruitSections.overview.landingText}
                </OverviewActionButton>
              </OverviewActionRow>
              <OverviewSignalRow>
                <OverviewSignalCard>
                  <OverviewSignalLabel>Learn</OverviewSignalLabel>
                  <OverviewSignalValue>워크북을 넘어 실제 서비스 기준과 제품 사고를 익힙니다.</OverviewSignalValue>
                </OverviewSignalCard>
                <OverviewSignalCard>
                  <OverviewSignalLabel>Build</OverviewSignalLabel>
                  <OverviewSignalValue>PM, Design, Client, Server가 팀 단위로 문제를 풀고 구현합니다.</OverviewSignalValue>
                </OverviewSignalCard>
                <OverviewSignalCard>
                  <OverviewSignalLabel>Prove</OverviewSignalLabel>
                  <OverviewSignalValue>실제 UMC PRODUCT 참여와 데모데이까지 이어지는 결과를 남깁니다.</OverviewSignalValue>
                </OverviewSignalCard>
              </OverviewSignalRow>
            </OverviewLeft>
            <OverviewLeadCard
              initial={{ opacity: 0, x: 18, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.52, delay: 0.12 }}
            >
              <OverviewLeadTop>
                <OverviewLeadTitle>What You Actually Experience</OverviewLeadTitle>
                <OverviewLeadBadge>Real Product Flow</OverviewLeadBadge>
              </OverviewLeadTop>
              <OverviewLeadList>
                {recruitSections.overview.highlights.map((item, index) => (
                  <OverviewLeadItem key={item}>
                    <OverviewLeadIndex>{String(index + 1).padStart(2, '0')}</OverviewLeadIndex>
                    <OverviewLeadText>{item}</OverviewLeadText>
                  </OverviewLeadItem>
                ))}
              </OverviewLeadList>
              <OverviewLeadFooter>
                단순한 학습 트랙이 아니라, 기준을 익히고 협업하고 결과까지 남기는 흐름 전체를 경험합니다.
              </OverviewLeadFooter>
            </OverviewLeadCard>
          </OverviewGrid>
          <OverviewBottomGrid>
            {overviewMetrics.map((item, index) => renderOverviewMetricCard(item, index, overviewMetrics.length))}
          </OverviewBottomGrid>
          <MobileCarousel
            items={overviewMetrics}
            label="핵심 포인트"
            renderCard={(item, index) => renderOverviewMetricCard(item, index, overviewMetrics.length)}
          />
        </OverviewHero>

        <Block>
          <Label {...sectionMotion}>{recruitSections.schedule.label}</Label>
          <Title {...sectionMotion}>{recruitSections.schedule.title}</Title>
          <TimelineMeta>{recruitSections.schedule.duration}</TimelineMeta>
          <PhaseGrid>
            {recruitSections.schedule.phases.map((phase, index) => renderPhaseCard(phase, index, recruitSections.schedule.phases.length))}
          </PhaseGrid>
          <MobileCarousel
            items={recruitSections.schedule.phases}
            label="활동 과정"
            renderCard={(phase, index) => renderPhaseCard(phase, index, recruitSections.schedule.phases.length)}
          />
        </Block>

        <Block>
          <Label {...sectionMotion}>{recruitSections.parts.label}</Label>
          <Title {...sectionMotion}>{recruitSections.parts.title}</Title>
          <Description {...sectionMotion}>핵심 파트와 기대 역할을 빠르게 훑고, 모바일에서는 카드형으로 넘기며 확인할 수 있게 구성했습니다.</Description>
          <ShowGrid>
            {recruitSections.parts.items.map((item, index) => renderPartCard(item, index, recruitSections.parts.items.length))}
          </ShowGrid>
          <MobileCarousel
            items={recruitSections.parts.items}
            label="모집분야"
            renderCard={(item, index) => renderPartCard(item, index, recruitSections.parts.items.length)}
          />
        </Block>

        <Block>
          <Label {...sectionMotion}>{recruitSections.curriculum.label}</Label>
          <Title {...sectionMotion}>{recruitSections.curriculum.title}</Title>
          <Description {...sectionMotion}>{recruitSections.curriculum.description}</Description>
          <CurriculumDesktop>
            <CurriculumExperience>
              <CurriculumRailNav>
                <CurriculumRailList>
                  {recruitSections.curriculum.tracks.map((item, index) => (
                    <CurriculumRailButton
                      key={item.name}
                      type="button"
                      $active={index === activeCurriculumIndex}
                      $color={item.color}
                      onClick={() => setActiveCurriculumIndex(index)}
                      aria-label={`${item.name} 커리큘럼 보기`}
                    >
                      <CurriculumRailDot $active={index === activeCurriculumIndex} $color={item.color} />
                      <CurriculumRailCopy>
                        <CurriculumRailName $active={index === activeCurriculumIndex}>{item.name}</CurriculumRailName>
                        <CurriculumRailSub $active={index === activeCurriculumIndex} $color={item.color}>
                          Track {index + 1}
                        </CurriculumRailSub>
                      </CurriculumRailCopy>
                    </CurriculumRailButton>
                  ))}
                </CurriculumRailList>
                <CurriculumMobileTabs>
                  {recruitSections.curriculum.tracks.map((item, index) => (
                    <CurriculumMobileTab
                      key={item.name}
                      type="button"
                      $active={index === activeCurriculumIndex}
                      $color={item.color}
                      onClick={() => setActiveCurriculumIndex(index)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </CurriculumMobileTab>
                  ))}
                </CurriculumMobileTabs>
              </CurriculumRailNav>
              <CurriculumViewport>
                <AnimatePresence mode="wait">
                  {renderCurriculumPanel(
                    activeCurriculum,
                    activeCurriculumIndex,
                    recruitSections.curriculum.tracks.length,
                    goCurriculumPrev,
                    goCurriculumNext
                  )}
                </AnimatePresence>
              </CurriculumViewport>
            </CurriculumExperience>
          </CurriculumDesktop>
          <CurriculumMobile>
            <MobileCarousel
              items={recruitSections.curriculum.tracks}
              label="커리큘럼"
              renderCard={(item, index) => renderCurriculumMobileCard(item, index, recruitSections.curriculum.tracks.length)}
            />
          </CurriculumMobile>
        </Block>

        <Block>
          <Label {...sectionMotion}>{recruitSections.guide.label}</Label>
          <Title {...sectionMotion}>{recruitSections.guide.title}</Title>
          <DualGrid>
            {guideCards.map((card, index) => renderGuideCard(card, index, guideCards.length))}
          </DualGrid>
          <MobileCarousel
            items={guideCards}
            label="가이드"
            renderCard={(card, index) => renderGuideCard(card, index, guideCards.length)}
          />
        </Block>
      </Container>
    </Section>
  );
};

export default BTrackRecruitSections;
