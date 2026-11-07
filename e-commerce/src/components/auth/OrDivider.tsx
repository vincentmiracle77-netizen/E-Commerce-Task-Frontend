export default function OrDivider({ text }: { text: string }) {
  return (
    <div className="my-5 flex items-center gap-4 text-sm text-gray-600">
      <span className="h-px flex-1 bg-gray-300" />
      {text}
      <span className="h-px flex-1 bg-gray-300" />
    </div>
  );
}
