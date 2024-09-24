import React from 'react'
import QuestionsTable from '../components/questions/questions-table'
import { AddQuestionDialog } from '../components/questions/add-question-dialog'

export default function Questions() {
  return (
    <div>
      <div className='my-6 flex justify-between'>
        <div>
          <h2 className=' text-2xl font-bold'>Savollar</h2>
        </div>
        <div>
          <AddQuestionDialog />
        </div>
      </div>
      <QuestionsTable />
    </div>
  )
}
