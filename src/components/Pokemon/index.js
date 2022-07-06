import { useState, useEffect } from "react";

// material-ui imports
import {
    Paper,
    Box,
    Grid,
    TextField,
    CircularProgress,
    Typography,
    styled,
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
    const [message, setMessage] = useState(
        "Search for your favourite Pokemon."
    );

    const handleFieldChange = ({ target }) => setPokemonName(target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (pokemonName.length === 0) {
            setMessage("Please enter a Pokemon name.");
            return setPokemonData(null);
        }

        setIsLoading(true);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
            { method: "GET" }
        );
        if (!response.ok) {
            setMessage(`Pokemon "${pokemonName}" does not exist.`);
            setIsLoading(false);
            return new Error("No Pokemon found");
        }
        const data = await response.json();
        setPokemonData(data);
        setPokemonName("");
        setIsLoading(false);
    };

    useEffect(() => {
        const resetMessage = setTimeout(() => {
            setMessage("Search for your favourite Pokemon.");
        }, 4000);
        return () => clearTimeout(resetMessage);
    }, [message]);

    return (
        <PaperWrapper elevation={1}>
            <Box
                sx={{ width: "80%", height: "80%" }}
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
                        {!isLoading && !pokemonData && (
                            <Typography sx={{ color: "#aaa" }} variant="h4">
                                {message}
                            </Typography>
                        )}
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
