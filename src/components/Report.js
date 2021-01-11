import React, { Component, useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import axios from 'axios';

import MOCK_DATA from './../MOCK_DATA.json'
import { COLUMNS } from './Columns';

const FilterOption = ({filter, setFilter}) => {
    return  (
    <div className="col-lg-4 col-xl-3 float-right mb-3">
        <input className="form-control" type="text" value={filter || ''}  placeholder="Search" aria-label="Search" onChange={e => setFilter(e.target.value)} />
    </div>
    )
}

const Table = ({
        columns,
        data,
        fetchDataFromAPI,
        loading,
        customPageCount,
        customPageIndex,
    }) => {

        console.log('-------------- table component called ---------------------');
        // console.log('columns = ', columns);
        // console.log('data = ', data);
        // console.log('fetchDataFromAPI = ', fetchDataFromAPI);
        // console.log('customPageCount = ', customPageCount);
        // console.log('customPageIndex = ', customPageIndex);

        const tableInstance = useTable ({
                columns,
                data,
                usePagination,
                initialState: { 
                    pageIndex: customPageIndex, 
                },
                manualPagination: true,
                pageCount: customPageCount,
                autoResetPage: false,
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

        React.useEffect(() => {
            console.log('table component useEffect called');
            fetchDataFromAPI({ pageIndex, pageSize })
          }, [pageIndex, pageSize])

        return (
            <>
            <div className={(loading) ? 'loading show' : 'loading hide'}></div>
            <img src="/loader.gif" className={(loading) ? 'loaderimg show' : 'loaderimg hide'} alt="loader" />

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
                            console.log('pageIndex = ', pageIndex);
                            console.log('pageCount = ', pageCount);
                            var items= []
                            let start = pageIndex + 1;
                            let end = start + 4;
                            if(end > pageCount)
                            end = pageCount;
                            for(let i=start; i <= end; i++)
                            {
                                let pageNo = i-1;
                                if(i === start)
                                items.push(<li className="page-item" data-pageno={pageNo} key={i}><span className="page-link active">{i}</span></li>)
                                else
                                items.push(<li className="page-item" data-pageno={pageNo} key={i}><span className="page-link" onClick={(e) =>{ gotoPage(pageNo); return i; }}>{i}</span></li>)                        
                            }
                            return items
                        }) ()
                    }
                    <li className="page-item"><span className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>Next</span></li> 
                    <li className="page-item"><span className="page-link" onClick={() => gotoPage(pageCount-1)} disabled={!canPreviousPage}>&raquo;</span></li>               
                </ul>
                <div className="clearfix"></div>
            </nav>
            
             </>
        )
}

const Report = () => {

    const columns = useMemo(() => COLUMNS, [])
    // const mockData = useMemo(() => MOCK_DATA, [])
    // const [count, setCount] = useState(0)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [customPageCount, setCustomPageCount] = React.useState(0)
    const [pageIndex, setPageIndex] = React.useState(0)
    //const fetchIdRef = React.useRef(0)

    const fetchDataFromAPI = async ({ pageSize, pageIndex }) => {
        try {        
            setLoading(true)
            console.log('================ fetchDataFromAPI called =============')            
            const apiData = await axios.get("https://my.api.mockaroo.com/users.json?key=652173a0")
            console.log('apiData = ', apiData)
            const startRow = pageSize * pageIndex
            const endRow = startRow + pageSize            
            const sliceData = apiData.data.slice(startRow, endRow)
            //console.log('sliceData = ', sliceData);
            setData(sliceData)
            setCustomPageCount(Math.ceil(apiData.data.length / pageSize))
            setPageIndex(pageIndex)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }
    
   
    return (
        <section className="report">                        
            <Table 
            columns={columns}
            data={data}
            fetchDataFromAPI={fetchDataFromAPI}
            loading={loading}
            customPageCount={customPageCount}
            customPageIndex={pageIndex}            
            />
        </section>
    )
}

export default Report