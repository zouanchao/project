import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Share2, Settings, Download } from 'lucide-react';
import EditorSidebar from '../components/editor/EditorSidebar';
import ChatDialog from '../components/editor/ChatDialog';
import DocumentOutline from '../components/editor/DocumentOutline';
import TextEditor from '../components/editor/TextEditor';
import { parseOutlineFromMarkdown } from '../utils/outlineParser';

interface LocationState {
  title: string;
}

interface OutlineItem {
  id: string;
  title: string;
  level: number;
  lineNumber?: number;
}

export default function Editor() {
  const location = useLocation();
  const { title = 'Untitled Document' } =
    (location.state as LocationState) || {};
  const [wordCount, setWordCount] = useState(14);
  const [editorContent, setEditorContent] = useState(`# ${title}\n`);
  const [isStreaming, setIsStreaming] = useState(false);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [editorInstance, setEditorInstance] = useState<any>(null);

  useEffect(() => {
    const newOutline = parseOutlineFromMarkdown(editorContent);
    setOutline(newOutline);
  }, [editorContent]);

  const handleOutlineGenerated = (content: string, streaming: boolean) => {
    setIsStreaming(streaming);
    if (content) {
      // 只在流式传输时追加内容，否则替换内容
      setEditorContent(streaming ? content : `# ${title}\n${content}`);
    }
  };

  const handleOutlineItemClick = (item: OutlineItem) => {
    if (editorInstance && item.lineNumber) {
      editorInstance.revealLineInCenter(item.lineNumber);
      editorInstance.setPosition({
        lineNumber: item.lineNumber,
        column: 1,
      });
      editorInstance.focus();
    }
  };

  const handleEditorMount = (editor: any) => {
    setEditorInstance(editor);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1">Back to Documents</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{wordCount} words</span>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        <EditorSidebar />
        <ChatDialog onOutlineGenerated={handleOutlineGenerated} />
        <DocumentOutline
          title={title}
          outline={outline}
          onItemClick={handleOutlineItemClick}
        />
        <TextEditor
          title={title}
          content={editorContent}
          isStreaming={isStreaming}
          onMount={handleEditorMount}
        />
      </div>
    </div>
  );
}
