var useLocalStorage = false;

function switchUseLS(){
    useLocalStorage = !useLocalStorage;
}

window.isOnline = () => this.navigator.onLine;
const getById = (id) => document.getElementById(id);

// REST
class ServerService {
    async sendToServer(data) {
        try {
            await fetch('/news', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error('Cannot fetch data: ', error);
        }
    }

    async getFromServer() {
        try {
            const data = await fetch('/news/all');
            return data.text();
        } catch (error) {
            console.error('Cannot fetch data: ', error);
        }
    }
}
//

const newsContainer = getById('content_news');

class News{
    constructor(title, body, picture){
        this.title = title;
        this.body = body;
        this.picture = picture;
    }
}

function newsTemplate(news) {
    var title = news.title;
    var body = news.body;
    var picture = news.picture;
    var button = document.createElement('input');

    button.type  = 'button';
    button.addEventListener('click', function() {
        alert(add);
    }, false);

    return `
<div class="col-lg-3 col-md-9 col-xs-10 col-sm-10 border marg-right">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsGwzTyLm-YvZEM2n8d9nTinG2LNpwiEyvxW2B9mcXNFwCq5YMRA&s">
            <p class="news">${title}</p>
            <p>${body}</p>
        </div>
`
}

function myFunction() {
    if(useLocalStorage){
        localStorage.clear();
        alert("Вашу новину видалено успішно!");
        location.reload();
        show();
    }
    else {
        window.indexedDB.deleteDatabase("news_data");
        location.reload();
        show();
    }
}

// function show(){
//   if(useLocalStorage){
//   const data = localStorage.getItem('news_data');

//   if (!isOnline()) return;

//   if (!data) {
//     console.log('No available local data found');
//   } else {
//     JSON.parse(data).forEach(({ title, body, picture }) => {
//         console.log(title, body);
//         var tempNews = new News(title, body, picture);
//         $('#content_news').append(
//           newsTemplate(tempNews),
//         );
//     });
//   }
//   }
//   else if (!isOnline()) return;

//   else {
//     var openDB = indexedDB.open("news_data", 1);
//     openDB.onupgradeneeded = function() {
//         var db = openDB.result;
//         var store = db.createObjectStore("news", {keyPath: "title"});
//         store.createIndex("title", "title", { unique: false });
//         store.createIndex("body", "body", { unique: false });
//         store.createIndex("picture", "picture", { unique: false });
//     }
//     openDB.onsuccess = function(event) {
//       var db = openDB.result;
//       var tx = db.transaction("news", "readwrite");
//         var store = tx.objectStore("news");
//         store.openCursor().onsuccess = function(event) {
//         var cursor = event.target.result;

//         if (cursor) {
//           var tempNews = new News(cursor.value.title, cursor.value.body, cursor.value.picture);
//           //console.log(tempFeed);
//           //feedbacks.push(tempFeed);
//           $('#content_news').append(
//             newsTemplate(tempNews),
//           );
//           cursor.continue();
//         }
//       };
//         tx.oncomplete = function(){
//           db.close();
//         }
//     }
//   }
// }

//REST
const service = new ServerService();

const initAndRenderData = async () => {
    const items = await service.getFromServer();
    console.log(items);

    const itemsStringified = JSON.stringify(items);

    JSON.parse(items).forEach(({ title, body, picture }) => {
        var tempNews = new News(title, body, picture);
        $('#content_wrapper_news').append(
            newsTemplate(tempNews),
        );
    });
}

const onOnline = () => {
    initAndRenderData();
    console.log('Network status: online');
}

const onOffline = () => {
    console.log('Connection lost');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);






/*function showTasks(){
  var lsLen = localStorage.length;
  if(lsLen > 0){
      for(var i = 0; i < lsLen; i++){
          var key = localStorage.key(i);
          if(key.charAt(0) == "s") {
              if(localStorage.getItem(key)!=null) {
                  $('        <div class="col-lg-3 col-md-9 col-xs-10 col-sm-10 border toDel marg-right">\n' +
                      '            <img  style="width: 100%" src="'+ localStorage.getItem(key) +'">\n' +
                      '            <p class="news">'+ localStorage.getItem("title"+key.slice(3))+'</p>\n' +
                      '            <p>'+ localStorage.getItem("inf"+key.slice(3))+'</p>\n' +
                      '           <button type="button" class="btn btn-danger delete w-100">Delete</button>  \n' +
                      '        </div>').addClass('tdItem')
                      .attr('data-itemid', key)
                      .addClass('tdItem')
                      .appendTo($(".main"));
              }
          }
      }
  }
}


window.onload = function(){

  if (navigator.onLine){
     $("#result").css("display", "inline");
     showTasks();
  }else{
    $("#result").css("display", "none");

  }
  


$(document).on('click','.delete', function(e){
  var jet = $(e.target);
  localStorage.removeItem($(".toDel").attr('data-itemid'));
  var num = $(".toDel").attr('data-itemid').slice(3);
  localStorage.removeItem("title"+num);
  localStorage.removeItem("inf"+num);
  $(this).closest(".toDel").remove();
  jet.remove();
  window.location.reload();

});

}   */

/*
var useLocalStorage = false;

var on = navigator.onLine;
    var useLocalStorage = false;
    if(useLocalStorage) {
      if(!on){
      function showTasks() {
        var lsLen = localStorage.length;
        if (lsLen > 0) {
            for (var i = 0; i < lsLen; i++) {
                var key = localStorage.key(i);
                if (key.charAt(0) == "s") {
                    if (localStorage.getItem(key) != null) {
                        $('        <div class="col-lg-3 col-md-9 col-xs-10 col-sm-10 bg-white border toDel marg-right">\n' +
                            '            <img  style="width: 100%" src="' + localStorage.getItem(key) + '">\n' +
                            '            <p class="news">' + localStorage.getItem("title" + key.slice(3)) + '</p>\n' +
                            '            <p>' + localStorage.getItem("inf" + key.slice(3)) + '</p>\n' +
                            '           <button type="button" class="btn btn-danger delete w-100">Delete</button>  \n' +
                            '        </div>').addClass('tdItem')
                            .attr('data-itemid', key)
                            .addClass('tdItem')
                            .appendTo($(".main"));
                    }
                }
            }
        }
    }
      $(document).on('click', '.delete', function (e) {
        var jet = $(e.target);
        localStorage.removeItem($(".toDel").attr('data-itemid'));
        var num = $(".toDel").attr('data-itemid').slice(3);
        localStorage.removeItem("title" + num);
        localStorage.removeItem("inf" + num);
        $(this).closest(".toDel").remove();
        jet.remove();
        window.location.reload();

    });


    }




  } else {

    if (on) {
      window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

      window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
      window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

      if (!window.indexedDB) {
          console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      }
      let db;

      init();

      async function init() {
          db = await idb.openDb('adminDb', 1, db => {
              db.createObjectStore('admin', {keyPath: 'name'});
          });

          list();
      }

      async function list() {
          let tx = db.transaction('admin');
          let Store = tx.objectStore('admin');

          let addmin = await Store.getAll();


          $("#content_wrapper_news").append(addmin.map(addmin => '            <div href="#" class="col-lg-4 col-md-6 col-sm-12 news_table">\n' +
              '                <img class="news-img" src="img/news1.jpg" alt="Горшенёв">\n' +
              '                <p class="bigrf rozmir">' +addmin.name+'</p>\n' +
              '                <p class="rozmir">'+addmin.comment+'</p>      \n' +
              '            </div>').join(''));


      }

      async function clearAppeals() {
          let tx = db.transaction('admin', 'readwrite');
          await tx.objectStore('admin').clear();
          await list();
      }

      async function addAppeal() {
          let name = document.getElementById('title').value;
          let comment = document.getElementById('comment').value;
          let now = new Date();

          let tx = db.transaction('admin', 'readwrite');
          document.getElementById('title').value = '';
          document.getElementById('comment').value = '';
          try {
              await tx.objectStore('admin').add({name, comment, now});
              await list();
          } catch (err) {
              if (err.name == 'ConstraintError') {
                  alert("This appeal is live");
                  await addAppeal();
              } else {
                  throw err;
              }
          }
      }

}

  }

*/
