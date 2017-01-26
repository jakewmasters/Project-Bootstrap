isLoggedIn();

function isLoggedIn(){
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function() {
		 //console.log("server response = ", this.response[0]);
         var status = this.response[0].status;
		 var username = this.response[0].username;
		 var notification = document.getElementById("notification");
         if ( status == true ) {
			notification.innerHTML = "Found Current Account Session for "+"'"+username+"'";
			document.getElementById("loggedIn").innerHTML = "Logged in as: "+username;
			document.getElementById("logoutButtonDiv").style.display = "block";
			document.getElementById("usernameDiv").style.display = "none";
			document.getElementById("welcomeOptionsDiv").style.display = "none";
			document.getElementById("usernameInput").value = username;
			if (username == "admin") {
				buildTable();
				document.getElementById("usernameInput").value = "";
				document.getElementById("deleteAccountDiv").style.display = "block";
			}
		 }
	});
	ajax.open('GET', '//cse.taylor.edu/~cos143/sessions.php');
	ajax.send();
}

function createAccount(){
  var username = document.getElementById("usernameInput").value;
  var password = document.getElementById("passwordInput").value;
  var loginInfo = "Name=" + username +
	             "&Password=" + password;
  var ajax = new XMLHttpRequest();
  var notification = document.getElementById("notification");
  if (document.getElementById("usernameInput").style.backgroundColor == "green"
      && document.getElementById("passwordInput").style.backgroundColor == "green") {
		ajax.responseType = "json";
		ajax.addEventListener("load", function() {
			var status = this.response[0].status
			if ( status == true ) {
				notification.innerHTML = "Account '"+username+"' Created";
				document.getElementById("registerButtonDiv").style.display = "none";
				document.getElementById("loginButtonDiv").style.display = "block";
			}
			else {
			notification.innerHTML = "Account Already Exists";
			}
		} );
		ajax.open('POST', '//cse.taylor.edu/~cos143/users.php');
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(loginInfo);
	}
	else {
		notification.innerHTML = "Account NOT Created - Invalid Characters Found";
	}
}

function login() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    var params = "Name="+ username + "&Password=" + password;
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function() {
         var status = this.response[0].status;
		 var message = this.response[0].message;
		 var notification = document.getElementById("notification");
         if ( status == true ) {
			notification.innerHTML = "Login Successful";
			document.getElementById("loggedIn").innerHTML = "Logged in as: "+username;
			document.getElementById("logoutButtonDiv").style.display = "block";
			document.getElementById("loginButtonDiv").style.display = "none";
			document.getElementById("usernameDiv").style.display = "none";
			document.getElementById("changePasswordDiv").style.display = "block";
			if (username == "admin") {
				buildTable();
				notification.innerHTML = "Logged in as admin. Search for an account in the box below to delete it.";
				document.getElementById("usernameInput").value = "";
				document.getElementById("passwordInput").value = "";
				document.getElementById("passwordDiv").style.display = "none";
				document.getElementById("changePasswordDiv").style.display = "none";
				document.getElementById("deleteAccountDiv").style.display = "block";
			}
         }
         else {
           notification.innerHTML = "Login Failed - Invalid Credentials";
         }
    } );
	ajax.open('POST', '//cse.taylor.edu/~cos143/sessions.php');
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(params);
}

function logout() {
	var params = "method=DELETE";
	var ajax = new XMLHttpRequest();
	var username = document.getElementById("usernameInput").value;
	ajax.responseType = "json";
	ajax.addEventListener("load", function() {
		 var status = this.response[0].status;
		 var notification = document.getElementById("notification");
		 if ( status == true ) {
			document.getElementById("loggedIn").innerHTML = "Not Logged In";
			notification.innerHTML = "User Logged Out";
			document.getElementById("deleteAccountDiv").style.display = "none";
			document.getElementById("logoutButtonDiv").style.display = "none";
			document.getElementById("changePasswordDiv").style.display = "none";
			document.getElementById("loginButtonDiv").style.display = "block";
			document.getElementById("loginDiv").style.display = "block";
			document.getElementById("usernameDiv").style.display = "block";
			document.getElementById("passwordDiv").style.display = "block";
			if (document.getElementById("deleteTable").style.display == "block"){
				document.getElementById("deleteTable").style.display = "none";
			}
         }
         else {
           notification.innerHTML = "Unable To Log Out";
         }
    } );
	ajax.open('POST', '//cse.taylor.edu/~cos143/sessions.php');
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(params);
}
function changePassword(user,pass) {
	//if (user == null && pass == null) {
		var username = document.getElementById("usernameInput").value;
		var password = document.getElementById("passwordInput").value;
	//}
	//else {
		var params = "Name="+ username + "&Password=" + password+"&method=PUT";
		if (document.getElementById("passwordInput").style.backgroundColor == "green") {
			var ajax = new XMLHttpRequest();
			ajax.responseType = "json";
			ajax.addEventListener("load", function() {
				 var status = this.response[0].status;
				 var notification = document.getElementById("notification");
				 if ( status == true ) {
					notification.innerHTML = "Password Successfully Changed";
				 }
				 else {
				   notification.innerHTML = "Password NOT Changed";
				 }
			} );
			ajax.open('POST', '//cse.taylor.edu/~cos143/users.php');
			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.send(params);
		}
		else{
			notification.innerHTML = "Password NOT Changed - Invalid Characters Found";
		}
	//}
}


