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


function createUser() {
    let Console = document.getElementById("console")
    let name = document.getElementById("name").value
    let pass = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(name, pass)
        .then((userCredential) => {
            Console.innerText = ("User created successfully")

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



function favSites() {
    var plusButton = document.createElement('div');
    plusButton.innerHTML = 'Add+';
    plusButton.style.cssText = 'float:left;font-size:20px;padding:10px;cursor:pointer;color;red;';
    document.body.appendChild(plusButton);

    plusButton.onclick = function () {
        newLink = prompt("Enter url")
        var newLinkElement = document.createElement('div');
        newLinkElement.id = "links"
        var favicon = document.createElement('img');
        favicon.src = 'https://www.google.com/s2/favicons?domain=' + newLink;
        newLinkElement.innerHTML = '<div id="links"><br><a href="' + newLink + ' contenteditable=true">' + newLink + '</a></div>';
        document.body.appendChild(favicon);
        document.body.appendChild(newLinkElement);



    };
}

function signIn() {
    let console = document.getElementById("console")
    let email = document.getElementById("name").value
    let password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            var user = userCredential.user;
            localStorage.setItem("loggedIn", true)
            var user = firebase.auth().currentUser;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    /*  window.location = "note.html" */
                    document.getElementById("logindiv").hidden = true
                    GetSites(email)
                    alert("welcome " + user.email)

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

function Todo(element) {
    console.log(element)
    let todo = document.getElementById('p' + element)
    let checker = document.querySelector(".todo" + element)


    checker.addEventListener("change", (e) => {
        if (e.target.checked) {
            console.log("checked")
            todo.style.textDecoration = "line-through";
            note.editnote(element)
            console.log("Checkbox is checked..");
        } else {
            console.log("Checkbox is not checked..");
            todo.style.textDecoration = "none";
            note.editnote(element)
        }

    })
}

function logout() {
    var user = firebase.auth().currentUser
    if (user) {
        firebase.auth().signOut().then(() => {
            window.location.href = "index.html"
            window.document.title = "Signed Out"
        })
    } else {

    }
}
function SaveSites(object) {
    const d = new Date();
    let time = d.getTime();
    var user = firebase.auth().currentUser;

    db.collection(user.email).doc("site").set({
        object
    })

        .then(() => {
            console.log("Document successfully written!");

        })
        .catch((error) => {
            console.innerText = error
            window.document.title = error
            console.error("Error writing document: ", error);
        });

}


function createData(blogTitle, blogContent, blogTime, task) {
    const d = new Date();
    let time = d.getTime();
    var user = firebase.auth().currentUser;

    db.collection(user.email).doc("time" + time).set({

        noteID: blogTitle,
        noteContent: blogContent,
        Time: blogTime,
        Completed: task,

    })

        .then(() => {
            console.log("Document successfully written!");

        })
        .catch((error) => {
            console.innerText = error
            window.document.title = error
            console.error("Error writing document: ", error);
        });

}


function readData() {
    var user = firebase.auth().currentUser;
    let docRef = db.collection(user.email).doc("site");
    docRef.get().then((doc) => {

        if (doc.exists) {
            console.log("Document data:", doc.data().url);
        } else {

            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}


async function findData() {
    var user = firebase.auth().currentUser;

               
        const data = db.collection(user.email).doc("site").get()
            .then(doc => {
                if (doc.exists) {
                    console.log(doc.data().object);
                    for (var i = 0; i < doc.data().object.length; ++i) {
                      console.log(doc.data().object[i].url + " " + doc.data().object[i].name)
                   

                    }
                } else {
                    console.log("No document found.");
                };
            });
        return data;

           
        
   

}





function escapeHTML(str) {
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var email = user.email;
      

    } else {
        if (window.location == "note.html") {
            window.document.title = "Not Signed in"
            window.location.href = "index.html"
            document.write("Not Signed in")
        }

        console.log('Not signed in')
    }
})


