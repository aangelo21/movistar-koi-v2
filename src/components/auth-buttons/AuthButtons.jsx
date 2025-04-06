import { useState } from "react";
import "./AuthButtons.css";
import Button from '@mui/joy/Button';
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../auth-modal/AuthModal";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function AuthButtons() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const { user } = useAuth();

  const handleOpen = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <div className="auth-buttons-container">
        {!user ? (
          <>
            <Button size="sm" color="neutral" onClick={() => handleOpen('login')}>
              Iniciar Sesión
            </Button>
            <Button size="sm" onClick={() => handleOpen('register')}>
              Crear una Cuenta
            </Button>
          </>
        ) : (
          <Button size="sm" color="neutral" onClick={handleSignOut}>
            Cerrar Sesión
          </Button>
        )}
      </div>
      <AuthModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        mode={modalMode} 
      />
    </>
  );
}

export default AuthButtons;
