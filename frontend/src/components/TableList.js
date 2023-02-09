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
            name: '#',
            selector: row => row.title,
        },
        {
            name: 'Nombre',
            selector: row => row.description,
        },
        {
            name: 'TIPO',
            selector: row => row.transactionType,
        },
        {
            name: 'Creación',
            selector: row => row.createdAt,
        },
    ];

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
            />
        </div>
    );
};

export default TableList