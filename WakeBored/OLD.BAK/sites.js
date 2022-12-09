

    
let link =  [{
    
                url: 'www.google.com/',
                name: '/favicon.ico'
            },
            {
    
                url: 'www.github.com/',
                name: '/favicon.ico'
            },
            {
    
                url: 'www.subsect.ca/',
                name: '/favicon.ico'
            },
            {
    
                url: 'www.youtube.com/',
                name: '/favicon.ico'
            },
            {
    
                url: 'www.facebook.com/',
                name: '/favicon.ico'
            }]
         


 function Firstrun() {
        var favSites = document.createElement('div');
        favSites.innerHTML = '<div id="FavoriteList"><center><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + link[0].url + '"id=0><p contenteditable="true">' + link[0].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + link[1].url + '"id=1><p contenteditable="true">' + link[1].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + link[2].url + '"id=2><p contenteditable="true">' + link[2].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + link[3].url + '"id=3><p contenteditable="true">' + link[3].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + link[4].url + '"id=4><p contenteditable="true">' + link[4].url + '</p></center></div';
        document.body.appendChild(favSites);
        OpenWindow()
        SaveSites(link)
}





  
    function OpenWindow() {
        var pTags = document.getElementsByTagName('p');
        var Imgs = document.getElementsByTagName('img');
        for (var i = 0; i < pTags.length; i++) {
            pTags[i].className = i

            pTags[i].addEventListener('dblclick', function () {
                console.log(this.innerText);
                if (!this.innerText.includes("http://")) {
                    let newerLink = "http://" + this.innerText

                    window.open(newerLink);
                } else {
                    newerLink = this.innerText
                    window.open(this.innerText);
                }
            });
        }
        PushSite()
    }
    /*     var pTags = document.getElementsByTagName('p');
        for (var i = 0; i < pTags.length; i++) {
            pTags[i].addEventListener('dblclick', function () {
                console.log(this.innerText);
                localStorage.setItem('link' + i, 'http://' + this.innerText);
            });
        } */
   
     


    function PushSite() {


        var favsList = document.getElementById("FavoriteList")
        var favs = favsList.getElementsByTagName('img');
        for (var i = 0; i < favs.length; i++) {
            favs[i].addEventListener('dblclick', function (e) {

           /*      console.log(link[this.id].url)
                console.log(link) */
                var fav = e.target;
                var favLink = fav.parentNode;
                console.log(favLink.innerText + "ass")
              link[this.id].url = favLink.innerText 
                SaveSites(link)
                getFav(link[this.id].url)
                console.log(this.src + 'asss ');
             
            });
        }
    }






    function getFav(Favlink) {

        var favsList = document.getElementById("FavoriteList")
        var favs = favsList.getElementsByTagName('img');
        for (var i = 0; i < favs.length; i++) {
            var favicon = favs;
            favicon.src = 'http://www.google.com/s2/favicons?domain=' + this.innerText;

        }
    }











    async function GetSites(email) {
 
      
        var user = firebase.auth().currentUser;
        window.document.title = user.email
 
        let builder = '';
                      
        const data = db.collection(user.email).doc("site").get()
        
            .then(doc => {
                if (doc.exists) {
                    console.log(doc.data().object);
                  /*   for (var i = 0; i < doc.data().object.length; ++i) { */
                     
                      var favSites = document.createElement('div');
                      favSites.innerHTML = '<div id="FavoriteList"><center><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + link[0].url + '"id=0  title="DoubleClick icon To Save link"><p contenteditable="true">' + doc.data().object[0].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + doc.data().object[1].url + '"id=1><p contenteditable="true">' + doc.data().object[1].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + doc.data().object[2].url + '"id=2  title="DoubleClick icon To Save link"><p contenteditable="true">' + doc.data().object[2].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + doc.data().object[3].url + '"id=3  title="DoubleClick icon To Save link"><p contenteditable="true">' + doc.data().object[3].url + '</p></div><div id="links"><img src="http://www.google.com/s2/favicons?domain=' + doc.data().object[4].url + '"id=4  title="DoubleClick icon To Save link"><p contenteditable="true">' + doc.data().object[4].url + '</p></center></div';
                      document.body.appendChild(favSites);
       
                         
                 
                     OpenWindow()
             
               
                     
                   

                /*     } */
                } else {
                   
                    console.log("No document found.");
                    Firstrun() 
                };
            });
        return data;
               
  


        
        }



      
            
        

        