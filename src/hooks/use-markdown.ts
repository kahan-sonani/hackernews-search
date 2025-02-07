import { useState, useEffect } from 'react';
import { marked } from 'marked';

interface UseMarkdownToHtmlResult {
  html: string;
  loading: boolean;
  error: Error | null;
}

function useMarkdownToHtml(markdown: string | null | undefined): UseMarkdownToHtmlResult {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!markdown) {
      setHtml('');
      setLoading(false);
      setError(null);
      return;
    }

    const convertMarkdown = async () => {
      setLoading(true);
      setError(null);

      try {
        const parsedHtml = await marked.parse(markdown, { breaks: true });
        setHtml(parsedHtml);
      } catch (err: any) {
        console.error('Error converting markdown to HTML:', err);
        setError(err as Error);
        setHtml('<p class="error">[Error displaying content]</p>');
      } finally {
        setLoading(false);
      }
    };

    convertMarkdown();
  }, [markdown]);

  return { html, loading, error };
}

export default useMarkdownToHtml;
