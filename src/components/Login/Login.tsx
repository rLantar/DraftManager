import React from 'react';
import {Button, Card, CardActions, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useMutation} from "react-query";
import {setUser} from "../../@redux/actions";
import {rejects} from "assert";


type AuthData = {
    login: '',
    password: ''
}

const useStyles = makeStyles(
    (theme) => ({
        root: {
            maxWidth: 360
        },
        actionsSpacing: {
            padding: theme.spacing(2, 3)
        }
    }),
    {name: 'Login'},
);


function Login() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {handleSubmit, errors, control} = useForm<AuthData>({
        defaultValues: {
            login: '',
            password: ''
        }
    });

    const {mutateAsync, isLoading: authLoading, isError} = useMutation((data: AuthData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    name: 'Test user',
                    token: '123'
                })
            }, 500)
        });
    })


    const onSubmit = async (data: AuthData) => {
        try {
            const result = await mutateAsync(data);
            dispatch(setUser(result));
        } catch (e) {
            console.error(e);
        }
    }


    const disabled = authLoading;

    return <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <Card>
            <CardContent>

                <Controller
                    name="email"
                    as={
                        <TextField
                            margin={'normal'}
                            fullWidth
                            disabled={disabled}
                            type={'email'}
                            variant="outlined"
                            label="email"
                            error={!!errors.login}
                        />
                    }
                    control={control}
                    rules={{
                        required: 'Required'
                    }}
                />
                <Controller
                    name="password"
                    as={
                        <TextField
                            margin={'normal'}
                            fullWidth
                            disabled={disabled}
                            type={'password'}
                            variant="outlined"
                            label="password"
                            error={!!errors.password}
                        />
                    }
                    control={control}
                    rules={{
                        required: 'Required'
                    }}
                />

                {
                    isError && <Typography variant={"body2"}
                                           color={'error'}
                                           align={'left'}>
                        Something went wrong
                    </Typography>
                }


            </CardContent>


            <CardActions classes={{spacing: classes.actionsSpacing}}>
                <Button variant="contained" color="primary" type={'submit'}
                        disabled={disabled}>login
                </Button>
            </CardActions>

        </Card>


    </form>;
}

export default Login;
