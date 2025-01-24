import FileUpload from "../components/FileUpload";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Presentation Upload</h1>
      <FileUpload />
    </div>
  );
}
