'use client';

import { useEffect } from 'react';
import { CheckIcon, ClipboardIcon, TerminalIcon } from '@heroicons/react/24/outline';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    // Find all pre elements with code
    const preElements = document.querySelectorAll('pre code');

    preElements.forEach((element) => {
      const pre = element.parentElement;
      if (!pre || pre.parentElement?.classList.contains('has-copy-button')) return;

      // Create wrapper div
      const wrapper = document.createElement('div');
      wrapper.className = 'relative group has-copy-button';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'absolute right-2 top-2 p-2 rounded bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200';
      copyButton.innerHTML = `
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      `;

      copyButton.addEventListener('click', async () => {
        const code = element.textContent || '';
        await navigator.clipboard.writeText(code);

        copyButton.innerHTML = `
          <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `;

        setTimeout(() => {
          copyButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          `;
        }, 2000);
      });

      wrapper.appendChild(copyButton);
    });
  }, [content]);

  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
