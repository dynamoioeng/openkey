"use client";

import { useState, useRef, useEffect } from "react";
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

type UserIntent = {
  rawText: string;
  budgetMin?: number;
  budgetMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  preferredAreas: { lat: number; lon: number; name: string }[];
  preferredHandoverMonth?: string;
  keywords: string[];
  amenitiesRequested: string[];
};

type SearchResponse = {
  results: SearchResult[];
  intent: UserIntent;
};

type ConversationMessage = {
  role: "user" | "system";
  message: string;
  timestamp: number;
};

export default function SearchPage() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversationHistory, setConversationHistory] = useState<
    ConversationMessage[]
  >([]);
  const [currentIntent, setCurrentIntent] = useState<UserIntent | null>(null);
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Scroll conversation to bottom
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const handleSearch = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setLoading(true);
    setError("");
    setResults([]);

    // Add user message to conversation
    setConversationHistory((prev) => [
      ...prev,
      { role: "user", message: userMessage, timestamp: Date.now() },
    ]);
    setPrompt("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data: SearchResponse = await response.json();
      setResults(data.results);
      setCurrentIntent(data.intent);

      // Add system confirmation to conversation
      const systemMessage = `Found ${data.results.length} properties`;
      setConversationHistory((prev) => [
        ...prev,
        { role: "system", message: systemMessage, timestamp: Date.now() },
      ]);
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefinement = async () => {
    if (!refinementPrompt.trim()) return;

    const userMessage = refinementPrompt;
    setLoading(true);
    setError("");

    // Add user refinement to conversation
    setConversationHistory((prev) => [
      ...prev,
      { role: "user", message: userMessage, timestamp: Date.now() },
    ]);
    setRefinementPrompt("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Refinement failed");
      }

      const data: SearchResponse = await response.json();
      setResults(data.results);
      setCurrentIntent(data.intent);

      // Add system update to conversation
      const systemMessage = `Updated: showing ${data.results.length} properties`;
      setConversationHistory((prev) => [
        ...prev,
        { role: "system", message: systemMessage, timestamp: Date.now() },
      ]);
    } catch (err) {
      setError("Failed to refine search. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setConversationHistory([]);
    setCurrentIntent(null);
    setResults([]);
    setPrompt("");
    setRefinementPrompt("");
    setError("");
  };

  const handleRemoveFilter = async (filterType: string) => {
    if (!currentIntent) return;

    const updatedIntent = { ...currentIntent };
    let filterDescription = "";

    switch (filterType) {
      case "budget":
        updatedIntent.budgetMin = undefined;
        updatedIntent.budgetMax = undefined;
        filterDescription = "budget";
        break;
      case "location":
        updatedIntent.preferredAreas = [];
        filterDescription = "location";
        break;
      case "amenities":
        updatedIntent.amenitiesRequested = [];
        filterDescription = "amenities";
        break;
      case "keywords":
        updatedIntent.keywords = [];
        filterDescription = "style preferences";
        break;
    }

    // Add system message about filter removal
    setConversationHistory((prev) => [
      ...prev,
      {
        role: "system",
        message: `Removed ${filterDescription} filter`,
        timestamp: Date.now(),
      },
    ]);

    setLoading(true);
    setCurrentIntent(updatedIntent);

    try {
      // Re-search with updated intent (reconstruct prompt from intent)
      const reconstructedPrompt = reconstructPromptFromIntent(updatedIntent);
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: reconstructedPrompt }),
      });

      if (!response.ok) {
        throw new Error("Filter removal failed");
      }

      const data: SearchResponse = await response.json();
      setResults(data.results);
      setCurrentIntent(data.intent);
    } catch (err) {
      setError("Failed to update filters. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reconstructPromptFromIntent = (intent: UserIntent): string => {
    const parts: string[] = [];
    if (intent.budgetMax) parts.push(`under ${formatBudgetShort(intent.budgetMax)}`);
    if (intent.preferredAreas.length > 0)
      parts.push(`in ${intent.preferredAreas.map((a) => a.name).join(" or ")}`);
    if (intent.amenitiesRequested.length > 0)
      parts.push(`with ${intent.amenitiesRequested.join(", ")}`);
    if (intent.keywords.length > 0) parts.push(intent.keywords.join(" "));
    return parts.join(" ") || "show all properties";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (conversationHistory.length > 0) {
        handleRefinement();
      } else {
        handleSearch();
      }
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString("en-US")}`;
  };

  const formatBudgetShort = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M AED`;
    }
    return `${(amount / 1000).toFixed(0)}K AED`;
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

  // Split results into primary (>= 65) and secondary (< 65)
  const primaryResults = results.filter((r) => r.score >= 65);
  const secondaryResults = results.filter((r) => r.score < 65);
  const hasNoPrimaryMatches = primaryResults.length === 0 && results.length > 0;

  // Reusable result card component
  const renderResultCard = (result: SearchResult) => (
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
          <p className="text-sm text-gray-600 mb-4">{result.developer}</p>

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
  );

  // Generate filter chips from current intent
  const filterChips: Array<{ label: string; type: string }> = [];
  if (currentIntent) {
    if (currentIntent.budgetMax) {
      filterChips.push({
        label: `Budget: ≤${formatBudgetShort(currentIntent.budgetMax)}`,
        type: "budget",
      });
    }
    if (currentIntent.preferredAreas.length > 0) {
      filterChips.push({
        label: `Location: ${currentIntent.preferredAreas.map((a) => a.name).join(", ")}`,
        type: "location",
      });
    }
    if (currentIntent.amenitiesRequested.length > 0) {
      filterChips.push({
        label: `Amenities: ${currentIntent.amenitiesRequested.slice(0, 3).join(", ")}${
          currentIntent.amenitiesRequested.length > 3 ? "..." : ""
        }`,
        type: "amenities",
      });
    }
    if (currentIntent.keywords.length > 0) {
      filterChips.push({
        label: `Style: ${currentIntent.keywords.join(", ")}`,
        type: "keywords",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-900">
          OpenKey — Property Search
        </h1>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Conversation & Refinement */}
        {conversationHistory.length > 0 && (
          <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Refine Your Search
                </h2>
                <button
                  onClick={handleNewSearch}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                >
                  New Search
                </button>
              </div>
            </div>

            {/* Conversation History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {conversationHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.role === "user"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  } border rounded-lg p-3`}
                >
                  <div className="text-xs text-gray-500 mb-1">
                    {msg.role === "user" ? "You" : "System"}
                  </div>
                  <div className="text-sm text-gray-900">{msg.message}</div>
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>

            {/* Refinement Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={refinementPrompt}
                  onChange={(e) => setRefinementPrompt(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleRefinement();
                  }}
                  placeholder="Refine search (e.g., show cheaper)"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  onClick={handleRefinement}
                  disabled={loading || !refinementPrompt.trim()}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Area - Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            {/* Initial Search Input (only show if no conversation) */}
            {conversationHistory.length === 0 && (
              <div className="max-w-2xl mx-auto mb-12 mt-8">
                <div className="bg-white rounded-lg shadow-md p-6">
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
              </div>
            )}

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

            {/* Filter Chips */}
            {!loading && filterChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filterChips.map((chip, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{chip.label}</span>
                    <button
                      onClick={() => handleRemoveFilter(chip.type)}
                      className="text-blue-600 hover:text-blue-900 font-bold"
                      aria-label="Remove filter"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Results - Two-Tier Display */}
            {!loading && results.length > 0 && (
              <>
                {/* Primary Results Section */}
                <div>
                  {hasNoPrimaryMatches ? (
                    <p className="text-gray-600 mb-4">
                      No perfect matches found. Here are the closest options:
                    </p>
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Best Matches
                    </h2>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(hasNoPrimaryMatches ? results : primaryResults).map(
                      (result) => renderResultCard(result)
                    )}
                  </div>
                </div>

                {/* Secondary Results Section */}
                {!hasNoPrimaryMatches && secondaryResults.length > 0 && (
                  <div className="border-t-2 border-gray-200 my-8 pt-8">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                      Other Options — Consider These
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                      These properties are slightly over budget, have different
                      timelines, or don&apos;t match all criteria
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {secondaryResults.map((result) => renderResultCard(result))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {!loading &&
              results.length === 0 &&
              conversationHistory.length > 0 && (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-lg">
                    No results found. Try a different search.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

