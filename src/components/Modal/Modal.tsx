import { Box, IconButton, Modal, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ArrowBackIosNewSharp,
  ArrowForwardIosSharp,
} from "@mui/icons-material";
import styles from "./Modal.module.css";
import { useFetcher } from "../../hooks/useFetcher";

const ModalComp = ({ data, setCurrentPlanet }: any) => {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [url, setUrl] = useState(data.residents[page]);
  const { data: resident, error, loading } = useFetcher(url);

  const handleClose = () => {
    setCurrentPlanet(null);
    setOpen(false);
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    setPage((page) => page - 1);
  };

  useEffect(() => {
    if (page > data.residents.length) {
      handleClose();
    }
  }, [page]);

  useEffect(() => {
    setUrl(data.residents[page]);
  }, [page])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#121212",
          color: "white",
          border: "1px solid #000",
          boxShadow: 24,
          p: 2,
        }}>
        {loading ? (
          <Typography variant="body1" component={"p"}>
            <Skeleton variant="rectangular" sx={{bgcolor: 'grey'}} width={300} height={50} />
            <Skeleton variant="text" sx={{bgcolor: 'grey'}} />
            <Skeleton variant="text" sx={{bgcolor: 'grey'}} />
            <Skeleton variant="text" sx={{bgcolor: 'grey'}} />
            <Skeleton variant="text" sx={{bgcolor: 'grey'}} />
          </Typography>
        ) : (
          <Typography variant="body1" component={"p"}>
            <Typography variant="body1" component={"p"}>
              {page+1 + ` / ${data.residents.length}`}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h4"
              color={"#fff"}>
              {resident?.name}
            </Typography>
            <div className={styles.module_overview_box_no_border}>
              <p className={styles.module_overview_title}>DETAILS</p>
              <div className={styles.module_overview_stat}>
                <div className={styles.module_overview_sub_box_border}>
                  <div className={styles.module_stat_box}>
                    <p className={styles.module_overview_number}>
                      {resident?.gender}
                    </p>
                  </div>
                  <p className={styles.module_sub}>Gender</p>
                </div>
                <div className={styles.module_overview_sub_box_border}>
                  <div className={styles.module_stat_box}>
                    <p className={styles.module_overview_number}>
                      {resident?.mass}
                    </p>
                  </div>
                  <p className={styles.module_sub}>Mass</p>
                </div>
                <div className={styles.module_overview_sub_box}>
                  <div className={styles.module_stat_box}>
                    <p className={styles.module_overview_number}>
                      {resident?.height}
                    </p>
                  </div>
                  <p className={styles.module_sub}>Height</p>
                </div>
              </div>
            </div>
            <div
              className={styles.module__footer}
              style={{ marginTop: "20px" }}>
              <div>
                <div
                  className={styles.module__footer__div}
                  style={{ marginLeft: 0 }}>
                  <p className={styles.module__footer_p}>
                    {resident?.skin_color}
                  </p>
                  <sub className={styles.module__footer_sub}>Skin Color</sub>
                </div>
                <div className={styles.module__footer__div}>
                  <p className={styles.module__footer_p}>
                    {resident?.eye_color}
                  </p>
                  <sub className={styles.module__footer_sub}>Eye Color</sub>
                </div>
                <div className={styles.module__footer__div}>
                  <p className={styles.module__footer_p}>
                    {resident?.hair_color}
                  </p>
                  <sub className={styles.module__footer_sub}>Hair Color</sub>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                marginTop: "20px",
              }}>
              <IconButton sx={{ border: "1px solid white" }} disabled={page === 0}>
                <ArrowBackIosNewSharp
                  sx={{ color: "white" }}
                  onClick={handlePreviousPage}
                />
              </IconButton>
              <IconButton sx={{ border: "1px solid white" }} disabled={page >= data.residents.length - 1}>
                <ArrowForwardIosSharp
                  sx={{ color: "white" }}
                  onClick={handleNextPage}
                />
              </IconButton>
            </div>
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ModalComp;
