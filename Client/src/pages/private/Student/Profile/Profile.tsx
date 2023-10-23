import("@/assets/css/profileCard.css");

import Plan from "@/models/Plan";
import Subscription from "@/models/Subscription";

import { Grid, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenEditModal } from "@/reducers/ModalReducer";

import SubCard from "@/components/Cards/SubCard";
import HeroBannerForTables from "@/components/Template/Header/HeroBannerForTables";

import ImageBanner from "@/assets/images/hero/profile.jpg";
import Logo from "@/assets/images/logo.png";

import EditProfile from "./EditProfile";
import StudentSubs from "../../Worker/Students/StudentSubs";

const Profile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleEdit = () => {
    dispatch(handleOpenEditModal());
  };

  const getActiveSub = () => {
    const activeSub = currentUser?.subscriptions.find((item) => item.status);

    if (!activeSub) {
      const noSub = new Subscription();
      noSub.id = "-1";
      noSub.plan = new Plan({ name: "Sin suscripción" });
      noSub.expiration = new Date(+0).toISOString();
      return noSub;
    }

    return activeSub;
  };

  return (
    <div>
      <HeroBannerForTables
        title="Mi perfil"
        image={ImageBanner}
        imagePosition="bottom"
      />
      <Grid container spacing={4} padding={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Informaci&oacute;n general
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} md={6} sx={{ height: 1 }}>
          <main id="main" className="output">
            <div className="ac-card">
              <div
                className="ac-card-image"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
                }}
              />
              <div className="ac-card-info">
                <p>
                  <strong>Nombre: </strong>
                  <span>{` ${currentUser?.firstName}`}</span>
                  <br />
                  <strong>Apellido: </strong>
                  <span>{` ${currentUser?.lastName}`}</span>
                  <br />
                  <strong>Correo: </strong>
                  <span>{` ${currentUser?.email}`}</span>
                  <br />
                  <strong>Tel&eacute;fono: </strong>
                  <span>{` ${currentUser?.phone}`}</span>
                  <br />
                  <strong>Fecha de nacimiento: </strong>
                  <span>{` ${currentUser?.dateOfBirth}`}</span>
                  <br />
                  <strong>Nivel: </strong>
                  <span>{` ${currentUser?.level}`}</span>
                </p>
              </div>
              <img
                className="ac-icon"
                onClick={() => handleEdit()}
                style={{ cursor: "pointer" }}
                src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png"
              />
              <div className="ac-card-footer">
                <img className="ac-logo" src={Logo} />
              </div>
            </div>
          </main>
        </Grid>
        <Grid item xs={12} sm={5} md={6}>
          <SubCard item={getActiveSub()} />
        </Grid>
        <Grid item xs={12}>
          <StudentSubs
            title="Historial de suscripciones"
            studentId={currentUser?.studentId ?? ""}
            onlyExpired
          />
        </Grid>
      </Grid>

      <EditProfile />
    </div>
  );
};

export default Profile;
