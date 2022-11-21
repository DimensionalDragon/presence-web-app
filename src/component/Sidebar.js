import { Link } from "react-router-dom"
import styles from '../style/Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCalendarCheck } from '@fortawesome/free-regular-svg-icons'

import profilImg from "../image/profile.png"

export const Sidebar = () => {
    return(
        <div className={styles.sideBar}>
            <h1>Presence</h1>

            <div className={styles.navMenu}>
                <div className={styles.listMenu}>
                    <FontAwesomeIcon icon={faChartLine} className={styles.ikonNav}/>
                    <h3><Link to="/dashboard">Dashboard</Link></h3>
                </div>
                <div className={styles.listMenu}>
                    <FontAwesomeIcon icon={faUser} className={styles.ikonNav}/>
                    <h3><Link to="/employees">Employees</Link></h3>
                </div>
                <div className={styles.listMenu}>
                    <FontAwesomeIcon icon={faCalendarCheck} className={styles.ikonNav}/>
                    <h3><Link to="/attendance">Attendance</Link></h3>
                </div>
                <div className={styles.listMenu}>
                    <FontAwesomeIcon icon={faDatabase} className={styles.ikonNav}/>
                    <h3><Link to="/databases">Databases</Link></h3>
                </div>
            </div>
                        
            <div className={styles.profilePart}>
                <div className={styles.profilAdmin}>
                    <img src={profilImg} alt="adminImg"/>
                    <h3>Luqman Aristio</h3>
                    <p>Admin</p>
                </div>
            </div>
    
        </div>
    )
}