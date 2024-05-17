import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <p>MAP</p>
      <p>
        Params: {lat}, {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 22, lng: 50 })}>Change Params</button>
    </div>
  );
}

export default Map;
