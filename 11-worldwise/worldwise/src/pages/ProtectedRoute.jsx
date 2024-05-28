import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthonticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthonticated) navigate("/");
    },
    [isAuthonticated, navigate]
  );
  return isAuthonticated ? children : null;
}

export default ProtectedRoute;
