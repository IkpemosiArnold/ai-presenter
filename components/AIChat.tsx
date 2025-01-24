"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function AIChat({ id, url }: { id: string; url: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { id },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          className="w-full p-2 border rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question about the presentation..."
        />
      </form>
    </div>
  );
}
