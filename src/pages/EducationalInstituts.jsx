import React from 'react'
import EducationTable from '../components/edu-instituts/edu-table'
import { AddEduTable } from '../components/edu-instituts/add-edu-dialog'

export default function EducationalInstituts() {
  return (
    <div>
        <div className='my-6 flex justify-between'>
            <div>
                <h2 className=' text-2xl font-bold'>Ta'lim muassasalari</h2>
            </div>

            <div>
                <AddEduTable/>
            </div>
        </div>
        <EducationTable/>
    </div>
  )
}
