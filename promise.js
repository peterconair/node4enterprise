var Promise = require('bluebird');


/*
var loki = require('lokijs');
var db = new loki('Contacts');
var users = db.addCollection('users', { indices: ['id','email'] });

function add(contact){
	var deferred = Promise.pending();
	 var a = users.insert(contact);
	 if (a)
        deferred.resolve(a);
    else
    	deferred.reject('Error:' + JSON.stringify(contact));
	return deferred.promise;
}

function update(id,content){
	var deferred = Promise.pending();
	search({id:id})
	.then(function(contacts){
		console.log('Before Edit', contacts);
		if(contacts.length >0){
			var props =Object.getOwnPropertyNames(content);
			props.forEach(function(p){
				contacts[0][p] = content[p];
			});
			users.update(contacts[0]);
		}
		search({id:id}).then(function(edit){
			console.log('After Edit', edit);
		});

		 deferred.resolve(contacts);
	});

	return deferred.promise;
}

function search(condition){
	var deferred = Promise.pending();
	var founds = users.find(condition);
	if(founds.length > 0)
		deferred.resolve(founds);
	else
		deferred.reject('Error: User is not found!');
	return deferred.promise;
}

function getall(){
	var deferred = Promise.pending();
	if(users)
		deferred.resolve(users);
	else
		deferred.reject('Error: Users is not found!');
	return deferred.promise;
}

function remove(condition){
	var deferred = Promise.pending();
	var total =users.data.length;
	  users.removeWhere(condition);
	  var deleted =total - users.data.length;
	  if(total!=users.data.length)
	  deferred.resolve('Deleted!'+ deleted);
	else
	  deferred.reject('Error: Can\'t delete!');
	return deferred.promise;
}

var contacts =[
	{
		"id": "F789345C-9BEC-4C4E-4AF7-778098E62C8E",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Nita",
		"lastName": "Rodgers",
		"birthDay": "09/30/2016",
		"email": "vestibulum.massa@Nullamvelit.edu"
	},
	{
		"id": "00DA234C-F049-4DA0-EA70-425FF7610B18",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Stuart",
		"lastName": "Fleming",
		"birthDay": "03/14/2015",
		"email": "fringilla.est.Mauris@magnis.co.uk"
	},
	{
		"id": "3E002E09-6923-320E-6A06-3FD6E17A54F7",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Phyllis",
		"lastName": "Morrison",
		"birthDay": "05/07/2016",
		"email": "pharetra@ipsum.ca"
	},
	{
		"id": "34FBB41A-C666-069E-9B3F-5F27019AF2FE",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Fredericka",
		"lastName": "Ballard",
		"birthDay": "12/29/2016",
		"email": "consequat.enim@duiCras.edu"
	},
	{
		"id": "9EACEBC5-A12F-D649-83EB-A189CFD90111",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Barrett",
		"lastName": "Gonzales",
		"birthDay": "03/13/2016",
		"email": "lectus.a@amet.edu"
	},
	{
		"id": "F1288D40-88BC-D997-3524-2A9964F75338",
		"title": "",
		"sex": "M",
		"firstName": "Imogene",
		"lastName": "Yates",
		"birthDay": "03/19/2015",
		"email": "Phasellus.libero.mauris@quam.co.uk"
	},
	{
		"id": "2760E892-5237-96DF-1FEC-B72C5A62B4AB",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Ulric",
		"lastName": "Sellers",
		"birthDay": "07/05/2015",
		"email": "arcu.vel.quam@IntegerurnaVivamus.co.uk"
	},
	{
		"id": "7D276B23-CA11-853A-2C97-BE5FD63FE584",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Samson",
		"lastName": "Tran",
		"birthDay": "10/29/2016",
		"email": "feugiat.metus@ultrices.co.uk"
	},
	{
		"id": "FCB50168-C98E-48CE-2B82-3F9BCDDA73B1",
		"title": "",
		"sex": "M",
		"firstName": "Wilma",
		"lastName": "Kemp",
		"birthDay": "10/05/2015",
		"email": "cursus.luctus.ipsum@consectetuereuismodest.com"
	},
	{
		"id": "17437026-141D-7BD9-567C-E59D0BD4F946",
		"title": "",
		"sex": "M",
		"firstName": "Melinda",
		"lastName": "Mclean",
		"birthDay": "10/23/2015",
		"email": "consequat@acfeugiat.edu"
	},
	{
		"id": "2124B0F3-C65B-21B6-08A3-98DBADE92014",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Lynn",
		"lastName": "Lane",
		"birthDay": "10/22/2016",
		"email": "amet.diam.eu@suscipit.com"
	},
	{
		"id": "D2BE97EC-FA8B-21E6-B57A-E79DCCF9AC39",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Piper",
		"lastName": "Wilkerson",
		"birthDay": "06/22/2015",
		"email": "facilisis@enim.org"
	},
	{
		"id": "765F204B-0CC0-2148-55B6-BE8A68DF8B0E",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Bruno",
		"lastName": "Porter",
		"birthDay": "01/24/2015",
		"email": "ligula.Nullam@sagittisplacerat.co.uk"
	},
	{
		"id": "D50104C3-5F2B-6C82-27CF-14C7686362F2",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Kaye",
		"lastName": "Skinner",
		"birthDay": "03/20/2016",
		"email": "nec.metus.facilisis@intempuseu.com"
	},
	{
		"id": "72245F9D-6CFC-745C-D866-5E51794A7E6C",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Lara",
		"lastName": "Barton",
		"birthDay": "08/04/2016",
		"email": "Donec@montesnascetur.net"
	},
	{
		"id": "5A8558F8-919C-5F83-9FC4-93E7D7028C8C",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Sigourney",
		"lastName": "Hoover",
		"birthDay": "12/21/2016",
		"email": "Curabitur.massa@in.edu"
	},
	{
		"id": "7CEBA4F5-E55E-5527-1DBF-4CC9490327AA",
		"title": "",
		"sex": "F",
		"firstName": "Hadassah",
		"lastName": "Romero",
		"birthDay": "03/15/2016",
		"email": "velit@odioauctorvitae.org"
	},
	{
		"id": "641B68F1-BE9B-90CA-5316-20A24D855AAE",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Cheryl",
		"lastName": "Moran",
		"birthDay": "06/14/2016",
		"email": "Aliquam.erat.volutpat@Proinsedturpis.co.uk"
	},
	{
		"id": "73826826-01C8-7580-CD2C-FB739DEF5CEB",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Claudia",
		"lastName": "Carter",
		"birthDay": "01/18/2016",
		"email": "libero.Proin.sed@nonmagnaNam.co.uk"
	},
	{
		"id": "755684FF-92D4-ADB6-4327-237A78C1132E",
		"title": "",
		"sex": "F",
		"firstName": "Herrod",
		"lastName": "Jones",
		"birthDay": "05/16/2016",
		"email": "nulla@dis.co.uk"
	},
	{
		"id": "E5AAAB35-AF7D-8291-01A8-4E2927E3016C",
		"title": "",
		"sex": "F",
		"firstName": "India",
		"lastName": "Hammond",
		"birthDay": "09/02/2016",
		"email": "augue.malesuada.malesuada@velmauris.net"
	},
	{
		"id": "75C7D1F6-2EF0-4B2C-1B28-DE9E97C39A74",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Raymond",
		"lastName": "Mccarthy",
		"birthDay": "11/09/2015",
		"email": "rhoncus@nec.ca"
	},
	{
		"id": "A3BA48DC-BD2D-8AD3-5E06-591A09F37D5A",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Ivana",
		"lastName": "Fitzpatrick",
		"birthDay": "07/08/2015",
		"email": "Suspendisse.sagittis.Nullam@varius.co.uk"
	},
	{
		"id": "320883A0-77C9-782F-8912-AFF1CE61E5EF",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Xanthus",
		"lastName": "Ewing",
		"birthDay": "09/11/2015",
		"email": "velit.Sed.malesuada@ategestas.ca"
	},
	{
		"id": "F0B07D0C-951F-2E94-0196-9E63FD0DA822",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Carlos",
		"lastName": "Henderson",
		"birthDay": "02/24/2016",
		"email": "pede.Cras.vulputate@nonsapienmolestie.edu"
	},
	{
		"id": "D85BB23B-31CC-9E0E-2E4E-0E5E4E2878FF",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Karen",
		"lastName": "Herman",
		"birthDay": "07/07/2016",
		"email": "placerat.eget.venenatis@consectetueradipiscingelit.co.uk"
	},
	{
		"id": "FB12244C-61FA-18E7-5D59-6CDC5F977C0A",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Priscilla",
		"lastName": "Wilkinson",
		"birthDay": "04/21/2016",
		"email": "Phasellus@aaliquet.org"
	},
	{
		"id": "D18A5269-AF7C-CDE3-241B-E7BD66BAAF21",
		"title": "",
		"sex": "M",
		"firstName": "Raven",
		"lastName": "Mcintosh",
		"birthDay": "06/01/2016",
		"email": "habitant@auguemalesuada.org"
	},
	{
		"id": "5340FD10-CFEF-B405-2AC0-925F71DC97BB",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Brendan",
		"lastName": "Velazquez",
		"birthDay": "04/20/2016",
		"email": "semper.dui.lectus@cursuset.edu"
	},
	{
		"id": "EE0FF85F-DABE-6434-69CE-7BB82B613088",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Melanie",
		"lastName": "Langley",
		"birthDay": "05/27/2015",
		"email": "metus.Aenean.sed@imperdietnec.net"
	},
	{
		"id": "13BE1457-39D0-0FC9-A98C-AC392EACE8A0",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Stuart",
		"lastName": "Hatfield",
		"birthDay": "06/20/2016",
		"email": "id.libero@ametloremsemper.org"
	},
	{
		"id": "E5656DD5-4982-9A78-0657-038390754580",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Jaime",
		"lastName": "Guthrie",
		"birthDay": "06/20/2015",
		"email": "turpis.egestas.Fusce@idnunc.net"
	},
	{
		"id": "3EEA7581-9BF6-F87F-2728-A346622C7298",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Giacomo",
		"lastName": "Hebert",
		"birthDay": "07/13/2016",
		"email": "Etiam.vestibulum.massa@enimdiam.net"
	},
	{
		"id": "C314D444-7F4E-F2C2-2D8C-BD72CCDC14D4",
		"title": "",
		"sex": "F",
		"firstName": "Flynn",
		"lastName": "Huff",
		"birthDay": "11/19/2016",
		"email": "dolor@intempuseu.ca"
	},
	{
		"id": "86E52093-2B72-F2A2-44A1-3259F26AF17B",
		"title": "",
		"sex": "F",
		"firstName": "Brian",
		"lastName": "Baxter",
		"birthDay": "08/11/2016",
		"email": "felis.ullamcorper.viverra@elementumloremut.ca"
	},
	{
		"id": "A8B3FC22-AE30-0070-0054-6FDE164B233D",
		"title": "",
		"sex": "M",
		"firstName": "Coby",
		"lastName": "Foreman",
		"birthDay": "01/23/2016",
		"email": "arcu.Aliquam.ultrices@semegestas.edu"
	},
	{
		"id": "3BF14D3C-0B75-4A22-F1FC-0B899CA43296",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Jessica",
		"lastName": "Callahan",
		"birthDay": "07/30/2015",
		"email": "congue@tellussemmollis.edu"
	},
	{
		"id": "9D449E6C-56B8-EF5A-422E-ACD50EB7F45D",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Jermaine",
		"lastName": "Good",
		"birthDay": "08/01/2015",
		"email": "venenatis.lacus.Etiam@nec.co.uk"
	},
	{
		"id": "6E9175B6-1811-9239-0CF5-93500C2476A5",
		"title": "",
		"sex": "F",
		"firstName": "Idona",
		"lastName": "Daugherty",
		"birthDay": "10/23/2015",
		"email": "luctus@non.edu"
	},
	{
		"id": "F0973B84-9E3C-969B-6940-EBB7B394462F",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Sara",
		"lastName": "Parsons",
		"birthDay": "12/31/2015",
		"email": "enim.Etiam.imperdiet@dapibusligulaAliquam.net"
	},
	{
		"id": "AF64EC9F-5A0F-EA95-8087-D59E7494CD62",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Ciara",
		"lastName": "Ashley",
		"birthDay": "01/23/2015",
		"email": "lacus@Sednullaante.com"
	},
	{
		"id": "1D0FE6C4-DB58-41AB-B774-0BE56B0221E9",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Holmes",
		"lastName": "Haney",
		"birthDay": "01/21/2015",
		"email": "enim@sagittis.org"
	},
	{
		"id": "70AADEB6-AB38-E87A-24E2-D359C865F525",
		"title": "",
		"sex": "M",
		"firstName": "Shoshana",
		"lastName": "Martin",
		"birthDay": "04/08/2015",
		"email": "tellus@sodalesatvelit.edu"
	},
	{
		"id": "FD2953D7-3FB1-270D-DE36-875EF39C31D3",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Mona",
		"lastName": "Skinner",
		"birthDay": "07/06/2015",
		"email": "facilisis@sedhendrerit.edu"
	},
	{
		"id": "D387F9DD-0192-2CAF-3FF4-9D0FCB2E1847",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Dennis",
		"lastName": "Mckinney",
		"birthDay": "10/12/2015",
		"email": "lectus@montesnasceturridiculus.com"
	},
	{
		"id": "603B0DF8-4E8E-0822-EB73-63EB3D95E44B",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Noel",
		"lastName": "Osborne",
		"birthDay": "08/06/2016",
		"email": "gravida.sagittis@hymenaeosMauris.edu"
	},
	{
		"id": "94AF291A-E5C6-EBCF-C4D3-BA6B33498451",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Emerson",
		"lastName": "Tran",
		"birthDay": "12/12/2016",
		"email": "lobortis.nisi.nibh@blanditenim.edu"
	},
	{
		"id": "337D4021-CADF-223B-8CE5-6EB69AF9D916",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Bianca",
		"lastName": "Noel",
		"birthDay": "05/23/2016",
		"email": "nec.diam@mollisIntegertincidunt.org"
	},
	{
		"id": "CB34C539-80CE-732D-A314-18BA0FC9D5A6",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Charity",
		"lastName": "Reyes",
		"birthDay": "05/25/2015",
		"email": "cubilia.Curae.Phasellus@magnaPhasellusdolor.co.uk"
	},
	{
		"id": "D24EF196-E081-9DD0-F699-EE77D75BB390",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Russell",
		"lastName": "Hester",
		"birthDay": "09/01/2015",
		"email": "pede@Crasvulputate.ca"
	},
	{
		"id": "768AC38B-37A0-7658-F21F-F4F7C2EB1F6F",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Mason",
		"lastName": "Morgan",
		"birthDay": "12/14/2016",
		"email": "Duis.ac@sodalesMaurisblandit.ca"
	},
	{
		"id": "1906A0EB-5BD0-5CA3-9ED7-3C5AEE518144",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Adele",
		"lastName": "Cohen",
		"birthDay": "06/06/2015",
		"email": "vulputate.lacus@dignissimMaecenas.com"
	},
	{
		"id": "41355C57-76E5-2E23-3EBB-0C37A2B59DCD",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Stephen",
		"lastName": "Sherman",
		"birthDay": "10/19/2016",
		"email": "eleifend.nec.malesuada@anteNunc.edu"
	},
	{
		"id": "A1EA320D-0E14-CB60-6CC5-3FB230AFEFE8",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Victoria",
		"lastName": "Quinn",
		"birthDay": "04/11/2016",
		"email": "nisl.elementum@Sedmalesuadaaugue.net"
	},
	{
		"id": "EEDB8146-EE44-1CFA-3F0C-9011CBB79E70",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Blaine",
		"lastName": "Swanson",
		"birthDay": "01/25/2016",
		"email": "scelerisque.dui.Suspendisse@faucibusorci.net"
	},
	{
		"id": "8914F6A2-FE4B-118D-FA5F-89D27B53F9A7",
		"title": "",
		"sex": "F",
		"firstName": "Gannon",
		"lastName": "Washington",
		"birthDay": "01/18/2016",
		"email": "eget@nunc.edu"
	},
	{
		"id": "621D817C-12A3-79DD-19E4-1756F1DD81A5",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Levi",
		"lastName": "Zimmerman",
		"birthDay": "05/20/2016",
		"email": "In.tincidunt.congue@pellentesqueSeddictum.co.uk"
	},
	{
		"id": "1A4EFB30-B96F-9BB1-C4DF-75D73976C7FE",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Judah",
		"lastName": "Harper",
		"birthDay": "05/02/2016",
		"email": "non.arcu.Vivamus@Duis.com"
	},
	{
		"id": "2EBE6791-601E-E100-6F0C-5E4947CD4806",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Henry",
		"lastName": "Valencia",
		"birthDay": "10/11/2015",
		"email": "tincidunt@cubilia.edu"
	},
	{
		"id": "8A03ECCE-F114-3D39-9225-FC0B44121617",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Brenda",
		"lastName": "Duke",
		"birthDay": "09/15/2015",
		"email": "augue.eu@egetmagnaSuspendisse.com"
	},
	{
		"id": "017DDE95-CC14-4EDA-1651-2CA4E0AAD823",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Joan",
		"lastName": "Carrillo",
		"birthDay": "04/08/2016",
		"email": "urna.Vivamus@quispede.co.uk"
	},
	{
		"id": "350F0350-439E-228E-634E-570B9ABCDC2D",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Oliver",
		"lastName": "Vang",
		"birthDay": "08/12/2016",
		"email": "ligula@orciadipiscingnon.edu"
	},
	{
		"id": "242106FA-9E5A-AC14-D4A3-C8759F3AC87D",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Gareth",
		"lastName": "Randolph",
		"birthDay": "03/22/2015",
		"email": "lacus.Cras@Cumsociisnatoque.org"
	},
	{
		"id": "06F16DC8-2737-40FC-2A6E-C8562973B922",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Zenaida",
		"lastName": "Avery",
		"birthDay": "05/14/2015",
		"email": "sed@luctusaliquetodio.net"
	},
	{
		"id": "A5B3BC04-4575-2612-4FE0-4F38282BC5BF",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Jasper",
		"lastName": "Richard",
		"birthDay": "11/14/2015",
		"email": "Nam.ligula.elit@Aenean.org"
	},
	{
		"id": "64CA674D-F0CA-ECC6-C182-FD618DAE2F8E",
		"title": "",
		"sex": "F",
		"firstName": "Andrew",
		"lastName": "Hoffman",
		"birthDay": "07/15/2015",
		"email": "dolor@venenatisamagna.edu"
	},
	{
		"id": "EE0F4BE4-19E7-DCA7-49F6-CB7477DE7D7F",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Charity",
		"lastName": "Frederick",
		"birthDay": "05/29/2016",
		"email": "montes.nascetur.ridiculus@semutdolor.com"
	},
	{
		"id": "FAB49C59-1878-72E9-653D-377EDB5EC1FA",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Kirsten",
		"lastName": "Santana",
		"birthDay": "04/19/2016",
		"email": "commodo@inconsequatenim.com"
	},
	{
		"id": "356236C1-100C-7524-9A31-40F1E2CFCB24",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Cadman",
		"lastName": "Gordon",
		"birthDay": "03/15/2016",
		"email": "et@facilisislorem.net"
	},
	{
		"id": "AF3A58E5-099D-A8BC-2D0E-461448C818C8",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Chancellor",
		"lastName": "Palmer",
		"birthDay": "05/18/2015",
		"email": "iaculis.aliquet@vestibulumloremsit.com"
	},
	{
		"id": "D769FD00-2AB2-ADF8-DCAD-5EF3F99AC647",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Ahmed",
		"lastName": "Macdonald",
		"birthDay": "03/03/2015",
		"email": "tempor.est.ac@variuset.co.uk"
	},
	{
		"id": "9B26DC2B-BA21-DEC3-8EC0-902BCC2E2049",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Teagan",
		"lastName": "Mcconnell",
		"birthDay": "11/05/2016",
		"email": "arcu.et.pede@amet.co.uk"
	},
	{
		"id": "9378C944-3B34-0AA6-20C4-D530137B4768",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Ivory",
		"lastName": "Bird",
		"birthDay": "05/05/2015",
		"email": "a.felis@auctornonfeugiat.net"
	},
	{
		"id": "6A83406F-CC80-3BD3-1963-8BDB644A5B3B",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Keelie",
		"lastName": "Brady",
		"birthDay": "02/22/2015",
		"email": "a.magna@Intincidunt.ca"
	},
	{
		"id": "0AE03E4A-647C-240C-7FAB-1ADB245A8D5D",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Mari",
		"lastName": "White",
		"birthDay": "12/25/2015",
		"email": "ante.lectus@dolor.net"
	},
	{
		"id": "4DC86F81-EA81-492B-E268-D79A01472F11",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Fletcher",
		"lastName": "Roman",
		"birthDay": "02/24/2015",
		"email": "nec@maurissagittisplacerat.ca"
	},
	{
		"id": "358F11C8-2778-CA7C-DCE1-F2320BA1663C",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Myles",
		"lastName": "Roy",
		"birthDay": "01/20/2016",
		"email": "Quisque@vitaediamProin.co.uk"
	},
	{
		"id": "A5C0E32D-CF36-7764-4576-7CF7EEFA3051",
		"title": "",
		"sex": "F",
		"firstName": "Berk",
		"lastName": "Castillo",
		"birthDay": "12/15/2015",
		"email": "faucibus.orci@inconsequatenim.edu"
	},
	{
		"id": "900790CD-AA00-C1B0-0EC3-14BEA4B4382A",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Hannah",
		"lastName": "Rivera",
		"birthDay": "09/28/2016",
		"email": "ipsum.non.arcu@purusin.org"
	},
	{
		"id": "C1AA7819-69E6-E913-BB72-5347BD2974C8",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Shelley",
		"lastName": "Henderson",
		"birthDay": "09/17/2015",
		"email": "enim@malesuadaid.net"
	},
	{
		"id": "3057CD89-42C4-5DAE-05F8-A656FF6809D5",
		"title": "Dr.",
		"sex": "M",
		"firstName": "McKenzie",
		"lastName": "Cline",
		"birthDay": "10/09/2015",
		"email": "eu.elit.Nulla@odioEtiam.net"
	},
	{
		"id": "888E184F-D2B4-C123-D2EE-2CD8A85FE8C4",
		"title": "",
		"sex": "M",
		"firstName": "Laurel",
		"lastName": "Bryant",
		"birthDay": "01/13/2015",
		"email": "arcu.vel@sitametultricies.com"
	},
	{
		"id": "442E9813-C5FA-30B6-5F1C-F51380F06459",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Anika",
		"lastName": "Skinner",
		"birthDay": "06/20/2016",
		"email": "velit.Cras@aceleifendvitae.co.uk"
	},
	{
		"id": "6D2E9942-2806-36F2-1973-8C10D0BF1661",
		"title": "",
		"sex": "M",
		"firstName": "Libby",
		"lastName": "Oneal",
		"birthDay": "06/21/2015",
		"email": "sed.dui.Fusce@congueelitsed.co.uk"
	},
	{
		"id": "A70CC1B2-7B3D-981C-27E1-D280F10389D3",
		"title": "",
		"sex": "F",
		"firstName": "Darius",
		"lastName": "Fry",
		"birthDay": "10/18/2015",
		"email": "Aliquam.nisl@luctusfelis.org"
	},
	{
		"id": "396DA210-FF37-E8FE-54E3-993E77E2236A",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Nathaniel",
		"lastName": "Keller",
		"birthDay": "11/24/2015",
		"email": "nulla.Integer.urna@Curabitur.com"
	},
	{
		"id": "9EB4731B-4BD3-75DF-9D21-5A80EE27A7B1",
		"title": "Mrs.",
		"sex": "M",
		"firstName": "Colin",
		"lastName": "Trujillo",
		"birthDay": "07/24/2016",
		"email": "natoque.penatibus@seddolor.ca"
	},
	{
		"id": "3DBD1B3F-FABE-D5D3-BF4F-680115774420",
		"title": "Mrs.",
		"sex": "F",
		"firstName": "Heather",
		"lastName": "Marsh",
		"birthDay": "01/10/2015",
		"email": "dictum@blanditatnisi.ca"
	},
	{
		"id": "C357A6CD-B468-F05E-0F9A-B73BC32ACDB1",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Joy",
		"lastName": "Juarez",
		"birthDay": "05/19/2015",
		"email": "nisi@nequevitae.net"
	},
	{
		"id": "3F405730-F566-79AD-BB5E-9DA910863958",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Hermione",
		"lastName": "Mccall",
		"birthDay": "09/01/2016",
		"email": "sit@duiquisaccumsan.co.uk"
	},
	{
		"id": "DE477089-E9D6-1C5D-EF1F-030350557328",
		"title": "Mr.",
		"sex": "M",
		"firstName": "Minerva",
		"lastName": "Chang",
		"birthDay": "01/18/2015",
		"email": "Donec@egestas.ca"
	},
	{
		"id": "254C155D-7A16-0999-8503-B80F23C23831",
		"title": "Dr.",
		"sex": "F",
		"firstName": "Hayden",
		"lastName": "Mooney",
		"birthDay": "12/05/2016",
		"email": "ac@nisisemsemper.com"
	},
	{
		"id": "8CB6AAD2-CB1F-038F-C064-F58B587113B4",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Emily",
		"lastName": "Cleveland",
		"birthDay": "06/18/2016",
		"email": "dapibus@mi.co.uk"
	},
	{
		"id": "1C46A899-AEA9-7A47-4103-188D8174875F",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Colleen",
		"lastName": "Wilkins",
		"birthDay": "12/09/2015",
		"email": "a@id.net"
	},
	{
		"id": "BA025B61-92C8-03EB-BB69-E208A0214AD5",
		"title": "Ms.",
		"sex": "F",
		"firstName": "Ila",
		"lastName": "Knox",
		"birthDay": "09/22/2015",
		"email": "eros.Nam.consequat@tellusimperdiet.ca"
	},
	{
		"id": "BFB62AAC-9A4A-7814-DB56-E563CE736838",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Hedda",
		"lastName": "Barr",
		"birthDay": "06/25/2016",
		"email": "Praesent.luctus.Curabitur@dignissimMaecenas.org"
	},
	{
		"id": "D26AF8B2-D738-35B6-0818-1609A160FA60",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Alice",
		"lastName": "Mcmillan",
		"birthDay": "07/20/2016",
		"email": "lectus.quis.massa@varius.edu"
	},
	{
		"id": "C47B9703-81CD-31A0-35CE-DA888D4E3D19",
		"title": "Ms.",
		"sex": "M",
		"firstName": "Leilani",
		"lastName": "Valencia",
		"birthDay": "09/07/2016",
		"email": "ipsum@erat.net"
	},
	{
		"id": "0AF5BD7B-6FFE-751B-8F02-6E50F1C28D15",
		"title": "Dr.",
		"sex": "M",
		"firstName": "Jack",
		"lastName": "Rivera",
		"birthDay": "10/11/2016",
		"email": "ac.feugiat.non@vestibulumnec.co.uk"
	},
	{
		"id": "CA912483-912D-2B0A-69B5-F2434F56928B",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Felicia",
		"lastName": "Greer",
		"birthDay": "02/24/2016",
		"email": "lacus@massanonante.edu"
	}
];

var condition = {"sex":{"$contains":"M"}};

for(var i=0;i<contacts.length;i++){
	add(contacts[i])
	.then(function(contact){
		console.log('add ' + JSON.stringify(contact));
	});
	};

remove(condition).then(function(result){
	console.log('Remove',result);
});

update("CA912483-912D-2B0A-69B5-F2434F56928B",{title:"นาย","firstName":"อภัยชนม์"})
.then(function(result){
	console.log('Update',result);
});


Promise.join(
  add({
		"id": "77F98450-DBB2-B177-43D3-4386BF359AC3",
		"title": "Mr.",
		"sex": "F",
		"firstName": "Lance",
		"lastName": "Jefferson",
		"birthDay": "11/27/2016",
		"email": "Duis@liberoatauctor.net"
	}),
  update("77F98450-DBB2-B177-43D3-4386BF359AC3",{email:"xxxx@xxxx.xxx"}),
  search({id:"77F98450-DBB2-B177-43D3-4386BF359AC3"}),
  function (added, updated, searched) {
  	console.log('added',added)
  	console.log('updated',updated)
  	console.log('search',searched);
    return ;
  }
);


*/
function car(){
	var isStarted = false;
	this.start = function(){
		var deferred = Promise.pending();
		if(isStarted){
	        deferred.reject('Error:Already Started!');
	    }
	    else{
	    	isStarted = true;
	    	console.log('Started Engine');
	    	deferred.resolve('Started Engine');
	    }
	    return deferred.promise;
	}


	this.stop = function(){
		var deferred = Promise.pending();
		if(!isStarted){
	        deferred.reject('Error:Not Start yet!');
	    }
	    else{
	    	isStarted = false;
	    	console.log('Stopped Engine');
	    	deferred.resolve('Stopped Engine');
	    }
	    return deferred.promise;
	}

	this.forward=function(){
		var deferred = Promise.pending();

		if(!isStarted){
	        deferred.reject('Error:Not Start yet!');
	    }
	    else{
	    	isStarted = true;
	    	console.log('Go forward');
	    	deferred.resolve('Go forward');
	    }
	    return deferred.promise;
	}

	this.backward =function(){
		var deferred = Promise.pending();
		if(!isStarted){
	        deferred.reject('Error:Not Start yet!');
	    }
	    else{
	    	isStarted = true;
	    	console.log('Go backward');
	    	deferred.resolve('Go backward');
	    }
	    return deferred.promise;
	}

	this.turnleft=function(){
		var deferred = Promise.pending();
		if(!isStarted){
	        deferred.reject('Error:Not Start yet!');
	    }
	    else{
	    	isStarted = true;
	    	console.log('Turn left');
	    	deferred.resolve('Turn left');
	    }
	    return deferred.promise;
	}

	this.turnright=function(){
		var deferred = Promise.pending();
		if(!isStarted){
	        deferred.reject('Error:Not Start yet!');
	    }
	    else{
	    	isStarted = true;
	    	console.log('Turn right');
	    	deferred.resolve('Turn right');
	    }
	    return deferred.promise;
	}

}

var mycar = new car();

mycar.start()
.then(mycar.forward)
.then(mycar.turnleft)
.then(mycar.turnright)
.then(mycar.backward)
.then(mycar.stop);
