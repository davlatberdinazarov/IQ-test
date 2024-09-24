import React from 'react'
import SubjectTable from '../components/subjects/subject-table'
import { AddSubjectTable } from '../components/subjects/add-subject-dialog'

export default function Subjects() {
  return (
    <div>
        <div className='my-6 flex justify-between'>
            <div>
                <h2 className=' text-2xl font-bold'>Fanlar</h2>
            </div>

            <div>
              <AddSubjectTable/>
            </div>
        </div>
        <SubjectTable/>
    </div>
  )
}
