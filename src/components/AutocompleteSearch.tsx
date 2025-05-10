import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockProperties } from '../data/mockProperties';
import { useNavigate } from 'react-router-dom';

interface AutocompleteSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
  placeholder = "Cidade, bairro ou endereço", 
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Add click event listener to close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      // Filter properties data to find matching locations or titles
      const uniqueLocations = new Set<string>();
      
      // Add neighborhoods
      mockProperties.forEach(property => {
        if (property.address.neighborhood.toLowerCase().includes(query.toLowerCase())) {
          uniqueLocations.add(property.address.neighborhood);
        }
      });
      
      // Add cities
      mockProperties.forEach(property => {
        if (property.address.city.toLowerCase().includes(query.toLowerCase())) {
          uniqueLocations.add(property.address.city);
        }
      });
      
      // Add streets
      mockProperties.forEach(property => {
        if (property.address.street.toLowerCase().includes(query.toLowerCase())) {
          uniqueLocations.add(property.address.street);
        }
      });
      
      // Add property titles
      mockProperties.forEach(property => {
        if (property.title.toLowerCase().includes(query.toLowerCase())) {
          uniqueLocations.add(property.title);
        }
      });
      
      setSuggestions(Array.from(uniqueLocations).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      // Add to recent searches
      const updatedSearches = [
        query, 
        ...recentSearches.filter(search => search !== query)
      ].slice(0, 5);
      
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      // Call onSearch callback or navigate
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/properties?search=${encodeURIComponent(query)}`);
      }
      
      // Close suggestions
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="pl-10"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center rounded-l-none bg-navy-700 hover:bg-navy-800 text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
          type="button"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {isFocused && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
        >
          {suggestions.length > 0 ? (
            <div>
              <p className="px-4 py-2 text-xs text-muted-foreground">Sugestões</p>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : recentSearches.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs text-muted-foreground">Buscas recentes</p>
              <ul>
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                      {search}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
