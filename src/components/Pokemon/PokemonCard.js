import { PropTypes } from "prop-types";

// material-ui imports
import {
    Card,
    CardContent,
    Box,
    Stack,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Tooltip,
    styled,
} from "@mui/material";

// assets
import {
    IconHealth,
    IconAttack,
    IconDefense,
    IconSpeed,
    IconSpecialAtk,
    IconSpecialDef,
} from "../../assets/icons/Icons";

const PokemonIdContainer = styled(Box)(() => ({
    width: 250,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a386da",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: "#fff",
}));

const PokemonNameContainer = styled(Box)(() => ({
    width: 250,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3effd",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    color: "#6d6a72",
    textTransform: "capitalize",
}));

const PokemonCard = ({ pokemon }) => {
    const spriteGIF = `${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}`;
    const pokemonName = pokemon.name;
    const pokemonId = String(pokemon.id).padStart(3, 0);
    const height = pokemon.height;
    const weight = pokemon.weight;
    const species = pokemon.species.name;
    const stats = pokemon.stats.map((data) => ({
        name: data.stat.name,
        baseStat: data.base_stat,
    }));

    const statsList = stats.map((stat) => {
        let icon;
        let tooltipTitle;
        switch (stat.name) {
            case "hp":
                icon = <IconHealth />;
                tooltipTitle = "Health";
                break;
            case "attack":
                icon = <IconAttack />;
                tooltipTitle = "Attack";
                break;
            case "defense":
                icon = <IconDefense />;
                tooltipTitle = "Defense";
                break;
            case "special-attack":
                icon = <IconSpecialAtk />;
                tooltipTitle = "Special Attack";
                break;
            case "special-defense":
                icon = <IconSpecialDef />;
                tooltipTitle = "Special Defense";
                break;
            case "speed":
                icon = <IconSpeed />;
                tooltipTitle = "Speed";
        }
        return (
            <ListItem key={stat.name} sx={{ m: 0, width: "fit-content" }}>
                <Tooltip title={tooltipTitle} placement="top">
                    <Stack direction="row">
                        <ListItemIcon sx={{ minWidth: "24px", pr: 2 }}>
                            {icon}
                        </ListItemIcon>
                        <Typography fontWeight="bold">
                            {stat.baseStat}
                        </Typography>
                    </Stack>
                </Tooltip>
            </ListItem>
        );
    });

    return (
        <Card
            sx={{
                backgroundColor: "#ede3ff",
                color: "#6d6a72",
                minWidth: 320,
                width: 600,
                ":hover": {
                    boxShadow: 8,
                },
            }}
            elevation={4}
        >
            <CardContent>
                <Stack
                    sx={{ mb: 4 }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Box
                        sx={{ height: 200, width: 200 }}
                        component="img"
                        alt={pokemonName}
                        src={spriteGIF}
                    />
                    <Box>
                        <PokemonIdContainer>
                            <Typography variant="h5">
                                No. {pokemonId}
                            </Typography>
                        </PokemonIdContainer>
                        <PokemonNameContainer>
                            <Typography variant="h5">{pokemonName}</Typography>
                        </PokemonNameContainer>
                    </Box>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-around">
                    <List
                        sx={{
                            width: "40%",
                            fontWeight: "bold",
                            fontSize: "18px",
                        }}
                    >
                        <ListItem>Height: {height}</ListItem>
                        <ListItem>Weight: {weight}</ListItem>
                        <ListItem sx={{ textTransform: "capitalize" }}>
                            Species: {species}
                        </ListItem>
                    </List>
                    <Divider flexItem orientation="vertical" />
                    <List
                        sx={{
                            width: "50%",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        {statsList}
                    </List>
                </Stack>
            </CardContent>
        </Card>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.object,
};

export default PokemonCard;
