import { Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useRef } from 'react'
const Home = () => {
  const navigate = useNavigate()
  const route = useRef(navigate)
  useEffect(() => {
    route.current('/hospital')
  }, [])
  return (
    <div>
      <p className={styles.title}>杨二狗专用报销地图</p>
      <Outlet />
    </div>
  )
}
export default Home
