import { format } from 'date-fns'

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Email ID',
        accessor: 'email'
    },
    {
        Header: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'Date of Birth',
        accessor: 'birth_date',
        Cell: ({value}) => { return format(new Date(value), 'dd-mm-yyyy')}
    },
    {
        Header: 'City',
        accessor: 'city'
    },
    {
        Header: 'Country',
        accessor: 'country'
    },
    
]