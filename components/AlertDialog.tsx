import React from "react";
import { observer } from "mobx-react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

interface Props {
    open: boolean;
    title: string;
    content: React.ReactNode;
    okText?: string;
    cancelText?: string;
    onClose: (ok: boolean) => void;
}

export const AlertDialog: React.FC<Props> = observer(({ open, title, content, okText, cancelText, onClose }) => {
    const handleCancel = () => onClose(false);
    const handleOK = () => onClose(true);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleCancel}>
                    {cancelText || "Cancel"}
                </Button>
                <Button onClick={handleOK} color="primary" autoFocus>
                    {okText || "OK"}
                </Button>
            </DialogActions>
        </Dialog>
    );
});
