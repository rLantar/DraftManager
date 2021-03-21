import React, {FC, useState} from 'react';
import {
    Box, Checkbox,
    Container, IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Toolbar, Tooltip, Typography
} from "@material-ui/core";
import {fullHeightFlex} from "../../styles/fullHeight";
import {useQuery} from "react-query";
import {draftDatabase} from "../../core/firebase";
import EditHeroesDialog from "./EditHeroesDialog";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteHeroesDialog from "./DeleteHeroesDialog";

export type Hero = {
    id: number,
    image: string,
    name: string,
    points: number,
    role: string
}

const useStyles = makeStyles(
    (theme) => ({
        root: {
            ...fullHeightFlex,
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerCard: {
            marginBottom: '10px',
        },
        row: {
            cursor: 'pointer',
        },
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-between',
        },
        table: {},
    }),
    {name: 'Heroes'},
);

function Heroes() {

    const classes = useStyles();
    const [selectedHero, setSelectedHero] = useState<Hero>();
    const [createNew, setCreateNew] = useState<boolean>(false);
    const [deleteHero, setDeleteHero] = useState<boolean>(false);
    const [selected, setSelected] = React.useState<number[]>([]);


    const {
        data,
        isLoading: heroesLoading,
        isError: heroesLoadingError,
        refetch
    } = useQuery<Hero[]>(['heroes'], async () => {
        return (await draftDatabase.ref("/heroes").get()).val();
    })


    const handleClick = (hero: Hero) => {
        setSelectedHero(hero);
    }

    const onEditConfirm = async (data: Hero) => {
        console.log(data);
        setSelectedHero(undefined);
    }

    const onCreateConfirm = async (data: Hero) => {
        console.log(data);
        setCreateNew(false);
    }

    const onConfirmDelete = () => {
        console.log(selected);
        setDeleteHero(false);
    }

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = data?.map((n) => n.id) || [];
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    if (!data) return null;

    const numSelected = selected.length || 0;
    const rowCount = data.length;

    return (
        <Container maxWidth={'lg'} className={classes.root}>

            {
                selectedHero && <EditHeroesDialog isLoading={heroesLoading} hero={selectedHero} open={true}
                                                  onCancel={() => setSelectedHero(undefined)}
                                                  onConfirm={(data: Hero) => onEditConfirm(data)}/>
            }

            {
                createNew && <EditHeroesDialog isLoading={heroesLoading} open={true}
                                               onCancel={() => setCreateNew(false)}
                                               onConfirm={(data: Hero) => onCreateConfirm(data)}/>
            }
            {
                deleteHero && <DeleteHeroesDialog isLoading={heroesLoading} open={true}
                                                  numSelected={numSelected}
                                                  onCancel={() => setDeleteHero(false)}
                                                  onConfirm={() => onConfirmDelete()}/>
            }


            <TableContainer component={Paper}>
                <Toolbar className={classes.toolbar}>
                    <Box>
                        {numSelected > 0 ? (
                            <Typography color="inherit" variant="subtitle1" component="div">
                                {numSelected} selected
                            </Typography>
                        ) : (
                            <Typography variant="h6" id="tableTitle" component="div">
                                Heroes
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        {
                            numSelected > 0 ? (
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete" onClick={() => setDeleteHero(true)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                ) :
                                <IconButton aria-label="add list" onClick={() => setCreateNew(true)}>
                                    <AddIcon/>
                                </IconButton>
                        }
                    </Box>
                </Toolbar>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={rowCount > 0 && numSelected === rowCount}
                                    onChange={handleSelectAllClick}
                                    inputProps={{'aria-label': 'select all'}}
                                />
                            </TableCell>
                            <TableCell>id</TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>image</TableCell>
                            <TableCell>points</TableCell>
                            <TableCell>role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index: number) => (
                            <TableRow key={row.id}
                                      className={classes.row}
                                      onClick={(event: any) => {
                                          handleClick(row)
                                      }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            handleSelectClick(row.id);
                                        }}
                                        checked={isSelected(row.id)}
                                    />
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    {row.image}
                                </TableCell>
                                <TableCell>
                                    {row.points}
                                </TableCell>
                                <TableCell>
                                    {row.role}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Heroes;
