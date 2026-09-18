import React from 'react';
import ExperienceProjectPage from './ExperienceProjectPage';

export default function ExternDetailPage() {
  return (
    <ExperienceProjectPage
      eyebrow="Extern via Outamation · AI Engineering Extern"
      title="Mortgage RAG Chatbot"
      tagline="A retrieval-augmented generation chatbot that extracts and indexes content from mortgage PDFs — both digital and scanned — enabling natural language Q&A powered by Claude Haiku."
      tags={['RAG', 'AI', 'Python', 'NLP']}
      live="https://shash34-mortgage-rag-chatbot.hf.space"
      overview={`This project builds a RAG-based chatbot that lets users upload mortgage PDF documents and ask natural language questions about them. It handles both digital and scanned PDFs through a multi-layered extraction pipeline, then uses LlamaIndex to chunk, embed, and index the content for semantic retrieval.\n\nThe goal is to make dense, jargon-heavy mortgage documents accessible — users can ask plain-English questions and get accurate, grounded answers instead of manually searching through pages of legal text.`}
      howItWorks={`PDFs are processed through PyMuPDF for digital text extraction, with Tesseract OCR and EasyOCR as layered fallbacks for scanned pages. The extracted text is chunked and embedded using sentence-transformers (all-MiniLM-L6-v2), then indexed with LlamaIndex for semantic retrieval.\n\nWhen a user asks a question, the most relevant chunks are retrieved and passed as context to Claude Haiku, which generates a grounded, accurate response. The chat interface is built with Gradio and hosted on Hugging Face Spaces.`}
      features={[
        'Handles both digital and scanned PDFs',
        'Multi-layer OCR fallback pipeline',
        'Semantic search via sentence-transformers',
        'Claude Haiku for grounded AI responses',
        'Conversational chat interface via Gradio',
      ]}
      techStack={[
        { category: 'PDF / OCR', items: ['PyMuPDF (fitz)', 'Tesseract OCR', 'EasyOCR'] },
        { category: 'RAG Pipeline', items: ['LlamaIndex', 'sentence-transformers (all-MiniLM-L6-v2)', 'HuggingFace Embeddings', 'Claude Haiku'] },
        { category: 'Frontend & Deployment', items: ['Gradio', 'Hugging Face Spaces'] },
      ]}
    />
  );
}
