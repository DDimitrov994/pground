function smartAJAX(obj) {

    if (typeof (obj.end) !== "function") {
        throw new Error("obj.end must be a callback function!");
    }


    var xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var headers = this.getAllResponseHeaders();
            headers = headers.split("\n");

            var headerObj = {}
            for (var header of headers) {
                var headerParts = header.split(':')
                headerObj[headerParts[0]] = headerParts[1]
            }
            obj.end(this.responseText, headerObj);
        }
    };


    if (obj.headers) {
        obj.headers.forEach(function (header) {
            xhttp.setRequestHeader(header.key, header.value);
        }, this);
    }


    if (obj.data.tagName === 'FORM') {

        if (typeof (obj.progress) !== "function") {
            throw new Error("obj.progress must be a function!");
        }

        if (!obj.url) {
            if (!obj.data.getAttribute("action") || obj.data.getAttribute("action").indexOf("http") == -1) {
                throw new Error("Must provide URL address!");
            } else {
                obj.url = obj.data.getAttribute("action");
            }
        }
        if (!obj.method) {
            if (!obj.data.getAttribute("method")) {
                throw new Error("Must provide request method: POST, GET, etc!");
            } else {
                obj.method = obj.data.getAttribute("method");
            }
        }
        obj.data = new FormData(obj.data)
        var textInputsForm = new FormData()

        for (var input of obj.data) {
            if (typeof input[1] === 'object') {
                processFile(input[1])
            } else {
                textInputsForm.append(input[0], input[1])
            }
        }

        xhttp.open(obj.method, obj.url, true);

        xhttp.send(textInputsForm);


    } else {
        if (!obj.url) {
            throw new Error("Must provide URL address!");
        }
        if (!obj.method) {
            throw new Error("Must provide request method: POST, GET, etc!");
        }
        if (typeof (obj.data) != "string") {
            obj.data = JSON.stringify(obj.data);
        }
        xhttp.open(obj.method, obj.url, true);

        xhttp.send(obj.data);
    }


    function processFile(file) {

        var size = file.size;

        var sliceSize = obj.sliceSize || 1024 * 8;

        var start = 0;
        var partsNumber = Math.ceil(size / sliceSize);
        var currentPart = 0;

        setTimeout(loop, 1);

        function loop() {
            var end = start + sliceSize;

            if (size - end < 0) {
                end = size;
            }

            var s = slice(file, start, end);

            send(s, partsNumber, currentPart, file.name);
            currentPart++;

            obj.progress(end, size);

            if (end < size) {
                start += sliceSize;
                setTimeout(loop, 1);
            }
        }
    }


    function send(piece, chunks, chunk, name) {
        var formdata = new FormData();
        var xhr = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

            }
        }

        xhr.open(obj.method, obj.url, true);

        formdata.append('chunks', chunks);
        formdata.append('chunk', chunk);
        formdata.append('name', name);
        formdata.append('file', piece);

        xhr.send(formdata);
    }


    function slice(file, start, end) {
        var slice = file.mozSlice ? file.mozSlice :
            file.webkitSlice ? file.webkitSlice :
                file.slice ? file.slice : noop;

        return slice.bind(file)(start, end);
    }

    function noop() {

    }


}



document.getElementById("submit").addEventListener("click", function (ev) {
    var obj = {};
    ev.preventDefault();
    //obj.data = document.getElementById('myForm');
    //obj.data = { "name": "ivan" };
    obj.data = "";
    obj.method = "GET";
    obj.url = "https://jsonplaceholder.typicode.com/posts/1";
    obj.end = function (resData, resHeaderCollection) {
        console.log(resHeaderCollection);
        console.log(resData);
    }
    obj.progress = function (end, size) {
        //end is current chunk
        //size is the size of the file
    }
    obj.headers = [];
    //obj.sliceSize = 20;
    smartAJAX(obj);
})