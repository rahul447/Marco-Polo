import express from "express";
let router = express.Router();

function playGame(startPoint, endPoint, perLine) {
	let trace = "", content = "";
	while(startPoint <= endPoint){
    trace += (startPoint % 28 === 0) ? "marcopolo" : (startPoint % 7 === 0) ? "polo" : (startPoint % 4 === 0) ? "macro"
      : startPoint;
    trace += ", ";
    if(startPoint % perLine === 0) {
      trace += "</br>";
      content += trace;
      trace = "";
    }
		startPoint++;
	}
	return content;
}

module.exports = () => {

	router.get('/', (req, res) => {
		res.send(` WELCOME TO THE GAME , ACCEPTED URL FORMAT : http://127.0.0.1:8050/:START/:END/:PERLINE , 
		Eg : http://127.0.0.1:8050/1/1000/10`);
	});

	router.get('/:start/:end/:perLine',function(req, res) {
    let startPoint = req.params.start,
			endPoint = req.params.end,
			perLine = req.params.perLine;

		res.send(playGame(startPoint, endPoint, perLine));
  });

	return router;
}
