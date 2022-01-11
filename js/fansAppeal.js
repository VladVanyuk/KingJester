// on = navigator.onLine;
// var now = new Date;
// var useLocalStorage = false;
// if(useLocalStorage) {
//     function showTasks() {
//         var lsLen = localStorage.length;
//         if (lsLen > 0) {
//             for (var i = 0; i < lsLen; i++) {
//                 var key = localStorage.key(i);
//                 if (key.charAt(0) == "n") {
//                     if (localStorage.getItem(key) != null) {
//                         $('<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 new" style="margin-top: 60px;border-top: 2px solid white; margin-left: auto; margin-right: auto;">\n' +
//                             '    <div class="row" style="margin-top: 60px">\n' +
//                             '        <div class="col-lg-2 col-md-2 borderBox" style="line-height: 1">\n' +
//                             '    <p style="font-size: 13px">' + localStorage.getItem(key) + '</p>\n' +
//                             ' <p style="font-size: 13px">' + now + '</p>' +
//                             '        </div>\n' +
//                             '        <div class="col-lg-9 col-md-9 borderBox">\n' +
//                             '           <p>' + localStorage.getItem("comment" + key.slice(4)) + '</p> \n' +
//                             '        </div>\n' +
//                             '        <div class="col-lg-1 col-md-1 ">\n' +
//                             '           <button type="button" class="btn btn-danger delete h-50">Delete</button>  \n' +
//                             '        </div>\n' +
//                             '    </div>\n' +
//                             '</div>').addClass('tdItem')
//                             .attr('data-itemid', key)
//                             .addClass('tdItem')
//                             .appendTo($("#result"));
//                     }
//                 }
//             }
//         }
//     }

//     window.onload = function () {

//         if (!on) {
//             $("#result").css("display", "inline");
//             showTasks();

//             function check() {

//                 var name = $.trim($("#name").val());
//                 var comment = $.trim($("#comment").val());
//                 if (name !== "" & comment !== "") {
//                     alert("Data sent to server")
//                 } else {
//                     alert('Fields can\'t be empty');
//                 }
//                 document.getElementById('name').value = '';
//                 document.getElementById('comment').value = '';
//             }

//             document.getElementById('add').addEventListener('click', check);

//         } else {
//             $("#result").css("display", "none");


//             showTasks();
//             var ID = 0;
//             $(".new").each(function (index, el) {
//                 var nID = $(el).attr('data-itemid').slice(4);
//                 if (nID > ID)
//                     ID = nID;
//             });

//             function add() {
//                 var now = new Date();

//                 var name = $.trim($("#name").val());
//                 var comment = $.trim($("#comment").val());
//                 var html = '<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 new" style="margin-top: 60px;border-top: 2px solid white; margin-left: auto; margin-right: auto">\n' +
//                     '    <div class="row" style="margin-top: 60px">\n' +
//                     '        <div class="col-lg-2 col-md-2 borderBox" style="line-height: 1">\n' +
//                     '    <p style="font-size: 13px">' + name + '</p>\n' +
//                     ' <p style="font-size: 13px">' + now + '</p>' +
//                     '        </div>\n' +
//                     '        <div class="col-lg-9 col-md-9 borderBox">\n' +
//                     '           <p>' + comment + '</p> \n' +
//                     '        </div>\n' +
//                     '        <div class="col-lg-1 col-md-1 ">\n' +
//                     '           <button type="button" class="btn btn-danger delete h-50">Delete</button>  \n' +
//                     '        </div>\n' +
//                     '    </div>\n' +
//                     '</div>';

//                 if (name !== "" & comment !== "") {
//                     ID++;
//                     document.getElementById('result').innerHTML += html;
//                     localStorage.setItem("name" + ID, $("#name").val());
//                     localStorage.setItem("comment" + ID, $("#comment").val());
//                 } else {
//                     alert('Fields can\'t be empty');
//                 }
//                 document.getElementById('name').value = '';
//                 document.getElementById('comment').value = '';
//                 window.location.reload();
//             }

//             document.getElementById('add').addEventListener('click', add);


//             $(document).on('click', '.delete', function (e) {
//                 var jet = $(e.target);
//                 localStorage.removeItem($(".new").attr('data-itemid'));
//                 var num = $(".new").attr('data-itemid').slice(4);
//                 localStorage.removeItem("comment" + num);
//                 $(this).closest(".new").remove();
//                 jet.remove();
//                 window.location.reload();

