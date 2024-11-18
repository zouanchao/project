import React from 'react';
import { Bot, Search, BookmarkCheck, BarChart3, Users, Download } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Writing Assistant',
    description: 'Get real-time suggestions and improvements as you write, with advanced language models trained on scientific papers.'
  },
  {
    icon: Search,
    title: 'Smart Literature Search',
    description: 'Find and analyze relevant papers across multiple databases with intelligent recommendations.'
  },
  {
    icon: BookmarkCheck,
    title: 'Reference Management',
    description: 'Automatically format citations and manage your bibliography in any citation style.'
  },
  {
    icon: BarChart3,
    title: 'Data Analysis & Visualization',
    description: 'Create professional charts and analyze your research data with integrated tools.'
  },
  {
    icon: Users,
    title: 'Collaboration Tools',
    description: 'Work seamlessly with co-authors, share drafts, and manage feedback in real-time.'
  },
  {
    icon: Download,
    title: 'Export & Publishing',
    description: 'Export your work in multiple formats including LaTeX, Word, and PDF with journal-specific templates.'
  }
];

export default function Features() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Scientific Writing</h2>
          <p className="text-gray-600">Everything you need to write, collaborate, and publish your research papers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}