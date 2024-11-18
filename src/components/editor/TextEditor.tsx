import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Bold, Italic, Underline, Link2, Image, Table, BarChart, Square, Trash } from 'lucide-react';

interface TextEditorProps {
  title: string;
  content: string;
  isStreaming?: boolean;
  onMount?: (editor: any) => void;
}

export default function TextEditor({ title, content, isStreaming, onMount }: TextEditorProps) {
  const editorRef = useRef<any>(null);
  const lastContentRef = useRef<string>('');

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    if (onMount) {
      onMount(editor);
    }
  };

  useEffect(() => {
    if (editorRef.current && content !== lastContentRef.current) {
      const position = editorRef.current.getPosition();
      editorRef.current.setValue(content);
      lastContentRef.current = content;
      
      if (position && !isStreaming) {
        editorRef.current.setPosition(position);
      } else if (isStreaming) {
        // 在流式传输时，将光标移动到末尾
        const lastLine = editorRef.current.getModel().getLineCount();
        const lastColumn = editorRef.current.getModel().getLineMaxColumn(lastLine);
        editorRef.current.setPosition({ lineNumber: lastLine, column: lastColumn });
      }
    }
  }, [content, isStreaming]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="border-b px-4 py-2">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Bold className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Italic className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Underline className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-gray-300 mx-2" />
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Link2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Image className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Table className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <BarChart className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-gray-300 mx-2" />
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Square className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={content}
          theme="vs"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'off',
            wordWrap: 'on',
            padding: { top: 16 },
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden'
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            renderLineHighlight: 'none',
            contextmenu: false,
            readOnly: isStreaming,
          }}
        />
      </div>
    </div>
  );
}