//             });
//         }
//     }

// }else{
//     window.onload = function () {

//         if (!on) {
//             window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//             window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
//             window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

//             if (!window.indexedDB) {
//                 console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
//             }
//             let db;

//             init();

//             async function init() {
//                 db = await idb.openDb('appealDb', 1, db => {
//                     db.createObjectStore('appeal', {keyPath: 'name'});
//                 });

//             }



//             async function clearAppeals() {
//                 let tx = db.transaction('appeal', 'readwrite');
//                 await tx.objectStore('appeal').clear();
//                 await list();
//             }

//             async function addAppeal() {
//                 let name = document.getElementById('name').value;
//                 let comment = document.getElementById('comment').value;
//                 let now = new Date();

//                 let tx = db.transaction('appeal', 'readwrite');
//                 document.getElementById('name').value = '';
//                 document.getElementById('comment').value = '';
//                 try {
//                     await tx.objectStore('appeal').add({name, comment, now});
//                 } catch (err) {
//                     if (err.name == 'ConstraintError') {
//                         alert("This appeal is live");
//                         await addAppeal();
//                     } else {
//                         throw err;
//                     }
//                 }
//             }

//             window.addEventListener('unhandledrejection', event => {
//                 alert("Error: " + event.reason.message);
//             });
//             document.getElementById('add').addEventListener('click', addAppeal);
//         }
//         else {

//             window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//             window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
//             window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

//             let db;


//             init();

//             async function init() {
//                 db = await idb.openDb('appealDb', 1, db => {
//                     db.createObjectStore('appeal', {keyPath: 'name'});
//                 });

//                 list();
//             }

//             async function list() {
//                 let tx = db.transaction('appeal');
//                 let Store = tx.objectStore('appeal');

//                 let appeal = await Store.getAll();



//                 listElem.innerHTML = appeal.map(appeall => '<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 new" style="margin-top: 60px;border-top: 2px solid white; margin-left: auto; margin-right: auto">\n' +
//                     '    <div class="row" style="margin-top: 60px">\n' +
//                     '        <div class="col-lg-2 col-md-2 borderBox" style="line-height: 1">\n' +
//                     '    <p style="font-size: 13px">' + appeall.name + '</p>\n' +
//                     ' <p style="font-size: 13px">' + appeall.now + '</p>' +
//                     '        </div>\n' +
//                     '        <div class="col-lg-9 col-md-9 borderBox">\n' +
//                     '           <p>' + appeall.comment + '</p> \n' +
//                     '        </div>\n' +
//                     '        <div class="col-lg-1 col-md-1 ">\n' +
//                     '           <button type="button" class="btn btn-danger delete h-50">Delete</button>  \n' +
//                     '        </div>\n' +
//                     '    </div>\n' +
//                     '</div>').join('');


//             }

//             function check() {
//                 var name = $.trim($("#name").val());
//                 var comment = $.trim($("#comment").val());
//                 if (name !== "" & comment !== "") {
//                     alert("Data sent to server")
//                 } else {
//                     alert('Fields can\'t be empty');
//                 }
//                 document.getElementById('name').value = '';
//                 document.getElementById('comment').value = '';
//             }
//             document.getElementById('add').addEventListener('click', check);
//         }
//     }
// }


