export const generateMockOutline = (topic: string, onProgress: (content: string) => void) => {
  return new Promise<void>((resolve) => {
    const outline = [
      '## Abstract\n',
      'Provide a comprehensive overview of the research, including the background, objectives, methodology, and key findings.\n\n',
      '### Background\n',
      '- Current state of research in the field\n',
      '- Gaps in existing knowledge\n',
      '- Significance of the study\n\n',
      '### Objectives\n',
      '- Primary research goals\n',
      '- Specific research questions\n',
      '- Expected outcomes\n\n',
      '## Introduction\n',
      'Set the context for the research and clearly state the problem being addressed.\n\n',
      '### Problem Statement\n',
      '- Description of the research problem\n',
      '- Relevance to the field\n',
      '- Potential impact\n\n',
      '### Research Questions\n',
      '- Primary research questions\n',
      '- Secondary research questions\n\n',
      '## Literature Review\n',
      'Review and analyze existing research relevant to your study.\n\n',
      '### Theoretical Framework\n',
      '- Key theories and concepts\n',
      '- Relationship to research questions\n\n',
      '### Previous Studies\n',
      '- Analysis of relevant research\n',
      '- Identification of research gaps\n\n',
      '## Methodology\n',
      'Describe the research design and methods used to conduct the study.\n\n',
      '### Research Design\n',
      '- Study approach\n',
      '- Justification of methods\n\n',
      '### Data Collection\n',
      '- Data sources\n',
      '- Collection procedures\n\n',
      '## Results\n',
      'Present the findings of your research clearly and objectively.\n\n',
      '### Key Findings\n',
      '- Primary results\n',
      '- Statistical analysis\n',
      '- Data interpretation\n\n',
      '## Discussion\n',
      'Interpret the results and discuss their implications.\n\n',
      '### Implications\n',
      '- Theoretical implications\n',
      '- Practical applications\n\n',
      '### Limitations\n',
      '- Study limitations\n',
      '- Future research directions\n\n',
      '## Conclusion\n',
      'Summarize the key points and contributions of your research.\n\n',
      '### Recommendations\n',
      '- Research recommendations\n',
      '- Practical recommendations\n\n',
      '## References'
    ];

    let currentContent = '';
    let index = 0;

    const streamNextChunk = () => {
      if (index < outline.length) {
        currentContent += outline[index];
        onProgress(currentContent);
        index++;
        setTimeout(streamNextChunk, Math.random() * 100 + 50);
      } else {
        resolve();
      }
    };

    streamNextChunk();
  });
};