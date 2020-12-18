import React, { Component, useMemo } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import MOCK_DATA from './../MOCK_DATA.json'
import { COLUMNS } from './Columns';

const FilterOption = ({filter, setFilter}) => {
    return  (
    <div className="col-lg-4 col-xl-3 float-right mb-3">
        <input className="form-control" type="text" value={filter || ''}  placeholder="Search" aria-label="Search" onChange={e => setFilter(e.target.value)} />
    </div>
    )
}

const Report = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable (
        {
            columns,
            data
        }, 
        useGlobalFilter,
        useSortBy,
        usePagination,        
    )

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
        setGlobalFilter,
        prepareRow,
        setColumnOrder
    } = tableInstance;

    const { pageIndex, pageSize, globalFilter } = state

    // console.log('state = ', state);
    // console.log('pageOptions = ', pageOptions);
    // console.log('pageCount = ', pageCount);
    
    // const goToPage = (pageNo) => {
    //     //console.log('sajal pageNo = ', pageNo);
    //     gotoPage(pageNo)
    // }

    return (
        <section className="report">
            
            <FilterOption filter={globalFilter} setFilter={setGlobalFilter} />

            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => 
                            (
                                <tr {...headerGroup.getFooterGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => 
                                        (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSorderDesc ? 'V' : '^') : ''}
                                            </span>
                                        </th>
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
            {/* <div className="paging">
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
                        [10, 25, 50].map((ps, i) => (
                        <option value={ps} key={i}>Show {ps}</option>
                        ))
                    }
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
            </div> */}

            <nav className="paging" aria-label="Page navigation">
            <ul className="pagination float-left">
                <li><span className="pageinfo">Page <strong>{pageIndex + 1} of {pageCount}</strong>  | Per page </span></li>
                <li><select className="ddown" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {
                        [10, 15, 25, 50].map((ps, i) => (
                        <option value={ps} key={i}>Show {ps}</option>
                        ))
                    }
                </select></li>
            </ul>

            <ul className="pagination float-right">
                <li className="page-item"><span className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>&laquo;</span></li>
                <li className="page-item"><span className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</span></li>
                {
                    (() => {
                        //console.log('sajal pageIndex = ', pageIndex);
                        var items= []
                        //let start = (pageIndex === 0) ? pageIndex+1 : pageIndex;
                        let start = pageIndex + 1;
                        let end = start + 4;
                        if(end > pageCount)
                        end = pageCount;
                        for(let i=start; i <= end; i++)
                        {
                            let pageNo = i-1;
                            if(i === start)
                            items.push(<li className="page-item" key={i}><span className="page-link active">{i}</span></li>)
                            else
                            items.push(<li className="page-item" key={i}><span className="page-link" onClick={(e) =>{ gotoPage(pageNo); return i; }}>{i}</span></li>)                        
                        }
                        return items
                    }) ()
                }
                <li className="page-item"><span className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>Next</span></li> 
                <li className="page-item"><span className="page-link" onClick={() => gotoPage(pageCount-1)} disabled={!canPreviousPage}>&raquo;</span></li>               
            </ul>
            <div className="clearfix"></div>
        </nav>
        </section>
    )
}

export default Report