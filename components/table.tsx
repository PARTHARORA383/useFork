


import { TypeTable, TypeNode } from '@/components/type-table';





export function Table({ data }: { data: Record<string, TypeNode> }) {
  return (
    <div className='min-w-3xl max-w-4xl'>
      <TypeTable
        type={data}
      />
    </div>
  )
}