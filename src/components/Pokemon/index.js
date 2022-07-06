import { useState } from "react";

// material-ui imports
import {
    Paper,
    Box,
    Grid,
    TextField,
    styled,
    CircularProgress,
} from "@mui/material";

// assets
import { IconSearch } from "../../assets/icons/Icons";

// project imports
import PokemonCard from "./PokemonCard";

const PaperWrapper = styled(Paper)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70vw",
    height: "90%",
}));

const Pokemon = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonName, setPokemonName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = ({ target }) => setPokemonName(target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
            { method: "GET" }
        );
        if (!response.ok) {
            setIsLoading(false);
            return new Error("No Pokemon found");
        }
        const data = await response.json();
        setPokemonData(data);
        setIsLoading(false);
        setPokemonName("");
    };

    return (
        <PaperWrapper elevation={1}>
            <Box
                sx={{ width: "80%", height: "100%" }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Grid
                    sx={{ height: "100%" }}
                    container
                    spacing={3}
                    direction="column"
                    justifyContent="space-evenly"
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

                    <Grid item>
                        {isLoading && <CircularProgress />}
                        {!isLoading && pokemonData && (
                            <PokemonCard pokemon={pokemonData} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </PaperWrapper>
    );
};

export default Pokemon;
