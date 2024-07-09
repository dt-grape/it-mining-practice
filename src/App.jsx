import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const App = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    useEffect(() => {
        fetch('/equipment_202407090652.json')
            .then(response => response.json())
            .then(data => {
                const key = Object.keys(data)[0];
                const jsonData = data[key];
                const columns = getColumnDefs(jsonData);
                setRowData(jsonData);
                setColumnDefs(columns);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    const getColumnDefs = (json) => {
        if (!json || json.length === 0) return [];
        const columns = Object.keys(json[0]).map(key => ({
            headerName: key,
            field: key,
            editable: true
        }));
        return columns;
    };



    return (
        <div>
            <div className="ag-theme-quartz-dark" style={{ height: 700, width: 1200 }}>
                <AgGridReact
                    pagination={true}
                    rowData={rowData}
                    columnDefs={columnDefs}
                />
            </div>
        </div>
    );
};

export default App;
