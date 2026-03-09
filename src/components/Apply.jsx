import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  background: transparent;
  position: relative;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(860px, 92%);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(120, 203, 255, 0.48), transparent);
  }
`;

const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 86px 46px;
  background: linear-gradient(162deg, rgba(13, 21, 36, 0.88), rgba(7, 12, 21, 0.95));
  border: 1px solid var(--line-soft);
  border-radius: 34px;
  position: relative;
  z-index: 3;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(92, 169, 255, 0.2), transparent 56%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 62px 22px;
    border-radius: 26px;
  }
`;

const GlowRing = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 34px;
  box-shadow: 0 0 70px rgba(102, 188, 255, 0.12);
  z-index: -1;
  pointer-events: none;

  @media (max-width: 768px) {
    border-radius: 26px;
  }
`;

const Label = styled(motion.span)`
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(129, 208, 255, 0.3);
  background: rgba(98, 172, 255, 0.12);
  color: #8deaff;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.05rem, 4.2vw, 3.35rem);
  color: #fff;
  margin-bottom: 22px;
  font-family: var(--font-heading);
  line-height: 1.2;
  position: relative;
  z-index: 1;
  word-break: keep-all;
`;

const Text = styled(motion.p)`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: rgba(202, 215, 238, 0.84);
  margin-bottom: 44px;
  line-height: 1.72;
  position: relative;
  z-index: 1;
  word-break: keep-all;

  @media (max-width: 768px) {
    margin-bottom: 34px;
  }
`;

const ButtonGroup = styled(motion.div)`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
  position: relative;
  z-index: 10;
`;

const ApplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  background: linear-gradient(120deg, #f5f9ff, #def2ff);
  color: #111827;
  font-size: 1.12rem;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(115, 194, 255, 0.4);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  &[aria-disabled='true'],
  &:disabled {
    background: linear-gradient(120deg, #4b5365, #3a4353);
    color: rgba(232, 238, 249, 0.82);
    box-shadow: none;
    cursor: not-allowed;
    pointer-events: none;
  }

  &[aria-disabled='true']:hover,
  &:disabled:hover {
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
  }
`;

const StatusText = styled.div`
  color: #ffbf9a;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const renderLines = (text) =>
  text.split('\n').map((line, index) => (
    <React.Fragment key={`${line}-${index}`}>
      {index > 0 && <br />}
      {line}
    </React.Fragment>
  ));

const Apply = ({ track }) => {
  const { apply } = track;
  const isRecruiting = apply.isRecruiting;
  const hasApplyLink = Boolean(apply.applyHref);

  return (
    <Section id="apply">
      <Container>
        <GlowRing
          animate={{
            boxShadow: ['0 0 60px rgba(102, 188, 255, 0.14)', '0 0 110px rgba(102, 252, 241, 0.2)', '0 0 60px rgba(102, 188, 255, 0.14)']
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Label
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {apply.label}
        </Label>

        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {apply.title}
        </Title>

        <Text
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isRecruiting ? (
            renderLines(apply.openBody)
          ) : (
            renderLines(apply.closedBody)
          )}
        </Text>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isRecruiting && hasApplyLink ? (
            <ApplyButton
              href={apply.applyHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {apply.recruitButtonText}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </ApplyButton>
          ) : (
            <ApplyButton as="button" type="button" disabled aria-disabled="true">
              {isRecruiting ? apply.recruitButtonText : apply.closedButtonText}
            </ApplyButton>
          )}
          <StatusText>{isRecruiting ? apply.statusOpen : apply.statusClosed}</StatusText>
        </ButtonGroup>
      </Container>
    </Section>
  );
};

export default Apply;
