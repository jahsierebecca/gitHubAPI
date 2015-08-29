/////////////GITHUB API ///////////////

var url = 'https://api.github.com/users/jahsierebecca';
// var url = 'https://api.github.com/repos/CozyCo/slack-post/issues';

//In lieu of using moment to sort things I just used the Github API sort option.
var data = {
	state: 'all',
	sort: 'updated'
}

//Initiates the API call
function go() {
	$.ajax(url, { data: data, dataType: 'jsonp' })
	.then(function(data, status, xhr) {
		showIssues(data, status, xhr);
		ko.applyBindings(viewModel);
		console.log(data);
		console.log("buttz");
		console.log(data.data.followers);
	});
}

$(go);

//Pulls the data from the call
function showIssues(data,status,xhr) {
	var info = data.data;
	console.log(info);
		var issue = new Issue(info);
		viewModel.issues.push(issue);
	// data.data.forEach(displayItem);
}

//Breaks the data into individual items. Sends them to Knockout.
// function displayItem(item) {
// 	// var issue = new Issue(item);
// 	// viewModel.issues.push(issue);
// }

// Define the Issue class that will create each instance
var Issue = function(issue) {
	var user = issue;
	if (user.bio === null) {
		this.bio = "No user bio"
	} else {
		this.bio = user.bio;
	}
	if (user.company === null) {
		this.company = "N/A"
	} else {
		this.company = user.company;
	}
	if (user.blog === null) {
		this.blog = "N/A"
	} else {
		this.blog = user.blog;
	}
	this.username = user.login;
	this.url = user.html_url;	
	this.gravatar = user.avatar_url;
    this.repos = user.public_repos;
 	this.followers = user.followers;
 	//In case of no description
 	// if (issue.body == "") {
 	// 	this.descrip = "No description provided";
 	// } else {
 	// 	this.descrip = issue.body;
 	// }
 	//Prep for add issue functionality
 	// console.log(issue)
    // this.addIssue = function() {
    //     this.info.push("New issue");
    // }.bind(this);
}
 
//Model for KO to use to render things in the DOM
var viewModel = {
    issues: [],
};
//# sourceMappingURL=main.js.map