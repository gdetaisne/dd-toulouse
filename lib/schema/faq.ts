import type { WithContext, FAQPage, Question, Answer } from 'schema-dts';

export interface QAItem {
  question: string;
  answer: string;
}

export function buildFaqPageSchema(qas: QAItem[]): WithContext<FAQPage> {
  const mainEntity: Question[] = qas.map((qa) => ({
    '@type': 'Question',
    name: qa.question,
    acceptedAnswer: {
      '@type': 'Answer' as Answer['@type'],
      text: qa.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

