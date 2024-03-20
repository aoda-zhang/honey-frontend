import React, { FC, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
type Props = {
  //   name: string;
};
const Setting: FC<Props> = () => {
  const navagite = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location?.key === "default") {
      navagite("/setting/a");
    }
  }, [location, navagite]);
  return (
    <div>
      <div>
        <Link to="/setting/a">A</Link>
        <Link to="/setting/b">B</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Setting;
