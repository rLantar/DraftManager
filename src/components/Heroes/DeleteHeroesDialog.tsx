import React, {ComponentProps, FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles} from '@material-ui/core';

type ConfirmTransactionDialogProps = ComponentProps<typeof Dialog> & {
    onConfirm?: () => void;
    onCancel?: () => void;
    numSelected?: number;
    isLoading?: boolean;
};

const useStyles = makeStyles(
    (theme) => ({
        root: {},
    }),
    {name: 'DeleteHeroDialog'},
);

const DeleteHeroesDialog: FC<ConfirmTransactionDialogProps> = ({
                                                                   isLoading,
                                                                   onConfirm,
                                                                   numSelected,
                                                                   onCancel,
                                                                   ...rest
                                                               }) => {


    const classes = useStyles();

    return (
        <Dialog classes={{paper: classes.root}} disableBackdropClick={isLoading}
                disableEscapeKeyDown={isLoading} {...rest}>
            <DialogTitle>
                Delete Hero(s)
            </DialogTitle>

            <DialogContent>
                Are you sure you want to delete {numSelected} record(s)?
            </DialogContent>

            <DialogActions>
                <Button disabled={isLoading} variant={'outlined'} color={'secondary'}
                        onClick={() => onCancel && onCancel()}>
                    Cancel
                </Button>
                <Button disabled={isLoading} type={'submit'} variant={'contained'} color={'secondary'}
                        onClick={() => onConfirm && onConfirm()}>
                    yeah
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default DeleteHeroesDialog;
