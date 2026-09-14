import React, { useState, useEffect } from "react";

interface WordPressPageProps {
  slug: string;
  fallbackTitle: string;
  fallbackContent: string;
}

const WordPressPage: React.FC<WordPressPageProps> = ({ slug, fallbackTitle, fallbackContent }) => {
  const [content, setContent] = useState<string>(fallbackContent);
  const [title, setTitle] = useState<string>(fallbackTitle);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const wpApiUrl = (window as any).WordPressData?.apiUrl;
        if (wpApiUrl) {
          setIsLoading(true);
          // Fetch page by slug using standard WordPress REST API
          const response = await fetch(`${wpApiUrl}wp/v2/pages?slug=${slug}`);
          const data = await response.json();
          if (data && data.length > 0) {
            setTitle(data[0].title.rendered);
            setContent(data[0].content.rendered);
          }
        }
      } catch (error) {
        console.error(`Error fetching WordPress page (${slug}):`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, [slug]);

  if (isLoading && (window as any).WordPressData?.apiUrl) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-sans">Loading Page Content...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-8" dangerouslySetInnerHTML={{ __html: title }} />
        
        {/* Render content raw if fetched from WP (since WP stores HTML). If fallback it might be plain text / HTML */}
        <div 
          className="format-wp-content text-gray-700 dark:text-gray-300 font-sans space-y-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </div>
  );
};

export default WordPressPage;
