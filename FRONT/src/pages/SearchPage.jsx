import React, { useState } from "react";
import SearchResults from "../components/SearchResults/SearchResults";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage({ onShowProduct }) {
  const query = useQuery().get("q") || "";
  return (
    <div style={{ minHeight: "60vh" }}>
      <SearchResults query={query} onShowProduct={onShowProduct} />
    </div>
  );
}
