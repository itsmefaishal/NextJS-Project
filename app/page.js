"use client";
import InputText from "@/components/InputText";

export default function Home() {
  
  const handleSubmitText = (text) => {
    fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error occurred while sending text to API:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-8">
          <h3 className="text-3xl leading-9 font-extrabold text-gray-100 text-center">
            ENTER YOUR PROMPT
          </h3>
          <InputText onSubmitText={handleSubmitText} />
        </div>
        <footer className="text-gray-300 text-xs bg-gray-900 px-6 py-4 text-center">
          Project by Faishal Rahman
        </footer>
      </div>
    </div>
  );
}
