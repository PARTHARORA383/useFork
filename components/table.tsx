


import { TypeTable, TypeNode } from '@/components/type-table';


export function Table({ data }: { data: Record<string, TypeNode> }) {
  return (
    <div className='lg:min-w-3xl lg:max-w-4xl'>
      <TypeTable
        type={data}
      />
    </div>
  )
}