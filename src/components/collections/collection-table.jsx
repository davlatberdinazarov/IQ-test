import React, { useContext, useEffect, useState } from 'react'
import CustomDataTable from '../../lib/CustomDataTable';

import { $api } from '../../utils/api';
import { sweetAlert } from '../../utils/sweetalert';
import { MainLayoutContext } from '../../layouts/MainLayout';
import Loading from '../../lib/Loading';
import { EditCollectionDialog } from './edit-collection-dialog';
import DeleteCollectionDialog from './delete-collection-dialog';
import { Link, useParams } from 'react-router-dom';

export default function CollectionTable() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const { colRender } = useContext(MainLayoutContext)
    const { subjectId } = useParams();

    useEffect(() => {
        const getAllCollections = async () => {
            try {
                const response = await $api.get(`/collection/getCollectionsBySubjectId/${subjectId}?isDemo=false`);
                console.log(response.data);
                setCollections(response.data[0]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                sweetAlert('Cannot get data', 'error')
            }
        }
        getAllCollections()
    }, [colRender])

    const columns = [
        {
            name: "TR",
            selector: (row, index) => (page - 1) * perPage + index + 1,
            sortable: true,
            width: "86px",
        },
        {
            name: "Title", selector: (row) => {
                return (
                    <div>
                        <span className="capitalize">{row.title}</span>
                    </div>
                )
            }, sortable: true
        },
        {
            name: "Level", selector: (row) => {
                return (
                    <div>
                        <Link to={`${row.id}/level`}>
                            <h2 className=' font-bold underline'>LEVEL</h2>
                        </Link>
                    </div>
                )
            }, sortable: true
        },
        {
            name: "Desctiption",
            selector: (row) => {
                return (
                    <div>{row.description}</div>
                )
            },
        },
        {
            name: "Subject name",
            selector: (row) => {
                return (
                    <div>{row.subjectName}</div>
                )
            },
            sortable: true,
            width: "200px",
        },
        {
            name: "Amallar",
            selector: (row) => (
                <div className="flex">
                    <EditCollectionDialog data={row} />
                    <DeleteCollectionDialog id={row.id} />
                </div>
            ),
            sortable: true,
            width: "140px",
        },
    ];

    if (loading) {
        return (
            <Loading />
        )
    }


    return (
        <div>
            <CustomDataTable
                data={collections ? collections : []}
                columns={columns}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </div>
    )
}
