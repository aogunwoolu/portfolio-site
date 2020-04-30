function avAndMed(arr){
  arr.sort(function(a, b){return a-b});
  var total = 0;
  for (var item of arr) {
    total += parseInt(item);
  }
  return [Math.round((total/arr.length)),(arr[Math.floor(arr.length/2)])];
}

let a = [5,11,8,100,27];
var b = avAndMed(a);
window.alert(b[0]);
window.alert(b[1]);
