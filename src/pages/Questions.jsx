import React from 'react'
import QuestionsTable from '../components/questions/questions-table'
import { AddQuestionDialog } from '../components/questions/add-question-dialog'
import { ButtonGroup } from '@material-tailwind/react'
import { AddQuestionImageDialog } from '../components/questions/add-question-image-dialog'

export default function Questions() {
  return (
    <div>
      <div className='my-6 flex justify-between'>
        <div>
          <h2 className=' text-2xl font-bold'>Savollar</h2>
        </div>
        <div>
          <ButtonGroup>
            <AddQuestionDialog />
            <AddQuestionImageDialog/>
          </ButtonGroup>
        </div>
      </div>
      <QuestionsTable />
    </div>
  )
}
