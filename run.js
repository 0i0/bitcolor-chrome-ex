var req = new XMLHttpRequest();
var server = '127.0.0.1:8432';
var user = 'admin';
var pass = 'admin';
var url = "http://" + user + ":" + pass + "@" + server;
req.open("POST", url, true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {  
    if(req.status == 200)
    {
			var res = JSON.parse(req.responseText);
			var str = '', total = 0;
			for (var result in res.result){
				str += '<div>'+res.result[result].amount+' : '+res.result[result].txid+'</div>';
				total += res.result[result].amount;
			}
			str += '<div>Total : ' + total + '</div>';
      var content = document.getElementById('content');
      content.innerHTML = str;
    }
    else
    {
      console.log(req.status);
    }
  }
};
req.setRequestHeader("Content-type", "text/plain");
req.send(JSON.stringify({"jsonrpc": "1.0", "id":"chrome", "method": "listunspent", "params": [] }));