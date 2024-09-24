import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function CustomDataTable({ data, columns, page, setPage, perPage, setPerPage }) {
  const customStyles = {
    headCells: {
      style: {
        background: "dodgerblue", // Header fon rangi
        color: "white", // Header matn rangi
        fontWeight: "700",
        fontSize: "14px", // Header matn o'lchami
      },
    },
    rows: {
      style: {
        minHeight: "45px", // Satrlarga minimal balandlik
      },
    },
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Per page o'zgarganda 1-betga qaytish
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        pagination
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[10, 15]} // Per page opsiyalari
        paginationTotalRows={data.length > 0 ? data.length : 1} // Pagination uchun umumiy satrlar
        onChangePage={handlePageChange} // Page o'zgarishini ushlash
        onChangeRowsPerPage={handlePerPageChange} // Per page o'zgarishini ushlash
        highlightOnHover // Hover qilinganda satrni belgilash
        customStyles={customStyles} // Maxsus stylelar
      />
    </div>
  );
}
