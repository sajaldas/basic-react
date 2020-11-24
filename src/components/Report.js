import React, { Component, useMemo } from 'react';
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from './../MOCK_DATA.json'
import { COLUMNS } from './Columns';



const Report = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable ({
        columns,
        data
    }, usePagination)

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow
    } = tableInstance;

    const { pageIndex, pageSize } = state

    return (
        <section className="report">
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => 
                            (
                                <tr {...headerGroup.getFooterGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => 
                                        (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))
                                    }                                    
                                </tr>                            
                            ))
                    }                    
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }                    
                </tbody>
            </table>
            <div className="paging">
                <span>
                    Page <strong>{pageIndex+1} of {pageOptions.length}</strong> 
                </span>

                <span>
                    {' '}
                    | Go to Page: <input type="number" defaultValue={pageIndex + 1} onChange={ 
                        e => {
                            const pageNumber = e.target.value ? Number(e.target.value)-1 : 0
                            gotoPage(pageNumber)
                        }} 
                        style={{width: '50px'}}/>
                </span>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(ps => (
                        <option value={ps}>Show {ps}</option>
                        ))
                    }
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </section>
    )
}

export default Report