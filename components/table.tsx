import { TypeTable, TypeNode } from '@/components/type-table';

export function Table({ data }: { data: Record<string, TypeNode> }) {
  return (
    <div className="">
      <TypeTable type={data} />
    </div>
  );
}
