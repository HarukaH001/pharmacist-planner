import React, { useEffect, useState, useRef } from 'react';
import './Calendar.scss';
// import { Link, useLocation, useHistory } from 'react-router-dom';

export const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState({year: 2016, month: 7})
    const picker = useRef()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <div className="Calendar">

        </div>
    )
}