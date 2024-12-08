type BlogThemeProps = {
  children: React.ReactNode;
};

export default function BlogTheme({ children }: BlogThemeProps) {
  return (
    <div className="min-h-screen bg-black text-teal-400">
      <div className="prose prose-invert max-w-none
        prose-headings:text-yellow-400
        prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-3xl prose-h2:mt-6 prose-h2:mb-3
        prose-h3:text-2xl prose-h3:mt-4 prose-h3:mb-2
        prose-p:text-teal-400 prose-p:my-4
        prose-a:text-yellow-400 hover:prose-a:text-yellow-300
        prose-strong:text-yellow-400
        prose-em:text-teal-300
        prose-code:text-teal-300
        prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4
        prose-ol:text-teal-400 prose-ul:text-teal-400
        prose-li:my-1
        prose-blockquote:text-teal-300 prose-blockquote:border-teal-500
        prose-img:rounded-lg
        prose-hr:border-teal-800">
        {children}
      </div>
    </div>
  );
}
