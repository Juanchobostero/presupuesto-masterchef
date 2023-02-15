import { useContext, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { transactionContext } from '../context/transaction/transactionContext';
import Loader from './Loader';
import Message from './Message';

const TextField = styled.input`
    height: 15px;
    width: 95%;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 20px 0 8px;
    background-color: 'grey';
    margin-top: '-1rem';

    &:hover {
        cursor: pointer;
    }
`;

const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            type="text"
            autoFocus="autoFocus"
            className="searching"
            placeholder="Buscar por nombre"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton type="button" className="searching-btn" onClick={onClear}>
            X
        </ClearButton>
    </>
);

const TableList = () => {

    const transContext = useContext(transactionContext);
    const { transactions, getTransactions, getTransactionTypes, loading, error } = transContext;

    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = transactions.filter(
		item => item.description && item.description.toLowerCase().includes(filterText.toLowerCase()),
	);

    

    const columns = [
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
            selector: row => row.dateFormat,
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
            const keys = Object.keys(array[0]);
        
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
    
        const subHeaderComponentMemo = useMemo(() => {
            const handleClear = () => {
                if (filterText) {
                    setResetPaginationToggle(!resetPaginationToggle);
                    setFilterText('');
                }
            };
    
            return (
                <FilterComponent 
                    onFilter={e => setFilterText(e.target.value)} 
                    onClear={handleClear} 
                />
                
            );
        }, [filterText, resetPaginationToggle]);

    const Export = ({ onExport }) => <Button  className={`btn btn-success btn-sm ${(!transactions) && 'disabled'}`} onClick={e => onExport(e.target.value)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"/></svg></Button>;
    
    const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(transactions)} />, []);

    useEffect(() => {
      const timeout = setTimeout(() => {
            getTransactionTypes();
            getTransactions();
			setRows(filteredItems);
			setPending(false);
		}, 1500);
		return () => clearTimeout(timeout);
    }, []);
    

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Message variant='danger'>{error}</Message>)}
            <DataTable 
                className='table-data' 
                title="Listado de Gastos/Ingresos"
                columns={columns}
                data={filteredItems}
                fixedHeader
                fixedHeaderScrollHeight="250px"
                pagination 
                paginationComponentOptions={paginationComponentOptions}
                conditionalRowStyles={conditionalRowStyles}
                actions={actionsMemo}
                progressPending={pending}
                highlightOnHover
		        pointerOnHover
			    progressComponent={<Loader />}
                subHeader
			    subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
            />
        </div>
    );
};

export default TableList