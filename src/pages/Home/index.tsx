import storage from "@/shared/utils/storage";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = storage.get("access-token");
    if (accessToken) {
      navigate("/fare");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return <></>;
};
export default Home;
