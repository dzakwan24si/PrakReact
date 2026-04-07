import { useState } from 'react';
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });
  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Simple Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Frameworks</h1>
          <p className="text-gray-600">
            List of available development frameworks
          </p>
        </div>

        {/* Simple List */}
        <div className="space-y-4">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search framework..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            name="selectedTag"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {filteredFrameworks.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {item.details.releaseYear}
                </span>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span>By {item.details.developer}</span>
                <span>•</span>
                <a
                  href={item.details.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Website
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
