import styles from "../style/DashboardInfo.module.css"
import { ChartDashboard } from "./ChartDashboard"
import { faUsers, faUserCheck, faUserClock, faUserXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import profil from "../image/profile.png"
import axios from "axios";
import { useState, useEffect } from "react"
import { useUser } from "./UserContext";


export const DashboardInfo = () => {

    const currentUser = useUser();
    const [attendance, setAttendance] = useState([]);

    let today = new Date();
    let month = today.toLocaleString('default', { month: 'long' });
    let year = today.getFullYear();
    let monthNum = today.getMonth();
    let dateNow = today.getDate();

    let dateMonth = [];
    let dateLast = [];
    let dateNext = [];
    let lastDate = new Date(year, monthNum + 1, 0).getDate();
    let firstDay = new Date(year, monthNum, 1).getDay();
    let datePrevMonth = new Date(year, monthNum, 0).getDate();
    let lastDayMonth = new Date(year, monthNum, lastDate).getDay();

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    for(let i=firstDay; i>0; i--){
        let realDate = datePrevMonth - i + 1;
        dateLast.push(realDate); 
    }
        
    for(let i=1; i<=lastDate; i++){
        dateMonth.push(i); 
    }

    for(let i=lastDayMonth; i<6; i++){
        let realDate = i - lastDayMonth + 1;
        dateNext.push(realDate);
    }

    async function fetchData() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances`, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setAttendance(response.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const timeFormat = (timeReal) =>{
        const time = new Date(timeReal)
        const hour = time.getHours();
        const minutes = time.getMinutes();

        const waktu = hour.toString() + ":" + minutes.toString();
        
        return waktu;
    }

    const statusEmp = (status) =>{
        return status === "ontime" ? "On Time" : "Late";
    }

    const reversedFunction = (attendance) =>{
        const reversed = [...attendance].reverse();
        return reversed; 
    }

    return (
        <div className={styles.mainDashboard}>
            <div className={styles.dashboardContent}>
                <h1>Dashboard Overview</h1>
                <h2>{formatAMPM(new Date())}, {dateNow} {month} {year}</h2>

                <div className={styles.boxInfo}>
                    <div className={styles.attendanceInfo}>

                        <div className={styles.infoValue}>
                            <div className={styles.iconValue}>
                                <FontAwesomeIcon icon={faUsers} className={`${styles.icon} ${styles.iconAtt}`}/>
                            </div>
                            <div className={styles.textInfo}>
                                <h3>Present</h3>
                                <h1>1250</h1>
                                <p>Today's employee attendance </p>
                            </div>
                        </div>

                        <div className={styles.infoValue}>
                            <div className={styles.iconValue}>
                                <FontAwesomeIcon icon={faUserCheck} className={`${styles.icon} ${styles.iconOn}`}/>
                            </div>
                            <div className={styles.textInfo}>
                                <h3>On Time</h3>
                                <h1>1000</h1>
                                <p>On time employees attendance</p>
                            </div>
                        </div>

                        <div className={styles.infoValue}>
                            <div className={styles.iconValue}>
                                <FontAwesomeIcon icon={faUserClock} className={`${styles.icon} ${styles.iconLate}`}/>
                            </div>
                            <div className={styles.textInfo}>
                                <h3>Late</h3>
                                <h1>250</h1>
                                <p>Late attendance employees</p>
                            </div>
                        </div>

                        <div className={styles.infoValue}>
                            <div className={styles.iconValue}>
                                <FontAwesomeIcon icon={faUserXmark} className={`${styles.icon} ${styles.iconAbs}`}/>
                            </div>
                            <div className={styles.textInfo}>
                                <h3>Absent</h3>
                                <h1>50</h1>
                                <p>Absent employees today</p>
                            </div>
                        </div>

                    </div>
                        
                    <div className={styles.chartInfo}>
                        <h5>Attendance Analytics</h5>
                        <ChartDashboard></ChartDashboard>
                    </div>
                </div>
            </div>
            <div className={styles.dashboardSidebar}>
                <div className={styles.calendarInfo}>
                    <h1>Calendar</h1>

                    <h3>{month}, {year}</h3>

                    <div className={styles.dateInfo}>
                        <ul className={styles.dayName}>
                            <li>Sun</li>
                            <li>Mon</li>
                            <li>Tue</li>
                            <li>Wed</li>
                            <li>Thu</li>
                            <li>Fri</li>
                            <li>Sat</li>
                        </ul>
                        <ul className={styles.dateNum}>
                            { dateLast.map((dateLast) => <li key={dateLast} className={styles.inactiveDate}>{dateLast}</li>) }
                            {
                                dateMonth.map((dateMonth) => {
                                    if(dateNow === dateMonth){
                                        return <li key={dateMonth} className={styles.activeDateToday}>{dateMonth}</li>
                                    }
                                    else{
                                        return <li key={dateMonth} className={styles.activeDate}>{dateMonth}</li>
                                    }
                                })
                            }
                            { dateNext.map((dateNext) => <li key={dateNext} className={styles.inactiveDate}>{dateNext}</li>) }
                        </ul>
                    </div>
                </div>
                <div className={styles.recentInfo}>
                    <h1>Recent Attendance</h1>
                    
                    {reversedFunction(attendance).slice(0, 3).map(attendanceEmp => (
                    <div className={styles.recentList}>
                        <div className={styles.imageList}>
                            <img src={profil} alt="" />
                        </div>
                        <div className={styles.nameList}>
                            <h3>{attendanceEmp.employeeName}</h3>
                            <h4>{timeFormat(attendanceEmp.time)}</h4>
                        </div>
                        <div className={styles.timeList}>
                            <h3>{statusEmp(attendanceEmp.status)}</h3>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </div>
    )
}