import React, { useEffect, useState, useRef } from 'react';
import './Staff.scss';
// import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Col, Row, Form } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

export const Staff = () => {
    const [cPreg, setCPreg] = useState(false)
    const [cCan, setCCan] = useState(false)
    const [cNut, setCNut] = useState(false)
    const [cName, setCName] = useState()
    const [cAge, setCAge] = useState()
    const [cSex, setCSex] = useState()
    const [cTel, setCTel] = useState()
    const [form, showForm] = useState(false)
    const formRef = useRef()
    // const history = useHistory()

    window.onclick = (e) => {
        e.preventDefault()
        if (e.target.classList.contains('form')) {
            showForm(false)
            clearFormState()
        }
    }

    useEffect(() =>{
        if(!form)clearFormState()
    },[form])

    function clearFormState(){
        setCPreg(false)
        setCCan(false)
        setCNut(false)
        setCName()
        setCAge()
        setCSex()
        setCTel()
    }

    function renderUserTable() {
        let ar = []
        const count = 31
        for (let i = 0; i < count; i++) {
            ar[i] = i + 1
        }

        return ar.map((ele, i) => {
            return (
                <tr key={"r1-" + i}>
                    <td className="tag-td add-line">{i}</td>
                    <td className="name-td add-line">วรุณนาโศรก&nbsp;&nbsp;&nbsp;อารามลูกเกด</td>
                    <td className="age-td add-line">27</td>
                    <td className="can-td add-line">
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </td>
                    <td className="nut-td add-line">
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </td>
                    <td className="preg-td add-line">
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </td>
                    <td className="tel-td add-line">090<span className="noselect">-</span>123<span className="noselect">-</span>4567</td>
                </tr>
            )
        })
    }

    return (
        <div className="Staff">
            {form ? <div className="create-form form">
                <div className="form-container">
                    <Form ref={formRef}>
                        <Form.Group as={Row} controlId="name-form">
                            <Form.Label column className="noselect">
                                ชื่อ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" onChange={(e)=>setCName(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="age-form">
                            <Form.Label column className="noselect">
                                อายุ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" onChange={(e)=>setCAge(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="sex-form">
                            <Form.Label column className="noselect">
                                เพศ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control as="select" defaultValue="x" className="noselect" onChange={(e)=>setCSex(e.target.value)}>
                                    <option value="x" disabled>เลือกเพศ</option>
                                    <option value="m">ชาย</option>
                                    <option value="f">หญิง</option>
                                    <option value="o">อื่น ๆ (ไม่ระบุ)</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="tel-form">
                            <Form.Label column className="noselect">
                                เบอร์โทร
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" onChange={(e)=>setCTel(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="preg-form" >
                            <Form.Label column className="noselect">
                                ตั้งครรภ์
                            </Form.Label>
                            <Col xs={7}>
                                <div className="checkbox-center" onClick={() => setCPreg(!cPreg)}>{cPreg ? (
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                                    </svg>
                                ) : (
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    </svg>
                                )}</div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="can-form" >
                            <Form.Label column className="noselect">
                                อบรมด้านการเคมีบำบัด
                            </Form.Label>
                            <Col xs={7}>
                                <div className="checkbox-center" onClick={() => setCCan(!cCan)}>{cCan ? (
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                                    </svg>
                                ) : (
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    </svg>
                                )}</div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="nut-form" >
                            <Form.Label column className="noselect">
                                อบรมด้านการเตรียมอาหาร
                            </Form.Label>
                            <Col xs={7}>
                                <div className="checkbox-center" onClick={() => setCNut(!cNut)}>{cNut ? (
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                                    </svg>
                                ) : (
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    </svg>
                                )}</div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="sub-form">
                            <Col xs={6}></Col>
                            <Col><Button className="cancel-btn" variant="light" onClick={()=>showForm(false)}>Cancel</Button></Col>
                            <Col><Button className="submit-btn" variant="primary">Submit</Button></Col>
                        </Form.Group>
                    </Form>
                </div>
            </div> : null}
            <div className="container">
                <div className="add-user-wrapper noselect" >
                    <Button variant="primary" className="add-user-btn nofocus" size="sm" block onClick={() => showForm(true)}>
                        Create
                    </Button>
                </div>

                <div className="wrapper-0">
                    <Table borderless hover>
                        <thead className="noselect add-line">
                            <tr>
                                <th className="tag-th">#</th>
                                <th className="name-th">ชื่อ</th>
                                <th className="age-th">อายุ</th>
                                <th className="can-th">มะเร็ง</th>
                                <th className="nut-th">สารอาหาร</th>
                                <th className="preg-th">ตั้งครรภ์</th>
                                <th className="tel-th">เบอร์โทร</th>
                            </tr>
                        </thead>
                    </Table>
                </div>

                <div className="wrapper">
                    <Table borderless hover>
                        <thead className="noselect">
                            <tr>
                                <th className="tag-th">#</th>
                                <th className="name-th">ชื่อ</th>
                                <th className="age-th">อายุ</th>
                                <th className="can-th">มะเร็ง</th>
                                <th className="nut-th">สารอาหาร</th>
                                <th className="preg-th">ตั้งครรภ์</th>
                                <th className="tel-th">เบอร์โทร</th>
                            </tr>
                        </thead>
                    </Table>
                    <Table borderless hover className="edit-table">
                        <thead className="noselect">
                            <tr>
                                <th className="tag-td">#</th>
                                <th className="name-td">ชื่อ</th>
                                <th className="age-td">อายุ</th>
                                <th className="can-td">มะเร็ง</th>
                                <th className="nut-td">สารอาหาร</th>
                                <th className="preg-td">ตั้งครรภ์</th>
                                <th className="tel-td">เบอร์โทร</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUserTable()}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}