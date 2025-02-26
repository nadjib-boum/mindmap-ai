import { generateText, type LanguageModelV1 } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { AIServiceProps, AnswerProps } from '@/types';

class AIUtil {

  private model: LanguageModelV1;

  constructor ({ model }: AIServiceProps) {

    this.model = model;

  }

  private async generateAnswer ({ system, prompt }: AnswerProps) {
    
    const { text } = await generateText({
      model: this.model,
      system,
      prompt,
    });
  
    return text;

  }

  public async convertPDFtoStructuredText (pdfContent: string) {

    const text = await this.generateAnswer ({
      system: `
        You're a assistant that Extract the key ideas from a given text and present them in a structured format using clear headlines and bullet points.
        - Use concise, informative headings to represent major sections.
        - Maintain the logical flow of the original content while improving clarity.
        - Remove redundant information and filler words.
        - Preserve important details, definitions, and relationships between concepts."
        `,
        prompt: `Convert This Text To structured Text: ${pdfContent}`
      });
      // - Under each heading, list key points in a hierarchical bullet format.

    return text;

  }

  public async convertTextToMindmap (text: string) {

    const tree = await this.generateAnswer ({
      system: `
        You are an AI assistant That Convert a given structured text into a well-formatted JavaScript object representing a mind map.
        - Use a nested structure where each main heading becomes a parent node.
        - Subheadings and bullet points should be organized as child nodes.
        - Maintain the hierarchy and logical flow of the content.
        Ensure the output follows something like this structure:
          {
            'id': '1'
            'data': {
              'label': 'Main Topic'
            },
            'children': [
              {
                id: '2',
                'data': {
                  'label': 'Sub Topic'
                },
                'children': [
                  {
                    id: '3',
                    'data': {
                      'label': 'Other Sub Topic'
                    },
                    'children': []
                  }
                ]
              }
            ]
          }
        Ensure the IDs are numeric and unique.
        Return the structure directly without instros or endigns, just raw code. this is a MUST to not corrupt the code.
        Ensure That The returned Javascript Is Parsable without issues
        `,
      prompt: `Convert This Text To Structured Object: ${text}`
    });

    return JSON.parse(tree.replaceAll("\n", ""));

  }

}

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

const aiUtil = new AIUtil ({
  model: openai("gpt-4o-mini")
});

export default aiUtil;