'use server';

/**
 * @fileOverview A Genkit flow to generate summary insights from work experience using AI.
 *
 * - generateExperienceInsights - A function that generates insights from work experience.
 * - GenerateExperienceInsightsInput - The input type for the generateExperienceInsights function.
 * - GenerateExperienceInsightsOutput - The return type for the generateExperienceInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExperienceInsightsInputSchema = z.object({
  workExperience: z
    .string()
    .describe('A detailed description of the work experience.'),
});
export type GenerateExperienceInsightsInput = z.infer<
  typeof GenerateExperienceInsightsInputSchema
>;

const GenerateExperienceInsightsOutputSchema = z.object({
  summaryInsights: z
    .string()
    .describe(
      'A summary of insights derived from the work experience, highlighting strengths and potential future applications.'
    ),
});
export type GenerateExperienceInsightsOutput = z.infer<
  typeof GenerateExperienceInsightsOutputSchema
>;

export async function generateExperienceInsights(
  input: GenerateExperienceInsightsInput
): Promise<GenerateExperienceInsightsOutput> {
  return generateExperienceInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExperienceInsightsPrompt',
  input: {schema: GenerateExperienceInsightsInputSchema},
  output: {schema: GenerateExperienceInsightsOutputSchema},
  prompt: `You are an AI career coach specializing in helping individuals understand their strengths and how they apply to future roles. Analyze the work experience provided and generate summary insights.\n\nWork Experience: {{{workExperience}}}\n\nSummary Insights:`,
});

const generateExperienceInsightsFlow = ai.defineFlow(
  {
    name: 'generateExperienceInsightsFlow',
    inputSchema: GenerateExperienceInsightsInputSchema,
    outputSchema: GenerateExperienceInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
