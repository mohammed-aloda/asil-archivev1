import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const CustomRequest: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', idea: '' });
  const [submitted, setSubmitted] = useState(false);

  // File Upload State
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Drag Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.idea) return;

    setIsSubmitting(true);

    // Create FormData to send files + text
    const data = new FormData();
    data.append('name', formData.name);
    data.append('idea', formData.idea);
    files.forEach((file) => {
      data.append('files', file);
    });

    try {
      // Sending to backend on port 4242
      const response = await fetch('/api/send-request', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send request: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-serif text-asl-espresso mb-4">Request Received</h2>
        <p className="text-asl-espresso/60 mb-8 max-w-md">
          Thank you, {formData.name}. Our artisans will review your concept for a bespoke creation. We will contact you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', idea: '' });
            setFiles([]); // Reset files
          }}
          className="text-xs uppercase tracking-widest border-b border-asl-gold text-asl-gold hover:text-asl-espresso transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif text-asl-espresso mb-8 text-center">Bespoke Commission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-asl-espresso">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full bg-transparent border-b border-asl-stone py-2 outline-none focus:border-asl-gold transition-colors text-asl-espresso"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-asl-espresso">Origin / Idea</label>
          <textarea
            value={formData.idea}
            onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
            required
            className="w-full bg-transparent border-b border-asl-stone py-2 outline-none focus:border-asl-gold transition-colors h-32 text-asl-espresso"
          />
        </div>

        {/* File Upload Section */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-asl-espresso">Sketches / Reference Images</label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                ${dragActive ? 'border-asl-gold bg-asl-gold/10' : 'border-asl-stone/30 hover:border-asl-gold/50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleChange}
            />

            <div className="flex flex-col items-center gap-2 text-asl-espresso/60">
              <Upload className="w-8 h-8 opacity-50" />
              <p className="text-sm">
                <span className="font-semibold text-asl-gold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs opacity-50">SVG, PNG, JPG or PDF (MAX. 10MB)</p>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2 mt-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-asl-stone/10 rounded-md">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 bg-asl-paper rounded flex items-center justify-center flex-shrink-0">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-asl-espresso/50" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm text-asl-espresso truncate">{file.name}</span>
                      <span className="text-[10px] text-asl-espresso/50">{(file.size / 1024).toFixed(0)} KB</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening file dialog
                      removeFile(index);
                    }}
                    className="text-asl-espresso/40 hover:text-red-500 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-gold w-full mt-8 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending Request...' : 'Submit Request'}
        </button>
      </form >
    </div >
  );
};

export default CustomRequest;