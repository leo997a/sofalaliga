
import React from 'react';

interface StatSelectorProps {
  title: string;
  options: string[];
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const StatSelector: React.FC<StatSelectorProps> = ({ title, options, selected, setSelected }) => {
  const handleToggle = (option: string) => {
    const newSet = new Set(selected);
    if (newSet.has(option)) {
      newSet.delete(option);
    } else {
      newSet.add(option);
    }
    setSelected(newSet);
  };

  const selectAll = () => {
    setSelected(new Set(options));
  };

  const deselectAll = () => {
    setSelected(new Set());
  };

  return (
    <div className="p-6 bg-brand-secondary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-brand-accent">{title}</h2>
      
      <div className="flex space-x-4 mb-6">
        <button onClick={selectAll} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">Select All</button>
        <button onClick={deselectAll} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">Deselect All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selected.has(option) ? 'bg-brand-accent/20 ring-2 ring-brand-accent' : 'bg-brand-primary/50 hover:bg-brand-primary'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => handleToggle(option)}
              className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-brand-accent focus:ring-brand-accent focus:ring-offset-brand-secondary"
            />
            <span className="ml-3 text-brand-text">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StatSelector;
