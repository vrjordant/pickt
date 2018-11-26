const bcrypt = require("bcrypt");

let users = [
	{
		username: "masterdetective123",
		firstName: "Sherlock",
		lastName: "Holmes",
		profession: "Detective",
		bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private " +
			"detective created by British author Sir Arthur Conan Doyle. Known " +
			"as a \"consulting\" detective in the stories, Holmes is known " + 
			"for a proficiency with observation, forensic science, and logical " +
			"reasoning that borders on the fantastic, which he employs when " +
			"investigating cases for a wide variety of clients, including " +
			"Scotland Yard.",
		hashedPw: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
		sessionIds: []
	},
	{
		username: "lemon",
		firstName: "Elizabeth",
		lastName: "Lemon",
		profession: "Writer",
		bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of " +
		"the American television series 30 Rock. She created and writes for " +
		"the fictional comedy-sketch show The Girlie Show or TGS with " +
		"Tracy Jordan.",
		hashedPw: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
		sessionIds: []
	},
	{
		username: "theboywholived",
		firstName: "Harry",
		lastName: "Potter",
		profession: "Student",
		bio: "Harry Potter is a series of fantasy novels written by British " +
		"author J. K. Rowling. The novels chronicle the life of a young " +
		"wizard, Harry Potter, and his friends Hermione Granger and Ron" +
		"Weasley, all of whom are students at Hogwarts School of Witchcraft " +
		"and Wizardry . The main story arc concerns Harry's struggle against " +
		"Lord Voldemort, a dark wizard who intends to become immortal, " +
		"overthrow the wizard governing body known as the Ministry of Magic, " +
		"and subjugate all wizards and Muggles.",
		hashedPw: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
		sessionIds: []
	}
]

function checkIsString(val, variableName) {
  if (!val) {
    throw `Need to provide a ${variableName || "string"}`;
  }
    if (typeof val !== "string") {
        throw `${variableName || "provided variable"} is not a string`;
    }
}

function getUserByUn(un) {
	checkIsString(un, "username");
	for (var i = 0; i < users.length; i++) {
		if (users[i].username == un) {
			return users[i];
		}
	}
	return null;
}

module.exports = {
	async getUserByUn(un) {
		try {
			checkIsString(un, "username");
			for (var i = 0; i < users.length; i++) {
				if (users[i].username == un) {
					return users[i];
				}
			}
		} catch (e) {
			throw("No user with that username");
		}
	},

	async getUserBySession(sid) {
		try {
			for (var i = 0; i < users.length; i++) {
				for (var j = 0; j < users[i].sessionIds.length; j++) {
					if (users[i].sessionIds[j] == sid) {
						return users[i];
					}
				}
			}
			return null;
		} catch (e) {
			throw(e);
		}
	},

	async validate(un, pw) {
		checkIsString(un, "username");
		checkIsString(pw, "password");

		const user = getUserByUn(un);

		if (user == null) {
			throw("No user with that username");
		}
		
		if (await bcrypt.compare(pw, user.hashedPw) === true) {
			return true;
		} else {
			return false;
		}
	},

	async addSession(un, sid) {
		try {
			let user = getUserByUn(un);
			user.sessionIds.push(sid);
		} catch (e) {
			throw("No user with that username");
		}
		return true;
	},

	async deleteSession(sid) {
		for (var i = 0; i < users.length; i++) {
			for (var j = 0; i < users[i].sessionIds.length; j++) {
				if (users[i].sessionIds[j] === sid) {
					return users[i].sessionIds.splice(j, 1);
				}
			}
		}
		return null;
	}

};