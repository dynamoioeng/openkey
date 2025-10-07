"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type SearchResult = {
  id: string;
  name: string;
  developer: string;
  thumbnail: string;
  price_aed: number;
  handover_month: string;
  score: number;
  rationale: string;
};

type SearchResponse = {
  results: SearchResult[];
};

export default function SearchPage() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data: SearchResponse = await response.json();
      setResults(data.results);
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString("en-US")}`;
  };

  const formatHandover = (handoverMonth: string) => {
    // Convert "2027-06" to "Jun 2027"
    const [year, month] = handoverMonth.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[monthIndex]} ${year}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500 text-white";
    if (score >= 60) return "bg-blue-500 text-white";
    if (score >= 40) return "bg-yellow-500 text-black";
    return "bg-red-500 text-white";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          OpenKey — Property Search
        </h1>

        {/* Search Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Family-friendly 2BR near parks under AED 2.5M"
              className="w-full text-lg px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading || !prompt.trim()}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching properties...</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={`/project/${result.id}`}>
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={result.thumbnail}
                      alt={result.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {/* Score Badge */}
                    <div
                      className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-lg ${getScoreColor(
                        result.score
                      )}`}
                    >
                      {result.score}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {result.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {result.developer}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatPrice(result.price_aed)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Handover</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatHandover(result.handover_month)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Rationale Details */}
                <div className="px-6 pb-6">
                  <details className="cursor-pointer">
                    <summary className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Why this score?
                    </summary>
                    <p className="mt-2 text-sm text-gray-700 pl-4">
                      {result.rationale}
                    </p>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && prompt && (
          <div className="text-center py-12 text-gray-600">
            <p className="text-lg">No results found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

