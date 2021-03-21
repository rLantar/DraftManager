import React, {ComponentProps, FC} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import {Hero} from "./Heroes";
import {Controller, useForm} from "react-hook-form";

//x//////////////////////////////////////////////////
// CancelBookingDialog
//x//////////////////////////////////////////////////

type ConfirmTransactionDialogProps = ComponentProps<typeof Dialog> & {
    onConfirm?: (hero: Hero) => void;
    onCancel?: () => void;
    hero?: Hero;
    isLoading?: boolean;
};

const useStyles = makeStyles(
    (theme) => ({
        root: {},
    }),
    {name: 'EditHeroDialog'},
);

const EditHeroesDialog: FC<ConfirmTransactionDialogProps> = ({
                                                                 isLoading,
                                                                 hero,
                                                                 onConfirm,
                                                                 onCancel,
                                                                 ...rest
                                                             }) => {


    const classes = useStyles();

    const {handleSubmit, errors, control, watch} = useForm<Hero>({
        defaultValues: {
            ...hero
        }
    });

    const onSubmit = (data: Hero) => {
        onConfirm && onConfirm(data);
    }

    return (
        <Dialog classes={{paper: classes.root}} disableBackdropClick={isLoading}
                disableEscapeKeyDown={isLoading} {...rest}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    {hero ? 'Update Hero' : 'Create Hero'}
                </DialogTitle>

                <DialogContent>
                    <Controller
                        name="id"
                        as={
                            <TextField
                                margin={'normal'}
                                fullWidth
                                disabled={isLoading}
                                variant="outlined"
                                label="id"
                                error={!!errors.id}
                            />
                        }
                        control={control}
                        rules={{
                            required: 'Required'
                        }}
                    />
                    <Controller
                        name="name"
                        as={
                            <TextField
                                margin={'normal'}
                                fullWidth
                                disabled={isLoading}
                                variant="outlined"
                                label="name"
                                error={!!errors.name}
                            />
                        }
                        control={control}
                        rules={{
                            required: 'Required'
                        }}
                    />
                    <Controller
                        name="image"
                        as={
                            <TextField
                                margin={'normal'}
                                fullWidth
                                disabled={isLoading}
                                variant="outlined"
                                label="image"
                                error={!!errors.image}
                            />
                        }
                        control={control}
                        rules={{
                            required: 'Required'
                        }}
                    />
                    <Controller
                        name="points"
                        as={
                            <TextField
                                margin={'normal'}
                                fullWidth
                                disabled={isLoading}
                                variant="outlined"
                                label="points"
                                error={!!errors.points}
                            />
                        }
                        control={control}
                        rules={{
                            required: 'Required'
                        }}
                    />
                    <Controller
                        name="role"
                        as={
                            <TextField
                                margin={'normal'}
                                fullWidth
                                disabled={isLoading}
                                variant="outlined"
                                label="role"
                                error={!!errors.role}
                            />
                        }
                        control={control}
                        rules={{
                            required: 'Required'
                        }}
                    />

                </DialogContent>

                <DialogActions>
                    <Button disabled={isLoading} variant={'outlined'} color={'secondary'}
                            onClick={() => onCancel && onCancel()}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type={'submit'} variant={'contained'} color={'secondary'}>
                        {hero ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};


export default EditHeroesDialog;
