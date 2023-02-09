import { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { transactionContext } from '../context/transaction/transactionContext';
import Loader from './Loader';
import Message from './Message';

const TableList = () => {
    const transContext = useContext(transactionContext);
    const { transactions, loading, error } = transContext;

    const columns = [
        {
            name: '#'
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'TIPO',
            selector: row => row.transactionType,
            sortable: true,
        },
        {
            name: 'CREACIÓN',
            selector: row => row.createdAt,
            sortable: true,
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <div>

            {loading && (<Loader />)}
            {error && (<Message variant='danger'>{error}</Message>)}
            <DataTable className='table-data'
                title="Listado de Gastos/Ingresos"
                columns={columns}
                data={transactions}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination paginationComponentOptions={paginationComponentOptions}
            />
        </div>
    );
};

export default TableList