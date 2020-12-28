<div className="Pharmacist noselect">
            <div className="container">
                {!loaded && <Spinner animation="grow" variant="primary"/>}
                <div className="left">
                    <div className="top-wrapper">
                        <div className="main-chart-title">{type}</div>
                    </div>
                    {loaded && <div className="bottom-wrapper">
                        <div className="chart-sex-module">
                            <div className="sub-chart-title">เพศ</div>
                            {chart_sex}
                            <div className="right-box">
                                <div className="filler"></div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;เพศชาย
                                </div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#855CF8" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;เพศหญิง
                                </div>
                            </div>
                        </div>
                        <div className="filler"></div>
                        <div className="chart-preg-module">
                            <div className="sub-chart-title">ตำแหน่ง</div>
                            {chart_role}
                            <div className="right-box">
                                <div className="filler"></div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;เภสัชกร
                                </div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#855CF8" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;เจ้าพนักงานเภสัชกร
                                </div>
                                <div className="tag-chart">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#A758B4" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5"/>
                                    </svg>
                                    &nbsp;เจ้าหน้าที่
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="filler"></div>
                <div className="right">
                    <div className="top-wrapper">
                        <select className="main-chart-type-select noselect" defaultValue="เตรียมยาเคมีบำบัด (order)" onChange={(e)=>setType(e.target.value)}>
                            <option value="เตรียมยาเคมีบำบัด (order)">IC</option>
                            <option value="เตรียมยาเคมีบำบัด">C</option>
                            <option value="Screen ทำงาน 8.00-16.00">S</option>
                            <option value="เตรียมสารอาหารหลอดเลือดดำ">T</option>
                        </select>
                    </div>
                    {loaded && <div className="bottom-wrapper">
                        <div className="sub-chart-title">ช่วงอายุ</div>
                        {chart_age}
                        <div className="bottom-box">
                            <div className="tag-chart">
                                <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#A758B4" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="5"/>
                                </svg>
                                &nbsp;อายุมากกว่า 55 ปี
                            </div>
                            <div className="tag-chart">
                                <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#855CF8" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="5"/>
                                </svg>
                                &nbsp;อายุมากกว่า 50 ปี แต่น้อยกว่า 55 ปี
                            </div>
                            <div className="tag-chart">
                                <svg width="1.2em" height="1.2em" viewBox="0 0.5 16 16" className="bi bi-circle-fill" fill="#ACB9FF" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="5"/>
                                </svg>
                                &nbsp;อายุน้อยกว่า 50 ปี
                            </div>
                            <div className="filler"></div>
                        </div>
                    </div>}
                </div>
            </div>
                    <Bar
                        id={"bar-chart-overall"}
                        data={{
                            labels: data.name,
                            datasets: [{
                                maxBarThickness: 100,
                                minBarThickness: 20,
                                backgroundColor: "#5BC0DEBB",
                                data: data.overall
                            }]
                        }}
                        options={{
                            maintainAspectRatio : false,
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "ชื่อเภสัชกร",
                                        fontSize: 20,
                                        fontFamily: 'mainFont'
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "จำนวนการเข้าเวร (ครั้ง)",
                                        fontSize: 20,
                                        fontFamily: 'mainFont'
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                        steps: 2,
                                        max: 20
                                    }
                                }]
                            },
                        }}
                    ></Bar>
        </div>




