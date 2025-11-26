export function HeadingDescription({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col pt-8">
      <h3 className="font-medium ">{title}</h3>
      <h2 className="font-normal text-lg text-muted-foreground">{description}</h2>
    </div>
  );
}
