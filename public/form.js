(function() {
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
        'Alaska':[],
        'Arizona':[],
        'Florida':[],
        'Georgia':[],
        'Michigan':[],
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
        'Texas':[],
        "Washington": [ "Adams County",
                        "Asotin County",
                        "Garfield County",
                        "King County",
                        "Walla Walla County"],
        'Wisconsin':[]
        };
    const formPal = document.getElementById("sign_up_form");
    if (formPal) {
        const region = document.getElementById("region");
        const state = document.getElementById("state");
        const local = document.getElementById("local");

        for (let i = 0; i < regionList.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = regionList[i];
            option.value = regionList[i];
            region.append(option);
        }

        region.addEventListener("change", function() {
            while (state.firstChild) {
                state.removeChild(state.firstChild);
            }
            let current_region = region.value;
            let region_to_state_array = regions[current_region];
            for (let i = 0; i < region_to_state_array.length; i++) {
                let option = document.createElement("option");
                option.innerHTML = region_to_state_array[i];
                option.value = region_to_state_array[i];
                state.append(option);
            }
            while(local.firstChild) {
                local.removeChild(local.firstChild);
            }
            let current_state = state.value;
            let state_to_local_array = counties[current_state];
            for (let i = 0; i < state_to_local_array.length; i++) {
                let option = document.createElement("option");
                option.innerHTML = state_to_local_array[i];
                option.value = state_to_local_array[i];
                local.append(option);
            }
        });
        state.addEventListener("change", function() {
            while (local.firstChild) {
                local.removeChild(local.firstChild);
            }
            let current_state = state.value;
            let state_to_local_array = counties[current_state];
            for (let i = 0; i < state_to_local_array.length; i++) {
                let option = document.createElement("option");
                option.innerHTML = state_to_local_array[i];
                option.value = state_to_local_array[i];
                local.append(option);
            }
        });
    } 
  })();
  
  