import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: 100px 20px 120px;

  @media (max-width: 768px) {
    padding: 80px 16px 112px;
  }
`;

const Container = styled.div`
  max-width: 920px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Label = styled.span`
  display: inline-block;
  color: #8deaff;
  font-size: 0.88rem;
  letter-spacing: 0.1em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: clamp(2rem, 4vw, 2.95rem);
  margin-bottom: 12px;
  font-family: var(--font-heading);
`;

const Desc = styled.p`
  color: rgba(205, 221, 241, 0.84);
  max-width: 760px;
  margin: 0 auto;
  font-size: 1.03rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FaqItem = styled.article`
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: linear-gradient(155deg, rgba(14, 21, 36, 0.82), rgba(7, 12, 22, 0.94));
  overflow: hidden;
`;

const FaqButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  padding: 18px 20px;
  color: #eef4ff;
  font-size: 1rem;
  font-weight: 600;
`;

const Question = styled.span`
  font-size: 1rem;
  letter-spacing: 0.01em;
`;

const Toggle = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(139, 206, 255, 0.45);
  color: #b8defa;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const AnswerWrap = styled(motion.div)`
  padding: 0 20px 18px;
  color: rgba(214, 230, 251, 0.9);
  line-height: 1.65;
  font-size: 0.94rem;
`;

const Answer = styled.p`
  white-space: pre-line;
`;

const FaqSection = ({ track }) => {
  const faq = track.faq;
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section>
      <Container>
        <Header>
          <Label>FAQ</Label>
          <Title>자주 묻는 질문</Title>
          <Desc>지원 전 궁금한 점을 빠르게 확인하고 바로 다음 단계로 이동하세요.</Desc>
        </Header>

        <List>
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <FaqItem key={item.q}>
                <FaqButton
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <Question>{item.q}</Question>
                  <Toggle>{isOpen ? '−' : '+'}</Toggle>
                </FaqButton>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <AnswerWrap
                      id={`faq-answer-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Answer>{item.a}</Answer>
                    </AnswerWrap>
                  )}
                </AnimatePresence>
              </FaqItem>
            );
          })}
        </List>
      </Container>
    </Section>
  );
};

export default FaqSection;
