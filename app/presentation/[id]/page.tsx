import PresentationViewer from "../../../components/PresentationViewer";

export default async function PresentationPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  return (
    <div className="container mx-auto p-4">
      <PresentationViewer id={params.id} />
    </div>
  );
}
