import React, { useContext, useEffect, useState } from 'react'
import { MainLayoutContext } from '../../layouts/MainLayout';
import { $api } from '../../utils/api';
import Loading from '../../lib/Loading';
import CustomDataTable from '../../lib/CustomDataTable';
import { BASE_URL } from '../../utils';
import { EditSubjectTable } from './edit-subject-dialog';
import { DeleteSubjectTable } from './delete-subject-table';
import { Link } from 'react-router-dom';

export default function SubjectTable() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const { subRender } = useContext(MainLayoutContext);

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const response = await $api.get('/subject/getAllSubjects');
                console.log(response);
                if (response.status === 200) {
                    setSubjects(response.data.content);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        getAllSubjects()
    }, [subRender]);

    const columns = [
        {
            name: "TR",
            selector: (row, index) => (page - 1) * perPage + index + 1,
            sortable: true,
            width: "86px",
        },
        {
            name: "Banner",
            selector: (row) => (
                <div
                    className="flex items-center rounded-sm h-12 my-2 w-28 gap-3"
                >
                    <img
                        className="w-full h-full object-cover rounded shadow-md"
                        src={`http://158.220.111.34:8086/api/v1/user/getFiles/${row.imgName}`}
                        alt={row.name}
                    />
                </div>
            ),
            sortable: true,
            width: "180px",
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
            name: "Collections",
            selector: (row) => {
                return (
                    <div>
                        <Link to={`/subjects/${row.id}/collection`}>
                            <h2 className=' font-bold underline'>Collections</h2>
                        </Link>
                    </div>
                )
            },
        },
        {
            name: "Muassasa nomi",
            selector: (row) => {
                return (
                    <div>{row.educName}</div>
                )
            },
        },
        {
            name: "Bo'limlari soni",
            selector: (row) => {
                return (
                    <div>{row.collectionCount}</div>
                )
            },
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
                    <EditSubjectTable data={row} />
                    <DeleteSubjectTable id={row.id} />
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
                data={subjects}
                columns={columns}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </div>
    )
}
