import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

type WritingStyle = 'professional' | 'casual' | 'creative' | 'academic';

interface GenerationOptions {
  style: WritingStyle;
  length: 'short' | 'medium' | 'long';
}

const TextGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<GenerationOptions>({
    style: 'professional',
    length: 'medium',
  });

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-text`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input, ...options }),
      });

      const data = await response.json();
      setOutput(data.text);
    } catch (error) {
      console.error('Error generating text:', error);
      setOutput('An error occurred while generating text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Writing Style</label>
            <select
              value={options.style}
              onChange={(e) => setOptions({ ...options, style: e.target.value as WritingStyle })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="academic">Academic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Length</label>
            <select
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: e.target.value as 'short' | 'medium' | 'long' })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Prompt</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text prompt here..."
            className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !input.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>

      {output && (
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Generated Text</h2>
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{output}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;