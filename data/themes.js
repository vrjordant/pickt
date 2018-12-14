const themes = {
    'Animals': ["Dogs",
                "Cats",
                "Ducks",
                "Snakes",
                "Squirrels",
                "Pigeons",
                "Horses"],
    'Trees': [  "Pine Tree",
                "Cherry Blossom",
                "Willow Tree",
                "Maple Tree",
                "Apple Tree",
                "Chestnut Oak",
                "Red Oak"]
};
module.exports = {
    getThemes: function getThemes() {
        return themes;
    }
};