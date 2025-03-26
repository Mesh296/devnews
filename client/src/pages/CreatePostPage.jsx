import React, { useState, useEffect } from 'react';
import { createPost } from '../services/posts/postService';
import { getAllCategories } from '../services/categories/categoryService';
import { useNavigate } from 'react-router-dom';

export const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    originalUrl: '',
    categories: []
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postData = {
        title: formData.title,
        description: formData.description,
        originalUrl: formData.originalUrl,
        categories: formData.categories // Array of category UUIDs
      };
      const newPost = await createPost(postData);
      navigate('/'); // Redirect to posts list or wherever you want
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <div className="border rounded-xl border-b-0 min-h-screen p-6 w-full max-w-3xl bg-surface">
        <h1 className="text-2xl font-bold text-element-primary mb-6">Create New Post</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-element-primary font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-on-surface-1 border border-stroke-bold rounded-xl w-full p-3 focus:ring-stroke-bold focus:border-stroke-bold text-element-primary placeholder-element-secondary"
              placeholder="Post Title"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-element-primary font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-on-surface-1 border border-stroke-bold rounded-xl w-full p-3 h-24 focus:ring-stroke-bold focus:border-stroke-bold text-element-primary placeholder-element-secondary"
              placeholder="Short description (optional)"
            />
          </div>

          {/* Original URL Input */}
          <div>
            <label className="block text-element-primary font-medium mb-2">Original URL</label>
            <input
              type="url"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleInputChange}
              className="bg-on-surface-1 border border-stroke-bold rounded-xl w-full p-3 focus:ring-stroke-bold focus:border-stroke-bold text-element-primary placeholder-element-secondary"
              placeholder="https://example.com"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-element-primary font-medium mb-2">Categories</label>
            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="form-checkbox text-brand-color"
                    />
                    <span className="text-element-secondary">{category.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-element-secondary">Loading categories...</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-medium ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-color hover:bg-element-primary'
              }`}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};