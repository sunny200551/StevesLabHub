
'use server';
/**
 * @fileOverview Flow for explaining a given code snippet.
 * 
 * - explainCode: A function to generate an explanation for a piece of code.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ExplainCodeInputSchema = z.object({
    code: z.string().describe("The source code to be explained."),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

export const ExplainCodeOutputSchema = z.object({
    highLevelExplanation: z.string().describe("A high-level summary of what the code does."),
    lineByLineExplanation: z.string().describe("A detailed, step-by-step explanation of the code, often in a list format."),
    improvements: z.string().describe("Suggestions for how the code could be improved, optimized, or made more robust."),
    potentialBugs: z.string().describe("Potential bugs, edge cases, or logical errors that might exist in the code."),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

const prompt = ai.definePrompt({
    name: 'explainCodePrompt',
    input: { schema: ExplainCodeInputSchema },
    output: { schema: ExplainCodeOutputSchema },
    prompt: `
        You are an expert programmer and code reviewer, acting as a friendly AI tutor.
        Your task is to analyze the following code snippet and provide a clear, educational explanation.

        Please provide the following four things in your response:
        1.  **High-Level Explanation:** A concise summary of the code's overall purpose and functionality.
        2.  **Line-by-Line Explanation:** A step-by-step breakdown of the code. Use a markdown list format where appropriate to make it easy to read. Explain what each significant line or block of code does.
        3.  **Improvements:** Constructive suggestions on how the code could be improved. This could include performance optimizations, better variable naming, use of more modern language features, or making the code more readable.
        4.  **Potential Bugs & Edge Cases:** Identify any potential bugs, logical errors, or edge cases the code might not handle correctly. For example, what happens with empty inputs, null values, or unexpected data types?

        Here is the code:
        \`\`\`
        {{{code}}}
        \`\`\`

        Generate a detailed and helpful explanation.
    `,
});

const explainCodeFlow = ai.defineFlow(
    {
        name: 'explainCodeFlow',
        inputSchema: ExplainCodeInputSchema,
        outputSchema: ExplainCodeOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        if (!output) {
            throw new Error('Failed to generate code explanation.');
        }
        return output;
    }
);

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
    return explainCodeFlow(input);
}
