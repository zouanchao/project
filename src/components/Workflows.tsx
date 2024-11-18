import React from 'react';
import { FileText, BookOpen, Award } from 'lucide-react';

const workflows = [
  {
    icon: FileText,
    title: 'Research Paper',
    steps: [
      { number: 1, text: 'Upload papers' },
      { number: 2, text: 'AI analysis' },
      { number: 3, text: 'Generate outline' },
      { number: 4, text: 'Write with AI' },
      { number: 5, text: 'Export' }
    ]
  },
  {
    icon: BookOpen,
    title: 'Literature Review',
    steps: [
      { number: 1, text: 'Search papers' },
      { number: 2, text: 'Extract insights' },
      { number: 3, text: 'Synthesize findings' },
      { number: 4, text: 'Create visuals' },
      { number: 5, text: 'Format' }
    ]
  },
  {
    icon: Award,
    title: 'Grant Proposal',
    steps: [
      { number: 1, text: 'Set objectives' },
      { number: 2, text: 'Plan methods' },
      { number: 3, text: 'Budget planning' },
      { number: 4, text: 'Impact analysis' },
      { number: 5, text: 'Submit' }
    ]
  }
];

export default function Workflows() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Streamlined Research Workflows</h2>
          <p className="text-gray-600">Follow our guided processes to complete your research documents efficiently</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflows.map((workflow) => (
            <div key={workflow.title} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-6">
                <workflow.icon className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold">{workflow.title}</h3>
              </div>
              
              <div className="space-y-4">
                {workflow.steps.map((step) => (
                  <div key={step.number} className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                      {step.number}
                    </span>
                    <span className="text-gray-700">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}