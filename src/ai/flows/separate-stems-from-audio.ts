'use server';
/**
 * @fileOverview An audio stem separation AI agent.
 *
 * - separateStemsFromAudio - A function that handles the audio stem separation process.
 * - SeparateStemsFromAudioInput - The input type for the separateStemsFromAudio function.
 * - SeparateStemsFromAudioOutput - The return type for the separateStemsFromAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeparateStemsFromAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SeparateStemsFromAudioInput = z.infer<typeof SeparateStemsFromAudioInputSchema>;

const SeparateStemsFromAudioOutputSchema = z.object({
  vocals: z
    .string()
    .describe("The separated vocals stem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  instrumental: z
    .string()
    .describe("The separated instrumental stem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type SeparateStemsFromAudioOutput = z.infer<typeof SeparateStemsFromAudioOutputSchema>;

export async function separateStemsFromAudio(input: SeparateStemsFromAudioInput): Promise<SeparateStemsFromAudioOutput> {
  return separateStemsFromAudioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'separateStemsFromAudioPrompt',
  input: {schema: SeparateStemsFromAudioInputSchema},
  output: {schema: SeparateStemsFromAudioOutputSchema},
  prompt: `You are an AI audio processing expert. Separate the audio file into vocals and instrumental stems.

Audio: {{media url=audioDataUri}}`,
});

const separateStemsFromAudioFlow = ai.defineFlow(
  {
    name: 'separateStemsFromAudioFlow',
    inputSchema: SeparateStemsFromAudioInputSchema,
    outputSchema: SeparateStemsFromAudioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
