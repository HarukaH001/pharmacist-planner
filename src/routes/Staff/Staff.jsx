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
    const [loading, setLoading] = useState(false)
    const formRef = useRef()
    // const history = useHistory()

    window.onclick = (e) => {
        e.preventDefault()
        if (e.target.classList.contains('form') & !loading) {
            showForm(false)
            clearFormState()
        }
    }

    useEffect(() =>{
        clearFormState()
    },[form])

    function clearFormState(){
        setCPreg(false)
        setCCan(false)
        setCNut(false)
        setCName()
        setCAge()
        setCSex()
        setCTel()
        setLoading(false)
    }

    function errorForm(){
        document.getElementById('name-form').style.borderColor = cName?'white':'#e94c4c'
        document.getElementById('age-form').style.borderColor = cAge?'white':'#e94c4c'
        document.getElementById('sex-form').style.borderColor = cSex?'white':'#e94c4c'
        document.getElementById('tel-form').style.borderColor = (cTel && cTel.length === 10)?'white':'#e94c4c'
    }

    async function submitForm(e){
        errorForm()
        if(!cName || !cAge || !cSex || !cTel || (cTel && cTel.length !== 10)){

        } else {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            showForm(false)
        }
    }

    function renderUserTable() {
        let ar = []
        const count = 13
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
                    <Form ref={formRef} autoComplete="off">
                        <Form.Group as={Row} controlId="name-form">
                            <Form.Label column className="noselect">
                                ชื่อ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" onChange={(e)=>setCName(e.target.value)} style={{borderColor:"white"}}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="age-form">
                            <Form.Label column className="noselect">
                                อายุ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control type="text" maxLength="3" onChange={(e)=>{
                                    if(/^\d+$/.test(e.target.value)) setCAge(e.target.value)
                                    else e.target.value = e.target.value.replace(/[^0-9]/g, "")
                                }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="sex-form">
                            <Form.Label column className="noselect">
                                เพศ
                            </Form.Label>
                            <Col xs={7}>
                                <Form.Control as="select" defaultValue="x" className="noselect" onChange={(e)=>setCSex(e.target.value)}>
                                    <option value="x" disabled>กรุณาเลือก</option>
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
                                <Form.Control type="text" maxLength="10" onChange={(e)=>{
                                    if(/^\d+$/.test(e.target.value)) setCTel(e.target.value)
                                    else e.target.value = e.target.value.replace(/[^0-9]/g, "")
                                }}/>
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
                            <Col><Button className="cancel-btn" variant="light" onClick={()=>showForm(false)} disabled={loading}>Cancel</Button></Col>
                            <Col><Button className="submit-btn" variant="primary" onClick={submitForm} disabled={loading}>{loading?(
                                <svg width="1.2em" height="1.4em" viewBox="0 0 16 16" className="bi bi-hourglass-split" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z"/>
                                </svg>
                            ):"Submit"}</Button></Col>
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