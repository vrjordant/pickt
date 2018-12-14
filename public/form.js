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
  
        region.addEventListener("change", function() {
            console.log(region.value);
        });

          // Values come from inputs as strings, no matter what :(
        //   var li = document.createElement("li");
        //   li.innerHTML = test_txt;

        //   if (is_palindrome) {
        //     li.className = "is-palindrome";
        //   }
        //   else {
        //     li.className = "not-palindrome"
        //   }
        //   attempts.append(li);
  
    } 
  })();
  
  