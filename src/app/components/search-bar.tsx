"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    setQuery(searchQuery);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    router.replace(`/discover?query=${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Telusuri disini..."
        className=" text-base-content ms-2 outline-none  w-full"
      />
    </form>
  );
}
