import React from 'react';
import { FileText, BookOpen, Briefcase, Search, Award, Clock } from 'lucide-react';

const documents = [
  {
    icon: FileText,
    title: 'Research Paper',
    description: 'Original research with methodology and findings',
    color: 'blue'
  },
  {
    icon: BookOpen,
    title: 'Literature Review',
    description: 'Comprehensive analysis of existing research',
    color: 'purple'
  },
  {
    icon: Briefcase,
    title: 'Case Study',
    description: 'In-depth analysis of specific instances',
    color: 'green'
  },
  {
    icon: Search,
    title: 'Systematic Review',
    description: 'Structured review of multiple studies',
    color: 'orange'
  },
  {
    icon: Award,
    title: 'Grant Proposal',
    description: 'Research funding application documents',
    color: 'pink'
  },
  {
    icon: Clock,
    title: 'Technical Report',
    description: 'Detailed technical documentation',
    color: 'indigo'
  }
];

export default function DocumentTypes() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Choose Your Document Type
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.title} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <doc.icon className={`w-8 h-8 text-${doc.color}-500 mb-4`} />
              <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
              <p className="text-gray-600">{doc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}