var useLocalStorage = true;

    function switchUseLS(){
        useLocalStorage = !useLocalStorage;
    }

    window.isOnline = () => this.navigator.onLine;

    const getById = id => document.getElementById(id);

    // REST
    class ServerService {
        async sendToServer(data) {
            try {
                await fetch('/feedbacks', {
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
                const data = await fetch('/feedbacks/all');
                return data.text();
            } catch (error) {
                console.error('Cannot fetch data: ', error);
            }
        }
    }
    //

    const feedbackContainer = getById('container');
    const form = getById('form');
    const namearea = getById('name');
    const textarea = getById('comment');

    class Feedback{
        constructor(name, text, date, time){
            this.name = name;
            this.text = text;
            this.date = date;
            this.time = time;
        }
    }

    function feedbackTemplate(feedback) {
        var name = feedback.name;
        var text = feedback.text;
        var date = feedback.date;
        var time = feedback.time;

        return `
 <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12" style="margin-top: 60px;border-top: 2px solid white; margin-left: auto; margin-right: auto">
    <div class="row" style="margin-top: 60px">
        <div class="col-lg-2 col-md-2 borderBox" >
                    <p style="font-size: 13px"> ${name} </p>
            <p style="font-size: 13px"> ${time} </p>
            <p style="font-size: 13px"> ${date}</p>
        </div>
        <div class="col-lg-10 col-md-10 borderBox">
            <p id="p">${text}</p>
        </div>
    </div>
</div>
`
    }

    //REST
    const service = new ServerService();

    const initAndRenderData = async () => {
        const items = await service.getFromServer();
        console.log(items);

        const itemsStringified = JSON.stringify(items);

        JSON.parse(items).forEach(({ name, text, date, time }) => {
            var tempFeedback = new Feedback(name, text, date, time);
            $('#result').before(
                feedbackTemplate(tempFeedback),
            );
        });
        // if(useLocalStorage){
        //     if (isOnline()) return;
        //     const data = localStorage.getItem('feedbacks-data');

        //     if (!data) {
        //       console.log('Нема доступних локальних даних');
        //     } else {
        //       JSON.parse(data).forEach(({ title, value, date, time }) => {
        //           var tempFeedback = new Feedback(title, value, date, time);
        //           $('#container').prepend(
        //           feedbackTemplate(tempFeedback),
        //           );
        //       });
        //     }
        // } else {
        //     var openDB = indexedDB.open("feedbacks-data", 1);
        //     openDB.onupgradeneeded = function() {
        //         var db = openDB.result;
        //         var store = db.createObjectStore("feedbacks", {keyPath: "name"});
        //         store.createIndex("name", "name", { unique: false });
        //         store.createIndex("text", "text", { unique: false });
        //         store.createIndex("date", "date", { unique: false });
        //         store.createIndex("time", "time", { unique: false });
        //     }
        //     openDB.onsuccess = function(event) {
        //       var db = openDB.result;
        //       var tx = db.transaction("feedbacks", "readwrite");
        //         var store = tx.objectStore("feedbacks");
        //         store.openCursor().onsuccess = function(event) {
        //         var cursor = event.target.result;

        //         if (cursor) {
        //           var tempFeed = new Feedback(cursor.value.name, cursor.value.text, cursor.value.date, cursor.value.time);
        //             //console.log(tempFeed);
        //             //feedbacks.push(tempFeed);
        //             $('#container').prepend(feedbackTemplate(tempFeed));
        //             cursor.continue();
        //         }
        //       };
        //         tx.oncomplete = function(){
        //           db.close();
        //         }
        //     }
        // }
    }

    function writeLocally(feedback){
        if(useLocalStorage){
            const item = localStorage.getItem('feedbacks-data')
            let data = item ? JSON.parse(item) : [];
            data.push(feedback);
            localStorage.setItem('feedbacks-data', JSON.stringify(data));
        }
        else {
            var openDB = indexedDB.open("feedbacks-data", 1);

            openDB.onerror = function(event) {
                alert("Error occurred when loading feedback");
            };

            openDB.onsuccess = function(event) {
                var db = openDB.result;
                var tx = db.transaction(["feedbacks"], "readwrite");
                var store = tx.objectStore("feedbacks");
                var addFeedback = store.put(feedback);
                addFeedback.onsuccess = function(event){
                    alert("Feedback created");
                }
                addFeedback.onerror = function(event){
                    alert("Error occurred when loading feedbacks");
                }
                tx.oncomplete = function(){
                    db.close();
                }
            };
        }
    }

    const onSubmitPress = async (e) => {
        e.preventDefault();

        const isValid = (textarea.value.length > 0 && namearea.value.length > 0);

        if (!isValid) return;

        const date = new Date();

        var feedback = new Feedback(namearea.value, textarea.value, date.toLocaleDateString(), date.toLocaleTimeString());

        // $('#container').prepend(
        //   feedbackTemplate(feedback)
        // );

        // writeLocally(feedback);

        await service.sendToServer({
            name: namearea.value,
            text: textarea.value,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        });

        namearea.value = '';
        textarea.value = '';
    }

    const onOnline = () => {
        initAndRenderData();
        console.log('Статус: онлайн, завантажую дані на сервер...');
    }

    const onOffline = () => {
        // initAndRenderData();
        console.log('Відсутнє підключення, перемикаюсь у офлайн режим...');
    }

    const addButton = getById('add');
addButton.onclick = onSubmitPress;
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('DOMContentLoaded', initAndRenderData);