function showLogin(){
    document.getElementById("loginDiv").style.display = "block";
    document.getElementById("loginButtonDiv").style.display = "block";
    document.getElementById("welcomeOptionsDiv").style.display = "none";
}
function showRegister(){
    document.getElementById("loginDiv").style.display = "block";
    document.getElementById("registerButtonDiv").style.display = "block";
    document.getElementById("welcomeOptionsDiv").style.display = "none";
}
function validate(field) {
	var valid = /^[a-zA-Z0-9]+$/.test(field.value);
	if( valid ) {
		field.style.backgroundColor = "green";
		if (field.id=="usernameInput"){
			document.getElementById("usernameMessage").innerHTML = "Username OK";
			document.getElementById("usernameMessage").style.color = "darkgreen";
		}
		else if (field.id=="passwordInput"){
			document.getElementById("passwordMessage").innerHTML = "Password OK";
			document.getElementById("passwordMessage").style.color = "darkgreen";
		}
		else if (field.id=="deleteAccInput"){
			document.getElementById("delAccMessage").innerHTML = "Username OK";
			document.getElementById("delAccMessage").style.color = "darkgreen";
		}
	} else {
		field.style.backgroundColor = "red";
		if (field.id=="usernameInput"){
			document.getElementById("usernameMessage").innerHTML = "Username not OK";
			document.getElementById("usernameMessage").style.color = "darkred";
		}
		else if (field.id=="passwordInput"){
			document.getElementById("passwordMessage").innerHTML = "Password not OK";
			document.getElementById("passwordMessage").style.color = "darkred";
		}
		else if (field.id=="deleteAccInput"){
			document.getElementById("delAccMessage").innerHTML = "Username not OK";
			document.getElementById("delAccMessage").style.color = "darkred";
		}
	}
}
function deleteAccount(){
	var username = document.getElementById("deleteAccInput").value;
	var params = "method=delete&Name="+username;
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function() {
		 var status = this.response[0].status;
		 var notification = document.getElementById("notification");
		 if ( status == true ) {
			notification.innerHTML = "Account '"+username+"' Successfully Deleted";
         }
         else {
           notification.innerHTML = "Failed Attempt at Deleting Account (Invalid Account)";
         }
    } );
	ajax.open('POST', '//cse.taylor.edu/~cos143/users.php');
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(params);
}

function deleteUsername(username){
	console.log(username);
	if (! username) {
		username = document.getElementById("deleteAccInput").value;
	}
	var params = "method=delete&Name="+username;
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function() {
		 var status = this.response[0].status;
		 var notification = document.getElementById("notification");
		 if ( status == true ) {
			notification.innerHTML = "Account '"+username+"' Successfully Deleted";
         }
         else {
           notification.innerHTML = "Failed Attempt at Deleting Account (Invalid Account)";
         }
    } );
	ajax.open('POST', '//cse.taylor.edu/~cos143/users.php');
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(params);
}

//var className = document.getElementsByClassName("deleteButton");
//addEventListener("click", function(){


function buildTable(){
	setTimeout(function(){
	var table = document.getElementById("deleteTable");
	while(table.rows.length > 0) {
		table.deleteRow(0);
	}
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function() {
		var listOfUsers = this.response;
		for (var index=1;index<listOfUsers.length;index++){
			document.getElementById("deleteTable").style.display = "block";
			//console.log(listOfUsers[index]);
			var username = listOfUsers[index].Name;
			var searchVal = document.getElementById("deleteAccInput").value;
			//console.log(username);
			//console.log(searchVal);
			if (username.includes(searchVal) || searchVal=="") {
				// Create an empty <tr> element and add it to the 1st position of the table:
				var row = deleteTable.insertRow(-1);

				// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				//var cell3 = row.insertCell(2);
				// Add some text to the new cells:
				cell1.innerHTML = username;
				//cell2.innerHTML = "<button class='changePassword'>Change Password</button>";
				username = "'"+username+"'";
				var cell2HTML = '<button class="deleteButton" onclick="deleteUsername('+username+');buildTable()"><span class="btn-xs btn-danger">Delete</span></button>';
				cell2.innerHTML = cell2HTML;
			}
		}

	} );
	ajax.open('GET', '//cse.taylor.edu/~cos143/users.php',true);
	ajax.send();
	},1000);

	//for(var i=0; i<deleteTable.rows.length; i++){
	//	deleteTable.rows[i].cells[1].addEventListener("click", deleteUser);
	//	console.log("added listener for rows["+i+"]cells[1]");
	//}
}
