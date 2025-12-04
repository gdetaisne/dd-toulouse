import type { WithContext, HowTo, HowToStep } from 'schema-dts';

export interface HowToStepInput {
  name: string;
  text: string;
  image?: string;
}

export interface HowToInput {
  name: string;
  description?: string;
  steps: HowToStepInput[];
  totalTime?: string; // Format ISO 8601 (ex: "PT30M" = 30 minutes)
}

export function buildHowToSchema(input: HowToInput): WithContext<HowTo> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    totalTime: input.totalTime,
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    } as HowToStep)),
  };
}

