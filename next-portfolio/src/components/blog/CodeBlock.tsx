'use client';

import React, { useState } from 'react';
import { CheckIcon, ClipboardIcon, TerminalIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Extract language from className (e.g., "language-python" -> "python")
  const language = className?.replace('language-', '') || '';

  // Extract code text from children
  const getCodeText = () => {
    if (!children) return '';
    
    // If children is a string, use it directly
    if (typeof children === 'string') return children;
    
    // If children is a React element with code
    if (React.isValidElement(children) && children.props.children) {
      const codeChildren = children.props.children;
      if (typeof codeChildren === 'string') return codeChildren;
      if (Array.isArray(codeChildren)) {
        return codeChildren.join('');
      }
    }
    
    return '';
  };

  const copyCode = async () => {
    const text = getCodeText();
    if (text) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute right-0 top-0 flex items-center space-x-2 m-2 z-10">
        {/* Language badge */}
        {language && (
          <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 flex items-center">
            <TerminalIcon className="w-3 h-3 mr-1" />
            {language}
          </span>
        )}
        
        {/* Copy button */}
        <button
          onClick={copyCode}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          title="Copy code"
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4 text-green-400" />
          ) : (
            <ClipboardIcon className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>
      <pre className={className}>
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;
