import { useState } from "react";

// material-ui imports
import {
    Paper,
    Box,
    Grid,
    Stack,
    Card,
    TextField,
    styled,
} from "@mui/material";

// assets
import { IconSearch } from "../../assets/icons/Icons";

const PaperWrapper = styled(Paper)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70vw",
    height: "90%",
    ":hover": {
        boxShadow: 16,
    },
}));

const Pokemon = () => {
    const [pokemonData, setPokemonData] = useState({});
    const [pokemonName, setPokemonName] = useState("");

    const handleFieldChange = ({ target }) => setPokemonName(target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
            { method: "GET" }
        );
        if (!response.ok) return new Error("No Pokemon found");
        const data = await response.json();
        setPokemonData(data);
    };

    return (
        <PaperWrapper elevation={8}>
            <Box sx={{ width: "80%" }} component="form" onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <TextField
                            size="small"
                            label="Pokemon Name"
                            placeholder="Search..."
                            value={pokemonName}
                            onChange={handleFieldChange}
                            InputProps={{
                                startAdornment: <IconSearch position="end" />,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </PaperWrapper>
    );
};

export default Pokemon;
