const regionList = ["Northeast",
                    "Southeast",
                    "Southwest",
                    "Midwest",
                    "West"];
const regions = {
    "Northeast":["New Jersey"],
    "Southeast":["Florida", 
                 "Georgia"],
    "Midwest":["Michigan",
               "Wisconsin"],
    "Southwest":["Arizona",
                 "Texas"],
    "West":["Washington",
            "Alaska"]
};
const states = [
    "Alaska",
    "Arizona",
    "Florida",
    "Georgia",
    "Michigan",
    "New Jersey",
    "Texas",
    "Washington",
    "Wisconsin"
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
    getRegionList: function getRegionList() {
        return regionList;
    },
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

