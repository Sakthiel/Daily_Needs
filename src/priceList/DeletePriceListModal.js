import { Modal, Typography, Button , Box } from "@material-ui/core";
import styles from "./styles/deletePriceListModalStyles";


const DeletePriceListModal = ({ open, handleClose ,handleDelete , index}) => {
    const classes = styles();
    return (
        <Modal open={open} onClose={handleClose}>
            <div className={classes.deleteListModal}>
                
                <Typography variant="h5" id="modal-modal-title" className={classes.typography}>
                    Confirm Deletion
                </Typography>
                <hr>
                </hr>
                <Typography variant="body1" id="modal-modal-description" className={classes.typography}>
                    Are you sure you want to delete this item?
                </Typography>
                <hr/>
              <div className= {classes.buttonContainer}>
                <Button variant="contained" onClick={handleClose} className= {classes.button}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        // Perform the delete action here
                        // Then close the modal
                        handleDelete(index);
                        handleClose();
                    }}
                    className= {classes.button}
                >
                    Delete
                </Button>
                </div>
            </div>
        </Modal>
    )
}
export default DeletePriceListModal;