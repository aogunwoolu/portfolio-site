function addRow(n){
  var foot = document.getElementById("myTFoot");
  var body = document.getElementById("myTBody");
  var head = document.getElementById("myThead");
  var row = document.getElementById("myRow");

  for(var k =0;k<=n;k++){
    let x = head.insertRow(k);
    if (k==0){
      for (var l = 0; l < n; l++) {
        var newcell = x.insertCell(l);newcell.innerHTML = (l+1);
        newcell.id = "header";
      }
      var newcell = x.insertCell(0);
      newcell.innerHTML = ("X");
    }
    else{
      for (var i = 0; i <= n; i++){
        if (i == 0){
          var newcell = x.insertCell(i);newcell.innerHTML = (k);
          newcell.id = "header";
        }
        else{
          var newcell = x.insertCell(i);newcell.innerHTML = k*i;
          newcell.id = "mult";
        }
      }
    }
  }
  foot.colSpan = ++n;
}

var number = prompt("enter max number of table");
addRow(number);
