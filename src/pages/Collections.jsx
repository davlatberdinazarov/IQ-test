import React from 'react'
import CollectionTable from '../components/collections/collection-table'
import { AddCollectionDialog } from '../components/collections/add-collection-dialog'

export default function Collections() {
    return (
        <div>
            <div className='my-6 flex justify-between'>
                <div>
                    <h2 className=' text-2xl font-bold'>Bo'limlar</h2>
                </div>
                <div>
                    <AddCollectionDialog />
                </div>
            </div>
            <CollectionTable />
        </div>
    )
}
