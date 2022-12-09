firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var user = firebase.auth().currentUser;
        let email = user.email
        note.displayPosts(email);

    } else {
        if (!window.location == "index.html") {
            window.location.href = "index.html"
            window.document.title = "Please sign in"
        }

    }

})



let note = {

    savenote: function () {


        try {
            let blogTime = Date()
            createData("editMe", "edit me", blogTime, false)
            note.displayPosts();
        } catch (err) {
            window.document.title = err
        } finally {

        }

    },




    async displayPosts() {
        /* in this function we data aka document an display it using inner html */
        var user = firebase.auth().currentUser;

        if (user) {
            const colRef = db.collection(user.email + "note");
            let builder = '';
            try {
                const docsSnap = await colRef.get();

                docsSnap.forEach(doc => {
                    let noteData = doc.data()
                    let text = doc.data().content;
                    let chk = doc.data().Completed
                    let lt = "style="
                    console.log(chk)
                    if (chk === true) {
                        lt = 'style="text-decoration: line-through;"'
                        chk = "checked=true"
                    } else {
                        chk = ""
                    }
                    builder += '<div class="card text-center">'

                    builder += '<button width="10%" contenteditable="false" class="bs" id=' + doc.id + ' onclick="note.editnote(this.id)">Save</button>'
                    builder += '<input type="checkbox" id=' + doc.id + " " + 'class="todo' + doc.id + '" name="todo" onclick="Todo(this.id)" ' + chk + '">'
                    builder += '<label class="todo" for="todo">Set as task done</label>'
                    builder += '<div class="card-header" contenteditable="true" id=h' + doc.id + '>' + escapeHTML(noteData.noteID)

                    builder += '</div>'
                    builder += '<div class="card-body">'

                    builder += '<p class="card-text" ' + lt + ' + id=p' + doc.id + ' contenteditable=true>' + escapeHTML(noteData.noteContent) + '</p>'
                    builder += '</div>'
                    builder += '<div class="card-footer text-muted">' + noteData.Time
                    builder += '<br>'

                    builder += '</div>'
                    builder += '</div>'

                    console.log(doc.data());
                    console.log(doc.id);
                    document.querySelector("#blogList").innerHTML = builder;
                })
            } catch (error) {
                console.log(error);


            }

        }
    },

    editnote(element) {
        /* this functions is used to edit/update the blog post */
        var user = firebase.auth().currentUser;
        const d = new Date();
        console.log(element)

        let editingTitle = document.getElementById("h" + element);
        let editingBody = document.getElementById("p" + element);
        let isTodo = document.querySelector('.todo' + element)
        console.log(editingBody.innerText);
        console.log(editingTitle.innerText);
        console.log(isTodo.checked);

        let updater = db.collection(user.email + "note").doc(element)
        updater.update("noteID", editingTitle.innerText)
        updater.update("noteContent", editingBody.innerText)
        updater.update("Time", "Edited " + d)
        if (isTodo.checked) {
            updater.update("Completed", true)
            console.log("checked")
        } else {
            updater.update("Completed", false)
        }

        PlaySound()
    },
    delnote(element) {
        var user = firebase.auth().currentUser;
        const d = new Date();
        console.log(element)

        let editingTitle = document.getElementById("h" + element);
        let editingBody = document.getElementById("p" + element);
        let isTodo = document.querySelector('.todo' + element)
        console.log(editingBody.innerText);
        console.log(editingTitle.innerText);
        console.log(isTodo.checked);

        let updater = db.collection(user.email).doc(element)
        updater.delete("noteID", editingTitle.innerText)
        updater.delete("noteContent", editingBody.innerText)
        updater.delete("Time", "Edited " + d)
        if (isTodo.checked) {
            updater.delete("Completed", true)
            console.log("checked")
        } else {
            updater.update("Completed", false)
        }


    },

}





function Todo(element) {
    console.log(element)
    let todo = document.getElementById('p' + element)
    let checker = document.querySelector(".todo" + element)

/* tHIS FUNCTION CHECKS TO SEE [F THE TASK HAS BEEN COMPLETED IF THE CHECKBOC IS CHECKED THEN SET THE TEXT TO LINETHROUGH*/
    checker.addEventListener("change", (e) => {
        if (e.target.checked) {
            console.log("checked")
            todo.style.textDecoration = "line-through";
            note.editnote(element)
            console.log("Checkbox is checked..");
            PlaySound()
        } else {
            console.log("Checkbox is not checked..");
            todo.style.textDecoration = "none";
            note.editnote(element)
        }

    })
}