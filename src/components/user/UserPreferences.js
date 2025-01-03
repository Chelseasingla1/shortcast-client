import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCategories, updatePreferences } from '../../services/api';
import '../../styles/UserPreferences.css';

function UserPreferences() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const mutation = useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  });

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="preferences-container">
      <div className="preferences-header">
        <h2 className="preferences-title">Your Preferences</h2>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <label key={category.id} className="category-item">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="checkbox-input"
              />
              <span className="checkbox-display" />
            </div>
            <span className="category-label">{category.name}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => mutation.mutate(selectedCategories)}
        disabled={mutation.isPending}
        className={`save-button ${mutation.isPending ? 'loading' : ''}`}
      >
        {mutation.isPending ? '' : 'Save Preferences'}
      </button>

      {showSuccess && (
        <div className="success-message">
          Preferences updated successfully!
        </div>
      )}
    </div>
  );
}

export default UserPreferences;