const regions = [
    "Northeast",
    "Southeast",
    "Midwest",
    "Southwest",
    "West"
]
const states = [
    "New Jersey",
    "Washington"
];
const counties ={
    'New Jersey': [ "Atlantic County",
                    "Bergen County",
                    "Burlington County",
                    "Camden County",
                    "Cape May County",
                    "Cumberland County",
                    "Essex County",
                    "Gloucester County",
                    "Hudson County",
                    "Hunterdon County",
                    "Mercer County",
                    "Middlesex County",
                    "Monmouth County",
                    "Morris County",
                    "Ocean County",
                    "Passaic County",
                    "Salem County",
                    "Somerset County",
                    "Sussex County",
                    "Union County",
                    "Warren County"],
    "Washington": [ "Adams County",
                    "Asotin County",
                    "Garfield County",
                    "King County",
                    "Walla Walla County"]
    };

module.exports = {
    getRegions: function getRegions() {
        return regions;
    },
	getCounties: function getCounties(){
		return counties;
    },
    getStates: function getStates() {
        return states;
    }
};

