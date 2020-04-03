
    function selectFile(){
        document.getElementById("file-name").innerHTML = document.getElementById("file").value;
    };
    function downloadFile(){
        var ajax = new XMLHttpRequest();
        ajax.onload = function() {
                console.log(this.response);
                this.response.resources.forEach(function(element){
                    var url='https://res.cloudinary.com/dg4kbqljw/image/upload/v'+element.version+'/'+element.public_id+'.'+element.format;
                    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function() {
                    var a = document.createElement('a');
                    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
                    a.download = filename; // Set the file name.
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    delete a;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                });
        };
        ajax.open('GET', 'https://res.cloudinary.com/dg4kbqljw/image/list/landscapes.json');
        ajax.responseType = 'json';
        ajax.send();
    };
    function uploadFile(){
        var url = 'https://api.cloudinary.com/v1_1/dg4kbqljw/image/upload'
        var xhr = new XMLHttpRequest()
        var formData1 = new FormData()
        xhr.upload.addEventListener("progress", progressHandler, false);
        xhr.addEventListener("load", completeHandler, false);
        xhr.addEventListener("error", errorHandler, false);
        xhr.open('POST', url, true)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        formData1.append('upload_preset', 'w3lkmbvs')
        formData1.append('file', document.getElementById("file").files[0])
        xhr.send(formData1)
    };
    function progressHandler(event) {
      document.getElementById("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
      var percent = (event.loaded / event.total) * 100;
      document.getElementById("progressBar").value = Math.round(percent);
      document.getElementById("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    }
    function completeHandler(event) {
      document.getElementById("status").innerHTML = event.target.responseText;
      document.getElementById("progressBar").value = 0; //wil clear progress bar after successful upload
    }

    function errorHandler(event) {
      document.getElementById("status").innerHTML = "Upload Failed";
    }
