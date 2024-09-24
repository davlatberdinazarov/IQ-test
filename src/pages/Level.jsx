import React from 'react'
import LevelTable from '../components/level/level-table'
import { AddLevelDialog } from '../components/level/add-level-dialog'

export default function Level() {
  return (
    <div>
      <div className='my-6 flex justify-between'>
        <div>
          <h2 className=' text-2xl font-bold'>Level</h2>
        </div>
        <div>
          <AddLevelDialog />
        </div>
      </div>
      <LevelTable />
    </div>
  )
}
