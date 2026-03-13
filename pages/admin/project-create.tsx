import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabaseAdmin } from '../../lib/supabase';

interface ProjectForm {
  title: string;
  description: string;
  tags: string;
  github_url: string;
  live_url: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_published: boolean;
}

export default function CreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectForm>();

  const onSubmit = async (data: ProjectForm) => {
    setError('');
    setIsLoading(true);

    try {
      // Convert comma-separated tags to array
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

      const projectData = {
        title: data.title,
        description: data.description,
        tags: tagsArray,
        github_url: data.github_url || null,
        live_url: data.live_url || null,
        image_url: data.image_url,
        alt_text: data.alt_text || data.title,
        display_order: data.display_order || 0,
        is_published: data.is_published,
      };

      const { error } = await supabaseAdmin.from('projects').insert(projectData);
      
      if (error) throw error;

      alert('Project created successfully!');
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout activeTab="create">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Add New Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details below to add a new project to your portfolio
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="e.g., E-Commerce Platform"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies/Skills (comma-separated) *
            </label>
            <input
              id="tags"
              type="text"
              {...register('tags', { required: 'Tags are required' })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="React, Node.js, MongoDB"
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                id="github_url"
                type="url"
                {...register('github_url')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label htmlFor="live_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live Demo URL
              </label>
              <input
                id="live_url"
                type="url"
                {...register('live_url')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL *
            </label>
            <input
              id="image_url"
              type="url"
              {...register('image_url', { required: 'Image URL is required' })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="/1.png or https://..."
            />
            {errors.image_url && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image_url.message}</p>
            )}
          </div>

          {/* Alt Text */}
          <div>
            <label htmlFor="alt_text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Alt Text
            </label>
            <input
              id="alt_text"
              type="text"
              {...register('alt_text')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Brief description of the image"
            />
          </div>

          {/* Display Order */}
          <div>
            <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Order
            </label>
            <input
              id="display_order"
              type="number"
              {...register('display_order', { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="0"
              min="0"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Lower numbers appear first
            </p>
          </div>

          {/* Published Status */}
          <div className="flex items-center">
            <input
              id="is_published"
              type="checkbox"
              {...register('is_published')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Publish this project immediately
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              <FiSave className="mr-2" />
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
            >
              <FiX className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
