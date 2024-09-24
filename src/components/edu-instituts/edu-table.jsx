import React, { useContext, useEffect, useState } from 'react'
import CustomDataTable from '../../lib/CustomDataTable';
import { EditEduTable } from './edit-edu-dialog';
import { DeleteEduTable } from './delete-edu-dialog';
import { $api } from '../../utils/api';
import { sweetAlert } from '../../utils/sweetalert';
import { MainLayoutContext } from '../../layouts/MainLayout';
import Loading from '../../lib/Loading';

export default function EducationTable() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);

    const { eduRender } = useContext(MainLayoutContext)

    useEffect(() => {
        const getAllEducations = async () => {
            try {
                const response = await $api.get('/education/getAll');
                console.log(response.data);
                setEducations(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                sweetAlert('Cannot get data', 'error')
            }
        }
        getAllEducations()
    }, [eduRender])

    const columns = [
        {
            name: "TR",
            selector: (row, index) => (page - 1) * perPage + index + 1,
            sortable: true,
            width: "86px",
        },
        {
            name: "Name", selector: (row) => {
                return (
                    <div>
                        <span className="capitalize">{row.name}</span>
                    </div>
                )
            }, sortable: true
        },
        {
            name: "Yaratilgan vaqt",
            selector: (row) => {
                return (
                    <div>{row.createdAt[0]}/{row.createdAt[1]}/{row.createdAt[2]}</div>
                )
            },
            sortable: true,
            width: "150px",
        },
        {
            name: "Amallar",
            selector: (row) => (
                <div className="flex">
                    <EditEduTable data={row} />
                    <DeleteEduTable id={row.id} />
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
                data={educations}
                columns={columns}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </div>
    )
}
