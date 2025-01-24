import PresentationViewer from "../../../components/PresentationViewer";

export default function PresentationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-4">
      <PresentationViewer id={params.id} />
    </div>
  );
}
