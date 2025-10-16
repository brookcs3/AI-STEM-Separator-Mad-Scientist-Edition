'use server';
/**
 * @fileOverview Suggests optimal stem manipulations using AI after stem separation.
 *
 * - suggestStemManipulations - A function that handles the suggestion of stem manipulations.
 * - SuggestStemManipulationsInput - The input type for the suggestStemManipulations function.
 * - SuggestStemManipulationsOutput - The return type for the suggestStemManipulations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStemManipulationsInputSchema = z.object({
  separatedStems: z
    .array(z.string())
    .describe('An array of separated audio stems, each as a data URI.'),
  originalAudioDescription: z
    .string()
    .describe('A description of the original audio, including genre, instruments, and purpose.'),
});
export type SuggestStemManipulationsInput = z.infer<typeof SuggestStemManipulationsInputSchema>;

const SuggestStemManipulationsOutputSchema = z.object({
  suggestedManipulations: z
    .array(z.string())
    .describe('An array of suggested audio manipulations for the stems.'),
});
export type SuggestStemManipulationsOutput = z.infer<typeof SuggestStemManipulationsOutputSchema>;

export async function suggestStemManipulations(
  input: SuggestStemManipulationsInput
): Promise<SuggestStemManipulationsOutput> {
  return suggestStemManipulationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStemManipulationsPrompt',
  input: {schema: SuggestStemManipulationsInputSchema},
  output: {schema: SuggestStemManipulationsOutputSchema},
  prompt: `You are an expert audio engineer specializing in stem mastering and manipulation.

You will receive an array of separated audio stems and a description of the original audio.
Based on this information, suggest a series of audio manipulations to improve or alter the sound.
These manipulations should be specific techniques, not general advice, such as "add reverb to the vocals" or "increase the bass on the kick drum".

Original Audio Description: {{{originalAudioDescription}}}
Separated Stems:
{{#each separatedStems}}
- {{{this}}}
{{/each}}

Consider the following factors when suggesting manipulations:

*   The genre of the audio
*   The instruments used
*   The purpose of the audio
*   The overall quality of the stems

Suggest at least three distinct manipulations.
`,
});

const suggestStemManipulationsFlow = ai.defineFlow(
  {
    name: 'suggestStemManipulationsFlow',
    inputSchema: SuggestStemManipulationsInputSchema,
    outputSchema: SuggestStemManipulationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
