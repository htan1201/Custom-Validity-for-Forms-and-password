/*
Your code goes here!
 */

/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
Grabbing a few inputs to help you get started...
 */
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

//use IssueTracker function to format validation messages
function IssueTracker() {
    this.issues = [];
}

IssueTracker.prototype = {
    add: function(issue) {
        this.issues.push(issue);
        console.log("issue pushed")
    },
    retreive: function() {
        var message = "";
        switch (this.issues.length) {
            case 0:
                //do nothing because message is already ""
                break;
            case 1:
                //if there is only 1 issue
                message = "Please correct the following issue:\n" + this.issues[0];
                break;
            default:
                //if there are more issues, join them as a group
                message = "Please correct the following issue:\n" + this.issues.join("\n");
                break;
        }
        return message;
    }
}

/*
You'll probably find this function useful...
 */  
submit.onclick = function () {
    //grab the values of the input
    var firstPw = firstPasswordInput.value;
    var secondPw = secondPasswordInput.value;

    //make a new instance of issue tracker on both inputs as there are some that has to be on second and some has to be on the first input.
    var firstInputIssueTracker = new IssueTracker();
    var secondInputIssueTracker = new IssueTracker();

    //check the requirements for botht the inputs
    function checkRequirements() {
        //if the length of the password is less than 16 and more than 100 characters
        if (firstPw.length < 16) {
            firstInputIssueTracker.add("less than 16 characters");
        } else if (firstPw.length > 100) {
            firstInputIssueTracker.add("greater than 100 characters");
        }

        //if there are no symbols used in the first password
        if (!firstPw.match(/[\!\@\#\$\%\^\&\*]/g)) {
            firstInputIssueTracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
        }
        
        //if the first password does not match the criteria of having at least 1 number
        if (!firstPw.match(/\d/g)) {
            firstInputIssueTracker.add("missing a number");
        }
        
        //if the first password does not match the criteria of having at least 1 lowercase letter
        if (!firstPw.match(/[a-z]/g)) {
            firstInputIssueTracker.add("missing a lowercase letter");
        }

        //if the first password does not match the cirteria of having at least 1 uppercase letter
        if (!firstPw.match(/[A-Z]/g)) {
            firstInputIssueTracker.add("missing an uppercase letter");
        }

        //variable illegal char group match whether the first password matches anything outside the scope that is defined
        var illegalCharGroup = firstPw.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
        //if it is true(if there are illegal characters), print out an error message for each illegal character as an issue
        if (illegalCharGroup) {
            illegalCharGroup.forEach (function (illegalChar){
                firstInputIssueTracker.add("illegal: " + illegalChar);
            })
        }
    };

    //if the first password and second password match and first password is not empty
    if (firstPw === secondPw && firstPw.length > 0) {
        checkRequirements();
        console.log("password match")
    } else {
        secondInputIssueTracker.add("Passwords must match!");
    }

    var firstInputIssues = firstInputIssueTracker.retreive()
    var secondInputIssues = secondInputIssueTracker.retreive()

    firstPasswordInput.setCustomValidity(firstInputIssues);
    secondPasswordInput.setCustomValidity(secondInputIssues);
};