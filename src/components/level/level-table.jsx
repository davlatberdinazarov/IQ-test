import React, { useContext, useEffect, useState } from 'react'
import CustomDataTable from '../../lib/CustomDataTable';

import { $api } from '../../utils/api';
import { sweetAlert } from '../../utils/sweetalert';
import { MainLayoutContext } from '../../layouts/MainLayout';
import Loading from '../../lib/Loading';

import { Link, useParams } from 'react-router-dom';
import { EditLevelDialog } from './edit-level-dialog';
import DeleteLevelDialog from './delete-level-dialog';


export default function LevelTable() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);

    const { colRender } = useContext(MainLayoutContext)
    
    const { collectionId } = useParams();

    useEffect(() => {
        const getAllLevels = async () => {
            try {
                const response = await $api.get(`/level/getAllByCollectionId/${collectionId}`);
                console.log(response.data);
                setLevels(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                sweetAlert('Cannot get data', 'error')
            }
        }
        getAllLevels()
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
            name: "Question", selector: (row) => {
                return (
                    <div>
                        <Link to={`${row.id}/questions`}>
                            <h2 className=' font-bold underline'>QUESTIONS</h2>
                        </Link>
                    </div>
                )
            }, sortable: true
        },
        {
            name: "Education name",
            selector: (row) => {
                return (
                    <div>{row.educationName}</div>
                )
            },
            sortable: true,
            width: "200px",
        },
        {
            name: "Question Count",
            selector: (row) => {
                return (
                    <div>{row.questionCount}</div>
                )
            },
            sortable: true,
            width: "200px",
        },
        {
            name: "Amallar",
            selector: (row) => (
                <div className="flex">
                    <EditLevelDialog data={row} />
                    <DeleteLevelDialog id={row.id} />
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
                data={levels}
                columns={columns}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </div>
    )
}
