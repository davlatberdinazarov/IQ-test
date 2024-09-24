import React, { useContext, useEffect, useState } from 'react';
import CustomDataTable from '../../lib/CustomDataTable';
import { $api } from '../../utils/api';
import { sweetAlert } from '../../utils/sweetalert';
import { MainLayoutContext } from '../../layouts/MainLayout';
import Loading from '../../lib/Loading';
import { useParams } from 'react-router-dom';
import { EditQuestionDialog } from './edit-question-dialog';
import DeleteQuestionDialog from './delete-question-dialog';

export default function QuestionsTable() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const { colRender } = useContext(MainLayoutContext);
    const { levelId } = useParams(); // Get levelId from useParams

    useEffect(() => {
        const getQuestionsByLevelId = async () => {
            try {
                // Log URL to check if it's correctly formatted
                console.log(`Fetching questions for levelId: ${levelId}`);
                const response = await $api.get(`/question/getQuestionByLevelId/${levelId}`);
                console.log('Response data:', response.data);
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
                sweetAlert('Cannot get data', 'error');
            }
        };
        getQuestionsByLevelId();
    }, [colRender, levelId]);

    const columns = [
        {
            name: "TR",
            selector: (row, index) => (page - 1) * perPage + index + 1,
            sortable: true,
            width: "86px",
        },
        {
            name: "Question Value",
            selector: (row) => (
                <div>
                    <span>{row.questionValue}</span>
                </div>
            ),
            sortable: true,
            width: "200px",
        },
        {
            name: "Correct Answer",
            selector: (row) => (
                <div>{row.correctAnswer}</div>
            ),
            sortable: true,
            width: "200px",
        },
        {
            name: "Correct Answer Length",
            selector: (row) => (
                <div>{row.correctAnswerLength}</div>
            ),
            sortable: true,
            width: "150px",
        },
        {
            name: 'Image of Question',
            selector: (row) => {
                return row.imgUrl ? (
                    <div
                        className="flex items-center rounded-sm h-12 my-2 w-28 gap-3"
                    >
                        <img
                            className="w-full h-full object-cover rounded shadow-md"
                            src={`http://158.220.111.34:8086/api/v1/user/getFiles/${row.imgUrl}`}
                            alt={row.name}
                        />
                    </div>
                ) : (
                    <div>Test</div>
                );
            },
        },
        {
            name: "AdditiveAnswer",
            selector: (row) => {
                return row.additiveAnswer ? (
                    <div>{
                        row.additiveAnswer.length > 0 ? (
                            row.additiveAnswer.map(item => {
                                return <span className='mx-2 font-bold' key={item}>
                                    {item}
                                </span>;
                            })
                        ) : (
                            <span className='mx-2 font-bold'>No Additive Answer</span>
                        )
                    }</div>
                ) : (
                    <div>Image Question</div>
                );
            },
            width: "180px",
        },
        {
            name: "Amallar",
            selector: (row) => (
                <div className="flex">
                    <EditQuestionDialog data={row} />
                    <DeleteQuestionDialog id={row.id} />
                </div>
            ),
            sortable: false,
            width: "180px",
        },
    ];

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <CustomDataTable
                data={questions}
                columns={columns}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </div>
    );
}
