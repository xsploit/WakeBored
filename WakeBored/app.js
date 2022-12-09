const firebaseConfig = {
    apiKey: "AIzaSyAMUOUjf6bRqoOz0CqbqzOIluDz2qsbfIU",
    authDomain: "web104-9216d.firebaseapp.com",
    projectId: "web104-9216d",
    storageBucket: "web104-9216d.appspot.com",
    messagingSenderId: "691621929308",
    appId: "1:691621929308:web:dd2980a481cdeb7cb4e199",
    measurementId: "G-G1V2S65GRV"
};
const FacebookAuth = new firebase.auth.FacebookAuthProvider();

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

PlaySound = function () {
    var audio = new Audio('taskCompleted.mp3');
    audio.loop = false;
    audio.play(); 
}
function createUser() {
    /* this function creeates a user from the login and pass word popuip login form */
    let Console = document.getElementById("console")
    let name = document.getElementById("name").value
    let pass = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(name, pass)
        .then((userCredential) => {
            Console.innerText = ("User created successfully")
            PlaySound()
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.document.title = error.message
            Console.innerText = ("Error: " + errorMessage)
        });
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {

        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });


function signIn() {
    let console = document.getElementById("console")
    let email = document.getElementById("name").value
    let password = document.getElementById("password").value
    document.getElementById("logindiv").hidden = false
    document.getElementById("myModal").hidden = false
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            var user = userCredential.user;

            var user = firebase.auth().currentUser;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    /*  window.location = "note.html" */
                    document.getElementById("logindiv").hidden = true
                    document.getElementById("myModal").hidden = true
                   
                   
                    alert("welcome " + user.email + " " + user.uid)
                    PlaySound()

                } else {
                    alert("not logged in")


                }
            })


        })
        .catch((error) => {
            window.document.title = error.message
            var errorCode = error.code;
            var errorMessage = error.message;

        });
}



function logout() {
    /* logout function */
    var user = firebase.auth().currentUser
    if (user) {
        firebase.auth().signOut().then(() => {
            window.location.href = "index.html"
            window.document.title = "Signed Out"
            PlaySound()
        })
    } else {

    }
}
function SaveSites(object) {
    /* this function i use to save all the fav sites */
    const d = new Date();
    let time = d.getTime();
    var user = firebase.auth().currentUser;

    db.collection(user.email).doc("site").set({
        object
    })

        .then(() => {
            console.log("Document successfully written!");
            PlaySound()
        })
        .catch((error) => {
            console.innerText = error
            window.document.title = error
            console.error("Error writing document: ", error);
        });

}


function createData(blogTitle, blogContent, blogTime, task) {
    /* this function is used for saving blog posts */
    const d = new Date();
    let time = d.getTime();
    var user = firebase.auth().currentUser;

    db.collection(user.email + "note").doc("time" + time).set({
/* we are saving the data like this */
        noteID: blogTitle,
        noteContent: blogContent,
        Time: blogTime,
        Completed: task,

    })

        .then(() => {
            console.log("Document successfully written!");
            PlaySound()
        })
        .catch((error) => {
            console.innerText = error
            window.document.title = error
            console.error("Error writing document: ", error);
        });

}



function escapeHTML(str) {
    /* this function escapes html and code so you cant post runable code */
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
       console.log(user.uid)
       
       if (window.location.href.indexOf = "index.html") {
        PlaySound()
console.log("logged in")
     GetSites()
    }
    } else {
        if (window.location == "note.html") {
            window.document.title = "Not Signed in"
            window.location.href = "index.html"
            document.write("Not Signed in")
        }

        console.log('Not signed in')
    }
})




