var useLocalStorage = false;
function switchUseLS(){
    useLocalStorage = !useLocalStorage;
}
window.isOnline = () => this.navigator.onLine;
const getById = id => document.getElementById(id);

// REST
class ServeЁrService {
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

const input_form = getById('fileInput');
const newsForm = getById('newsForm');
const text = getById('title');
const caption = getById('comment');

const fileInput = getById('fileInput');

class News{
    constructor(title, body, picture){
        this.title = title;
        this.body = body;
        this.picture = picture;
    }
}

//REST
const service = new ServerService();

const onSubmitPress = async (e) => {
    e.preventDefault();

    const isValid = (text.value.length > 0 && caption.value.length > 0);

    if (!isValid) return;

    var news = new News(caption.value, text.value, fileInput.value);

    // if (!isOnline()) {
    //   writeLocally(news);
    // } else {
    //   console.log('Емуляція запиту до сервера...');
    // }

    await service.sendToServer({
        title: caption.value,
        body: text.value,
        picture: fileInput.value,
    });



    alert('Вашу новину додано!');
}


function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#example_picture').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};

$("#fileInput").change(function() {
    readURL(this);
});

function getNews() {
    var news = new Array;
    var news_item = localStorage.getItem('news_data');
    if (news_item !== null) {
        news = JSON.parse(news_item);
    }
    return news;
}

function writeLocally(newsItem) {
    if(useLocalStorage){
        var news = getNews();
        news.push(newsItem);
        localStorage.setItem('news_data', JSON.stringify(news));
        return false;
    }
    else{
        var openDB = indexedDB.open("news_data", 1);

        openDB.onerror = function(event) {
            alert("Error occurred when loading news");
        };
        openDB.onupgradeneeded = function() {
            var db = openDB.result;
            var store = db.createObjectStore("news", {keyPath: "title"});
            store.createIndex("title", "title", { unique: false });
            store.createIndex("body", "body", { unique: false });
            store.createIndex("picture", "picture", { unique: false });
        };
        openDB.onsuccess = function(event) {
            var db = openDB.result;
            var tx = db.transaction(["news"], "readwrite");
            var store = tx.objectStore("news");
            var addFeedback = store.put(newsItem);
            addFeedback.onsuccess = function(event){
            }
            addFeedback.onerror = function(event){
                alert("Error occurred when loading news");
            }
            tx.oncomplete = function(){
                db.close();
            }
        };
    }
};


const addButton = getById('send');
addButton.onclick = onSubmitPress;


/*
var useLocalStorage = false;
    on = navigator.onLine;
    if (useLocalStorage) {
        if(!on) {
            function showTasks(){ //отслеживания id
                var lsLen = localStorage.length;
                if(lsLen > 0){
                    for(var i = 0; i < lsLen; i++){
                        var key = localStorage.key(i);
                        if(key.charAt(0) == "s") {
                            if(localStorage.getItem(key)!=null) {
                                $('<div>\n' +'</div>').addClass('tdItem')
                                    .attr('data-itemid', key)
                                    .addClass('tdItem')
                                    .appendTo($("#result"));
                            }
                        }
                    }
                }
            }




showTasks();


var loadFile = function(event) {
var img = document.getElementById('output');
img.src = URL.createObjectURL(event.target.files[0]);}
var fileInput = document.getElementById('fileInput');
var ID = 0;

$(".tdItem").each(function (index, el) {
    var nID = $(el).attr('data-itemid').slice(3);
    alert(nID)
    if (nID > ID)
        ID = nID;
});



    $("#send").click(function() {
        var title = $.trim($("#title").val());
        var comment = $.trim($("#comment").val());
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function() {
                var img = new Image();
                img.src = reader.result;

                if(title !=="" & comment!=="") {
                    alert('Success!');
                    ID++;

                    localStorage.setItem("src"+ID,img.src);
                    localStorage.setItem("title"+ID,title);
                    localStorage.setItem("inf"+ID,comment);

                }else{
                    alert('Fields can\'t be empty');
                }
            }
            reader.readAsDataURL(file);
        document.getElementById('title').value='';
        document.getElementById('comment').value='';
        document.getElementById("output").src="img/Untitled.png";

    });


$(document).on('click', '.delete', function() {
    $(this).closest(".new").remove();
});
}else {
    function check() {
        var title = $.trim($("#title").val());
        var comment = $.trim($("#comment").val());
        if (title !== "" & comment !== "") {
            alert('Data sent to server');
            document.getElementById('title').value = '';
            document.getElementById('comment').value = '';
            document.getElementById("output").src = "img/Untitled.png";
        } else {
            alert('Fields can\'t be empty');
        }
    }
    document.getElementById("send").addEventListener("click", check);

}
}
else {
if (!on) {
    window.onload = function () {

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


            result.innerHTML = addmin.map(addmin => '<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 new" style="margin-top: 60px;border-top: 2px solid white; margin-left: auto; margin-right: auto;">\n' +
                '    <div class="row" style="margin-top: 60px">\n' +
                '        <div class="col-lg-2 col-md-2 borderBox" style="line-height: 1">\n' +
                '    <p style="font-size: 13px">' + addmin.title + '</p>\n' +
                ' <p style="font-size: 13px">' + addmin.now + '</p>' +
                '        </div>\n' +
                '        <div class="col-lg-9 col-md-9 borderBox">\n' +
                '           <p>' + addmin.comment + '</p> \n' +
                '        </div>\n' +
                '        <div class="col-lg-1 col-md-1 ">\n' +
                '           <button type="button" class="btn btn-danger delete h-50" id="delete" onclick="clearAppeals()">Delete</button>  \n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>').join('');


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

        window.addEventListener('unhandledrejection', event => {
            alert("Error: " + event.reason.message);
        });
        document.getElementById('send').addEventListener('click', addAppeal);

    }
}else {
    function check() {
        var title = $.trim($("#title").val());
        var comment = $.trim($("#comment").val());
        if (title !== "" & comment !== "") {
            alert('Data sent to server');
            document.getElementById('title').value = '';
            document.getElementById('comment').value = '';
            document.getElementById("output").src = "img/Untitled.png";
        } else {
            alert('Fields can\'t be empty');
        }
    }
    document.getElementById("send").addEventListener("click", check);

}
}
*/
