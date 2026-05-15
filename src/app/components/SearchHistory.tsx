import { useState } from "react";
import { Search, Clock, X } from "lucide-react";

interface SearchHistoryProps {
  searchHistory: string[];
  onSelectSearch: (query: string) => void;
  onClearHistory: () => void;
}

export function SearchHistory({ searchHistory, onSelectSearch, onClearHistory }: SearchHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!searchHistory || searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs text-[#7e7369] hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-2 py-1"
        aria-label="Ver histórico de busca"
      >
        <Clock className="w-3.5 h-3.5" />
        {isOpen ? "Ocultar histórico" : "Ver histórico"}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl border border-border shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#2a211c]">Buscas recentes</p>
              <button
                onClick={onClearHistory}
                className="text-xs text-brand-accent hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-1"
              >
                Limpar
              </button>
            </div>
            <div className="space-y-1">
              {searchHistory.map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectSearch(query);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs text-[#655b53] hover:bg-brand-primary-soft transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                >
                  <Search className="w-3 h-3 text-[#9a9188]" />
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}