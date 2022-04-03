
var i = 0;
function move() {
  if (document.getElementById("image_name").value != ""){
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }
}


$(document).ready(function() {
  const frm = $('#form1');
  frm.submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        success: function (data) {
          //console.log(data);

          var jsonData = JSON.parse(data);
          //alert(Object.values(jsonData));

          if (jsonData.success == "1")
          {
            $("#file_status").html('File Upload Successful');
          }
          else
          {
            $("#file_status").html('File Upload Failed');
          }
      },
      error: function (data) {
          //alert('An error occurred.');
          console.log(data);
      },
    });
  });
});


function showFile(input) {
  let file = input.files[0];
  document.getElementById("image_display").textContent = `${file.name}`;
  document.getElementById("image_name").value = `${file.name}`;

  document.getElementById("d_name").textContent = `${file.name}`;
  const newDate = new Date(file.lastModified);
  const listDate = newDate.toLocaleDateString();
  document.getElementById("d_date").textContent = `${listDate}`;
}


function readFile(input) {
  let file = input.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);
  //reader.readAsText(file);

  console.log('LOADING', reader.readyState); // readyState 1

  document.getElementById("file_status").style="display: block;;";
  document.getElementById("file_status").textContent = 'LOADING ...';

  reader.onload = function() {
    //console.log('Result: ', reader.result);
    document.getElementById("image_data").value = reader.result;
  };

  reader.onerror = function() {
    console.log(reader.error);
    document.getElementById("file_status").style="display: block;;";
    document.getElementById("file_status").textContent = 'Something went wrong, please try again.';
  };

  reader.onloadend = function () {
    console.log('DONE', reader.readyState); // readyState 2
    document.getElementById("file_status").style="display: block;;";
    document.getElementById("file_status").textContent = 'LOADING COMPLETED';

    // Display image
    const span = document.createElement('span');
    span.innerHTML = ['<img class="thumb" src="', reader.result, '"/>'].join('');
    document.getElementById('list').insertBefore(span, null);
  };
}