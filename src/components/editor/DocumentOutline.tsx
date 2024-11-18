import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';

interface OutlineItem {
  id: string;
  title: string;
  level: number;
  lineNumber?: number;
}

interface TreeNode {
  item: OutlineItem;
  children: TreeNode[];
}

interface DocumentOutlineProps {
  title: string;
  outline: OutlineItem[];
  onItemClick: (item: OutlineItem) => void;
}

export default function DocumentOutline({ title, outline, onItemClick }: DocumentOutlineProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // 修改树构建逻辑，确保一级标题平级显示
  const buildTree = (items: OutlineItem[]): TreeNode[] => {
    const tree: TreeNode[] = [];
    let currentL1Node: TreeNode | null = null;
    let currentL2Node: TreeNode | null = null;

    items.forEach((item) => {
      const node: TreeNode = { item, children: [] };

      if (item.level === 1) {
        // 一级标题直接加入主树
        currentL1Node = node;
        currentL2Node = null;
        tree.push(node);
      } else if (item.level === 2) {
        // 二级标题加入当前一级标题的children
        if (currentL1Node) {
          currentL1Node.children.push(node);
          currentL2Node = node;
        }
      } else if (item.level === 3) {
        // 三级标题加入当前二级标题的children
        if (currentL2Node) {
          currentL2Node.children.push(node);
        } else if (currentL1Node) {
          // 如果没有二级标题，加入一级标题的children
          currentL1Node.children.push(node);
        }
      }
    });

    return tree;
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const renderTreeNode = (node: TreeNode, depth: number = 0) => {
    const { item, children } = node;
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodes.has(item.id);
    const paddingLeft = depth * 16;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors ${
            item.level === 1 ? 'font-semibold' : ''
          }`}
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
          onClick={() => onItemClick(item)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(item.id);
              }}
              className="p-1 hover:bg-gray-200 rounded mr-1"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
          )}
          {!hasChildren && <span className="w-6" />}
          <span className="flex-1 truncate">{item.title}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const treeData = buildTree(outline);

  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Document Outline</h2>
          <button 
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => {
              const allIds = outline.map(item => item.id);
              if (expandedNodes.size === allIds.length) {
                setExpandedNodes(new Set());
              } else {
                setExpandedNodes(new Set(allIds));
              }
            }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {treeData.map((node) => renderTreeNode(node))}
        </div>
      </div>

      <div className="p-4 border-t">
        <button className="w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-500 hover:text-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </button>
      </div>
    </div>
  );
}