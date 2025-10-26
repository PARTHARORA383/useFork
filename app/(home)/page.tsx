"use client"

import { CommandK } from '@/components/command-k';
import { DynamicIsland } from '@/components/dynamic-island';
import { RollInText } from '@/components/roll-in-text';
import { Table } from '@/components/table';
import { TypeTable } from '@/components/type-table';




export default function HomePage() {

const data = {
  percentage: {
    description:
      'The percentage of scroll position to display the roll button',
    type: 'number',
    default: 0.2,
  },
  duration: {
    description:
      'The percentage of scroll position to display the roll button',
    type: 'number',
    default: 0.2,
  },
}

  return (
    <main className="flex flex-col h-[100vh] items-center justify-center">
        <DynamicIsland/>
        <Table data={data}/>
    </main>
  );
}



