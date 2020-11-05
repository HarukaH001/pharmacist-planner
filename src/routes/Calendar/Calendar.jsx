import React, { useEffect, useState, useRef } from 'react';
import './Calendar.scss';
import Table from 'react-bootstrap/Table'
// import { Link, useLocation, useHistory } from 'react-router-dom';

export const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(formatMonth((new Date()).toISOString().substring(0, 7)))
    const [picker, showPicker] = useState(false)
    const pickerRef = useRef()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    window.onclick = (e) => {
        e.preventDefault()
        if (!e.target.classList.contains('pick')) {
            showPicker(false)
        }
    }

    useEffect(() => {
        console.log(picker)
    }, [picker])

    function formatMonth(date) {
        const [yyyy, mm] = date.split('-')

        return mm + '/' + yyyy
    }

    function renderTableHead() {
        let ar = []

        for (let i = 0; i < 31; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            return (
                <th className="date-th noselect" key={"h" + ele}>
                    {ele}
                </th>
            )
        })
    }

    function renderTableBody() {
        let ar = []

        for (let i = 0; i < 31; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            return (
                <td className="stat-td noselect" key={"h" + ele}>
                    x
                </td>
            )
        })
    }

    function renderUserTable() {
        let ar = []
        const count = 31
        for (let i = 0; i < count*2; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            if(i%2 === 0){
                return (
                    <tr key={"r1-"+i}>
                        <td className="name-td add-line" colSpan="2" rowSpan="2">วรุณนาโศรก</td>
                        <td className="name-sec-td noselect">นอก</td>
                        {renderTableBody()}
                    </tr>
                )
            } else {
                return (
                    <tr key={"r2-"+i} className="add-line">
                        <td className="name-sec-td noselect">ใน</td>
                        {renderTableBody()}
                    </tr>
                )
            }
        })
    }

    return (
        <div className="Calendar">
            <div className="container">
                <div className="month-picker noselect pick" >
                    <div ref={pickerRef} className="pick" onClick={() => showPicker(!picker)}>
                    <div className="calendar-btn pick">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar2-date-fill pick" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path className="pick" fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 3.5c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5v-1zm7.336 9.29c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                        </svg>
                    </div>
                    <div className="text pick">{selectedMonth}</div>
                    </div>
                    {picker?<div className="modal-picker pick"></div>:null}
                </div>

                <div className="wrapper-0">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="name-th noselect" colSpan="3">ชื่อ</th>
                                {renderTableHead()}
                            </tr>
                        </thead>
                    </Table>
                </div>

                <div className="wrapper">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="name-th" colSpan="3">ชื่อ</th>
                                {renderTableHead()}
                            </tr>
                        </thead>
                    </Table>
                    <Table striped bordered hover className="edit-table">
                        <thead>
                            <tr>
                                <th className="name-th" colSpan="3">ชื่อ</th>
                                {renderTableHead()}
                            </tr>
                        </thead>
                        <tbody>
                            {renderUserTable()}
                        </tbody>
                    </Table>
                </div>

                {/* <div className="wrapper-012"></div> */}
            </div>
        </div>
    )
}