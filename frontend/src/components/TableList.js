import { useContext, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { transactionContext } from '../context/transaction/transactionContext';
import Loader from './Loader';
import Message from './Message';

const TableList = () => {

    const transContext = useContext(transactionContext);
    const { transactions, getTransactions, loading, error } = transContext;

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
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'MONTO',
            selector: row => row.amount,
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

    const conditionalRowStyles = [
        {
            when: row => row.transactionType === '63df0209d199e2ec8bde26fb' ,
            style: {
                backgroundColor: 'rgba(223, 17, 10, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.transactionType === '63df0209d199e2ec8bde26fa',
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        	
        ];

    function convertArrayOfObjectsToCSV(array) {
            let result;
        
            const columnDelimiter = ';';
            const lineDelimiter = '\n';
            const keys = Object.keys(transactions[0]);
        
            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;
        
            array.forEach(item => {
                let ctr = 0;
                keys.forEach(key => {
                    if (ctr > 0) result += columnDelimiter;
        
                    result += item[key];
                    
                    ctr++;
                });
                result += lineDelimiter;
            });
        
            return result;
        }

    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;
    
        const filename = 'reporte-gastos-ingresos.csv';
    
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
    
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <Button  className={`btn btn-success ${(!transactions) && 'disabled'}`} onClick={e => onExport(e.target.value)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"/></svg></Button>;
    
    const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(transactions)} />, []);

    useEffect(() => {
      if(transactions !== null) getTransactions();
    }, []);
    

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
                conditionalRowStyles={conditionalRowStyles}
                actions={actionsMemo}
            />
        </div>
    );
};

export default TableList