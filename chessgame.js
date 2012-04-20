var chessPiece, msPerFrame, frameCount, moveDist, pieceDivHeight;
var chessTwoDown;
var firstPlayer;
var secondPlayer;
var pieceToMove;
var valid = false;
var tester;
var listName = []
var listRow = []
var listCol = []
var moveList = []
var clickedRow;
var clickedCol;
var clickedCell;
var resetClicked = false;
var whiteTaken = [];
var blackTaken = [];
var whosTurn = 'B';

var html5_audiotypes = { 
    "mp3": "audio/mpeg",
    "ogg": "audio/ogg",
}
var clicksound = createsoundbite("click.ogg", "click.mp3");

function createsoundbite(sound) {
    var html5audio = document.createElement('audio')
    if (html5audio.canPlayType) { //check support for HTML5 audio
        for (var i = 0; i < arguments.length; i++) {
            var sourceel = document.createElement('source')
            sourceel.setAttribute('src', arguments[i])
            if (arguments[i].match(/\.(\w+)$/i))
                sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
            html5audio.appendChild(sourceel)
        }
        html5audio.load()
        html5audio.playclip = function () {
            html5audio.pause()
            html5audio.currentTime = 0
            html5audio.play()
        }
        return html5audio
    }
    else {
        return { playclip: function () { throw new Error("No Support for HTML5 audio (at least not .ogg or .mp3)") } }
    }
}

// the following block is the variables to change the positions of the pieces...I went with simple letters to insure browser compatiablity...
// create object literal array for chesspiece......the following row and column values can be modified to move the pieces.....
var pieces = [];

function showChessboard() {
    getCookie();
    var countDiv = document.getElementById("chessboardDiv");
    var NameDiv = document.getElementById("nameEnterDiv");
    NameDiv.innerHTML = getNames();
    countDiv.innerHTML = writeboard();
    getXML();
    addClickHandlers();
}
function getNameInput() {
    var userInput = document.getElementById('userInput').value;
    var userInput2 = document.getElementById('userInput2').value;
    firstPlayer = userInput;
    secondPlayer = userInput2;
    var NameDiv = document.getElementById("nameEnterDiv");
    NameDiv.innerHTML = "";
    chooseColor();
}


function getNames() {
    var html = "";
    html += "<input type=text id=userInput name=firstname value='First Player'/>";
    html += "<input type=text id=userInput2 name=secondname value='Second Player'/>";
    html += '<input type="button" id="btnSearch" value="Play!" onclick="getNameInput()" />';
    return html;
}

//--The following script is the actual function that I created that draws out the board, placing the elements from an object literal passed to it (also passed is the size of the board)

// Function Prologue for writeboard
// Descrition - Function to draw chess board using html +=)
// Passed values - widthheight: int value that sets the width and height of chessboard; pieces - object literal for the chess peices and their position on board; letters - array of letters for bottom of board...
// Return value - None
// Precondition - none
// Postcondtion - chess board setup with pieces in default starting position (white on bottom and black on top)
function writeboard() {


    var html = "";


    // Variable to set the size of board..
    var widthheight = 400;

    // set background color to white
    var squareCol = "green";

    // create table with width and height set by variable widthheight
    html += "<table id = 'chessTable' width =", widthheight, " height =", widthheight, " border='1'>";

    // for to create the table rows
    for (rows = 0; rows < 8; rows++) {

        html += "<tr align='left'>";

        // test to see if we are still creating rows
        if (rows < 8) {
            for (columns = 0; columns < 8; columns++) {
                    html += "<td class=" + columns + rows + " style=padding-left:6px width='40px' height='40px' bgcolor='" + squareCol + "' align='center'>";
                    for (var i in pieces) {
                        if (pieces[i].row == rows && pieces[i].column == columns && pieces[i].piece.charAt(0) == "W") {
                            html += "<font color=\"white\">" + pieces[i].display + "</font>";
                        }
                    }
                    for (var i in pieces) {
                        if (pieces[i].row == rows && pieces[i].column == columns && pieces[i].piece.charAt(0) == "B") {
                            html += "<font color=\"black\">" + pieces[i].display + "</font>";
                        }
                    }
                    html += "</td>";
                    if (squareCol == "teal") {
                        squareCol = "green";
                    }
                    else {
                        squareCol = "teal";
                    }
            }
        }
        if (squareCol == "teal") {
            squareCol = "green";
        }
        else {
            squareCol = "teal";
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}


function addClickHandlers() {
    var countDiv = document.getElementById("chessboardDiv");
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = addPosition;
    }
}


function chooseColor() {
    var colorSelect = document.getElementById('colorselectDiv')
    colorSelect.innerHTML = firstPlayer + ' choose: <select name=colorSel id=colorSel size=2 onclick="writeNames()" >   <option value=White>White</option> <option value=Black>Black</option> /select>'

}
function writeNames() {
    var colorSelection = document.getElementById('colorSel').value;
    var colorSelect = document.getElementById('colorselectDiv')
    colorSelect.innerHTML = ""
    if (colorSelection == 'Black') {
        var namesVar = document.getElementById("blackPlayer");
        namesVar.innerHTML = firstPlayer;
        var namesVar2 = document.getElementById("whitePlayer");
        namesVar2.innerHTML = secondPlayer;
    }
    else {
        var namesVar = document.getElementById("blackPlayer");
        namesVar.innerHTML = secondPlayer;
        var namesVar2 = document.getElementById("whitePlayer");
        namesVar2.innerHTML = firstPlayer;
    }
    var countDiv = document.getElementById("chessboardDiv");
    addClickHandlers();

}



function startMove(pieceToMove) {
    chessPiece = document.getElementById(pieceToMove);

    msPerFrame = 100;

    moveDist = 5;

    var botDiv = document.getElementById("chessboardDiv");
    pieceDivHeight = botDiv.offsetHeight;

    chessTwoDown = 0;
    setTimeout(movePawn, msPerFrame);
}

function movePawn() {
    chessTwoDown += moveDist;
    if (pieceToMove.charAt(0) == "B")
        chessPiece.style.bottom = chessTwoDown + "px";
    if (pieceToMove.charAt(0) == "W")
        chessPiece.style.top = chessTwoDown + "px";
    if (chessTwoDown != 85) {
        setTimeout(movePawn, msPerFrame);
    }

}
function getCookie() {
    var all = document.cookie;
    var list = all.split('=');
    all = list[1];
    var timeStamp = document.getElementById("timestamp");
    timeStamp.innerHTML = "Name and last login date: " + all;
}

function getXML() {
	var request = new XMLHttpRequest();
    request.open("GET", "InitialSetupXMLdata.xml", false);
    request.send(null);
    var xmldoc = request.responseXML;
    var xmlrows = xmldoc.getElementsByTagName("contact");
    var listName = []
    var listRow = []
    var listCol = []
    var listDisplay = []
    for (var r = 0; r < xmlrows.length; r++) {
	var xmlrow = xmlrows[r];
	var xrow = xmlrow.getElementsByTagName("row")[0];
	var xcolumn = xmlrow.getElementsByTagName("column")[0];
	var xdisplay = xmlrow.getElementsByTagName("display")[0];
	listName.push(xmlrow.getAttribute("name"));
	listRow.push(xrow.firstChild.data);
	listCol.push(xcolumn.firstChild.data);
	listDisplay.push(xdisplay.firstChild.data);
	}
	pieces = [];
    for (var r = 0; r < listName.length; r++){
	pieces.push({
		row : listRow[r],
		column : listCol[r],
		piece : listName[r],
		display : "<" + listDisplay[r] + ">"
	})
	}

	var countDiv = document.getElementById("chessboardDiv");
	countDiv.innerHTML = writeboard();
	
}
function addPosition() {
    var gridTable = document.getElementById("chessTable");
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;
    var cell = gridTable.rows[row].cells[col];


    ///var extraStuff = document.getElementsByTagName('td');
	///alert(extraStuff[(row * 8) + col].innerHTML)


    if (clickedRow == row && clickedCol == col){
    	cell.id = '';
    	resetClicked = true;
        clicksound.playclip()
    	moveList = []

    }
    if (clickedRow == null){
    for (p in pieces) {
       if (row == pieces[p].row && col == pieces[p].column && pieces[p] && pieces[p].piece.charAt(0) == whosTurn){
        	pieceValid(p,col,row);
        	if (moveList.length != 0){
        		valid = true
        		clickedRow = row;
        		clickedCol = col;
        		clickedCell = cell;
 				cell.id = "Clicked";
                clicksound.playclip()   
            	tester = pieces[p].piece;
           }
           	}
         }
    }

    
    if (clickedRow != row || clickedCol != col){
    	for (x in moveList){
    		if (moveList[x].row == row && moveList[x].col == col){
			tryMove(tester,col,row,gridTable,cell)
            clicksound.playclip()
			moveList = [];
			if (whosTurn == 'W'){
				whosTurn = 'B'
			}
			else{
				whosTurn = 'W'
			}
			
			break;
			}
    	}

    }
    if (resetClicked == true){
    	clickedRow = null
    	clickedCol = null
    	clickedCell = null
    	resetClicked = false
    }
    var head = document.getElementById("header");
    var chr = String.fromCharCode(64 + col);
    head.innerHTML = "Col: " + chr + " Row: " + row;
    var selectedPiece = document.getElementById('displayPieceDiv')
    if (tester != null) {
        selectedPiece.innerHTML = tester;
    }
    else {
        selectedPiece.innerHTML = "";
    }
    

    
}


function pieceValid(p,col,row){
	
	/// for Black Pawn...
	str = pieces[p].piece
	var valid = true;
	if (str.substring(0, str.length - 1) == 'BPawn' && row == 6){
		moveList.push({row: row - 1, col: col})
		moveList.push({row: row - 2, col: col})
		for (x in pieces) {
			if (pieces[x].row == row - 1 && pieces[x].column == col){
				for (y in moveList){
				if (moveList[y].row == row - 1 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				if (moveList[y].row == row - 2 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				}
			}
				
			if (pieces[x].row == row - 2 && pieces[x].column == col){
				for (y in moveList){
				if (moveList[y].row == row - 2 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				}
				
			
			}
			if (pieces[x].piece.charAt(0) == "W"){
				if (pieces[x].row == row - 1 && pieces[x].column  == col - 1){
						moveList.push({row: row - 1, col: col - 1})
					}
					if (pieces[x].row == row - 1 && pieces[x].column == col + 1){
						moveList.push({row: row - 1, col: col + 1})
					}
				
			}
		}
		
	}
		///For White pawn...
	if (str.substring(0, str.length - 1) == 'WPawn' && row == 1){
		moveList.push({row: row + 1, col: col})
		moveList.push({row: row + 2, col: col})
		for (x in pieces) {
			if (pieces[x].row == row + 1 && pieces[x].column == col){
				for (y in moveList){
				if (moveList[y].row == row + 1 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				if (moveList[y].row == row + 2 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				}
				}
			if (pieces[x].row == row + 2 && pieces[x].column == col){
				for (y in moveList){
				if (moveList[y].row == row + 2 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				}
				
			
			}
			if (pieces[x].piece.charAt(0) == "B"){
				if (pieces[x].row == row + 1 && pieces[x].column  == col - 1){
						moveList.push({row: row + 1, col: col - 1})
					}
					if (pieces[x].row == row + 1 && pieces[x].column == col + 1){
						moveList.push({row: row + 1, col: col + 1})
					}
				
			}
		}
		
	}
		/// for Black Pawn...
	str = pieces[p].piece
	var valid = true;
	if (str.substring(0, str.length - 1) == 'BPawn' && row != 6){
		if (row > 0 && row < 7){
		moveList.push({row: row - 1, col: col})
		}
		for (x in pieces) {
			if (pieces[x].row == row - 1 && pieces[x].column == col){
				for (y in moveList){
				if (moveList[y].row == row - 1 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				}				
				
			}
			if (pieces[x].piece.charAt(0) == "W"){
				if (pieces[x].row == row - 1 && pieces[x].column  == col - 1){
						moveList.push({row: row - 1, col: col - 1})
					}
					if (pieces[x].row == row - 1 && pieces[x].column == col + 1){
						moveList.push({row: row - 1, col: col + 1})
					}
				
			}
		}
		
	}
		///For White pawn...
	if (str.substring(0, str.length - 1) == 'WPawn' && row != 1){
		if (row > 0  && row < 7){
		moveList.push({row: row + 1, col: col})
		}
		for (x in pieces) {
			if (pieces[x].row == row + 1 && pieces[x].column == col){
				for (y in moveList){
				if (moveList[y].row == row + 1 && moveList[y].col == col){
					moveList.splice(y,1)
				}
				}				
				
			
			}
			if (pieces[x].piece.charAt(0) == "B"){
				if (pieces[x].row == row + 1 && pieces[x].column  == col - 1){
						moveList.push({row: row + 1, col: col - 1})
					}
					if (pieces[x].row == row + 1 && pieces[x].column == col + 1){
						moveList.push({row: row + 1, col: col + 1})
					}
				
			}
		}
		
	}
	/// Rooks Pattern
	if (str.substring(0, str.length - 1) == 'BRook' || str.substring(0, str.length - 1) == 'WRook' || str == 'BQueen' || str == 'WQueen'){
		var rowTemp = row + 1;
		var colTemp = col
		var stop = false;
		
		///check down....
		for (rowTemp; rowTemp < 8; rowTemp++){
			for (x in pieces){
				
				if (pieces[x].row == rowTemp && pieces[x].column == col){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: rowTemp, col: col})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: rowTemp, col: col})
		}
		
		//check up
		rowTemp = row - 1;
		colTemp = col
		stop = false;	
		for (rowTemp; rowTemp >= 0; rowTemp--){
			for (x in pieces){
				
				if (pieces[x].row == rowTemp && pieces[x].column == col){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: rowTemp, col: col})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: rowTemp, col: col})
		}
		
		//check right...
		rowTemp = row;
		colTemp = col + 1
		stop = false;	
		for (colTemp; colTemp < 8; colTemp++){
			for (x in pieces){
				
				if (pieces[x].row == row && pieces[x].column == colTemp){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row, col: colTemp})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: row, col: colTemp})
		}
		
		//check left...
		rowTemp = row;
		colTemp = col - 1
		stop = false;	
		for (colTemp; colTemp >= 0; colTemp--){
			for (x in pieces){
				
				if (pieces[x].row == row && pieces[x].column == colTemp){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row, col: colTemp})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: row, col: colTemp})
		}
			
	}
	
	/// Bishops....
		if (str.substring(0, str.length - 1) == 'BBishop' || str.substring(0, str.length - 1) == 'WBishop' || str == 'BQueen' || str == 'WQueen'){
		var rowTemp = row + 1;
		var colTemp = col
		var stop = false;
		
		///check left-down....
		for (rowTemp; rowTemp < 8; rowTemp++){
			colTemp = colTemp - 1
			if (colTemp < 0){
			break;
			}
				for (x in pieces){
				
				if (pieces[x].row == rowTemp && pieces[x].column == colTemp){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: rowTemp, col: colTemp})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: rowTemp, col: colTemp})
		}
			
		
		rowTemp = row + 1;
		colTemp = col
		stop = false;
		///check right-down....
		for (rowTemp; rowTemp < 8; rowTemp++){
			colTemp = colTemp + 1
			if (colTemp > 7){
			break;
			}
				for (x in pieces){
				
				if (pieces[x].row == rowTemp && pieces[x].column == colTemp){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: rowTemp, col: colTemp})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: rowTemp, col: colTemp})
		}
		
		
		///check right-up..		
		rowTemp = row - 1;
		colTemp = col
		stop = false;
		for (rowTemp; rowTemp >= 0; rowTemp--){
			colTemp = colTemp + 1
			if (colTemp > 7){
			break;
			}
				for (x in pieces){
				
				if (pieces[x].row == rowTemp && pieces[x].column == colTemp){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: rowTemp, col: colTemp})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: rowTemp, col: colTemp})
		}
		
		///check left-up..		
		rowTemp = row - 1;
		colTemp = col
		stop = false;
		for (rowTemp; rowTemp >= 0; rowTemp--){
			colTemp = colTemp - 1
			if (colTemp < 0){
			break;
			}
				for (x in pieces){
				
				if (pieces[x].row == rowTemp && pieces[x].column == colTemp){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: rowTemp, col: colTemp})
				}
				stop = true;
				break;
				
				}
				if (stop == true)
				break
			}
		if (stop == true){
		break
		}
		moveList.push({row: rowTemp, col: colTemp})
		}
			
	}
	
	
	//Knights...
	if (str.substring(0, str.length - 1) == 'BKnight' || str.substring(0, str.length - 1) == 'WKnight'){
		var flag = false	
		for (x in pieces){
			if (pieces[x].row == row + 1 && pieces[x].column == col + 2 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row + 1, col: col + 2})
				}
			}

			}
		if (flag == false && row + 1 >= 0 && row + 1 < 8 && col + 2 >=0 && col + 2 < 8){
			moveList.push({row: row + 1, col: col + 2})
		}
		flag = false
		for (x in pieces){
			if (pieces[x].row == row + 1 && pieces[x].column == col - 2 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row + 1, col: col - 2})
				}
			}

			}
		if (flag == false && row + 1 >= 0 && row + 1 < 8 && col -2 >=0 && col -2 < 8){
			moveList.push({row: row + 1, col: col - 2})
		}
		flag = false
		for (x in pieces){

			if (pieces[x].row == row + 2 && pieces[x].column == col - 1 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row + 2, col: col - 1})
				}
			}

			}
		if (flag == false && row + 2 >= 0 && row + 2 < 8 && col - 1 >=0 && col - 1 < 8){
			moveList.push({row: row + 2, col: col - 1})			
		}
		flag = false
		for (x in pieces){

			if (pieces[x].row == row + 2 && pieces[x].column == col + 1 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row + 2, col: col + 1})
				}
			}
			}
		if (flag == false && row + 2 >= 0 && row + 2 < 8 && col + 1 >=0 && col + 1 < 8){
			moveList.push({row: row + 2, col: col + 1})
		}
		flag = false
		for (x in pieces){
			if (pieces[x].row == row - 1 && pieces[x].column == col + 2 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row - 1, col: col + 2})
					break
				}
			}
			}
		if (flag == false && row - 1 >= 0 && row - 1 < 8 && col + 2 >=0 && col + 2 < 8){
			moveList.push({row: row - 1, col: col + 2})
		}
		flag = false
		for (x in pieces){

			if (pieces[x].row == row - 1 && pieces[x].column == col - 2 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row - 1, col: col - 2})
				}
			}
			}
		if (flag == false && row - 1 >= 0 && row - 1 < 8 && col -2 >=0 && col -2 < 8){
			moveList.push({row: row - 1, col: col - 2})
		}
		flag = false
		for (x in pieces){

			if (pieces[x].row == row - 2 && pieces[x].column == col - 1 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row - 2, col: col - 1})
				}
			}
			}
		if (flag == false && row +-2 >= 0 && row - 2 < 8 && col - 1 >=0 && col - 1 < 8){
			moveList.push({row: row - 2, col: col - 1})
		}
		flag = false
		for (x in pieces){

			if (pieces[x].row == row - 2 && pieces[x].column == col + 1 ){
				flag = true
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "B") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "W")){
					moveList.push({row: row - 2, col: col + 1})
				}
			}
			}
			if (flag == false && row - 2 >= 0 && row - 2 < 8 && col + 1 >=0 && col + 1 < 8){
				moveList.push({row: row - 2, col: col + 1})
		}
	}
	///  Kings
	if (str =='BKing' || str == 'WKing'){
		if (row < 7)
		moveList.push({row: row + 1, col: col})
		if (row > 0)
		moveList.push({row: row - 1, col: col})	
		if (col < 7)	
		moveList.push({row: row, col: col + 1})
		if (col > 0)
		moveList.push({row: row, col: col - 1})
		if (row < 7 && col < 7)
		moveList.push({row: row + 1, col: col + 1})
		if (row < 7 && col > 0)
		moveList.push({row: row + 1, col: col - 1})
		if (row > 0 && col < 7)
		moveList.push({row: row - 1, col: col + 1})
		if (row > 0 && col > 0)
		moveList.push({row: row - 1, col: col - 1})
		for (x in pieces){
			if (pieces[x].row == row + 1 && pieces[x].column == col){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){
					if (moveList[y].row == row + 1 && moveList[y].col == col){
						moveList.splice(y,1)
					}
					}
				}
			}
			if (pieces[x].row == row - 1 && pieces[x].column == col){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){					
					if (moveList[y].row == row - 1 && moveList[y].col == col){
						moveList.splice(y,1)
					}
				}
				}
			}
			if (pieces[x].row == row && pieces[x].column == col + 1){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){			
					if (moveList[y].row == row && moveList[y].col == col + 1){
						moveList.splice(y,1)
					}
				}
			}
				}
			if (pieces[x].row == row && pieces[x].column == col - 1){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){			
					if (moveList[y].row == row && moveList[y].col == col - 1){
						moveList.splice(y,1)
					}
				}
			}
				}
			if (pieces[x].row == row + 1 && pieces[x].column == col + 1){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){
					if (moveList[y].row == row + 1 && moveList[y].col == col + 1){
						moveList.splice(y,1)
					}
				}
			}
				}
			if (pieces[x].row == row + 1 && pieces[x].column == col - 1){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){			
					if (moveList[y].row == row + 1  && moveList[y].col == col - 1){
					
						moveList.splice(y,1)
					}
				}
			}
				}
			if (pieces[x].row == row - 1 && pieces[x].column == col + 1){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){
					if (moveList[y].row == row - 1 && moveList[y].col == col + 1){
						moveList.splice(y,1)
					}
				}
				}
			}
			if (pieces[x].row == row - 1 && pieces[x].column == col - 1){
				if ((pieces[x].piece.charAt(0) == "W" && whosTurn == "W") || (pieces[x].piece.charAt(0) == "B" && whosTurn == "B")){
					for (y in moveList){
					if (moveList[y].row == row - 1 && moveList[y].col == col - 1){
						moveList.splice(y,1)
					}
				}
				}
			}
	}
	}
	return valid;
}
function tryMove(tester,col,row,gridTable,cell){
		for (x in pieces){
			if (pieces[x].row == row && pieces[x].column == col){
				if (whosTurn == 'B'){
                if (pieces[x].piece == 'WKing'){
                alert("Black Wins...Press F5 to reset board and play again")
                }
				whiteTaken.push({row: row, col: col, piece: pieces[x].piece});
				}
				if (whosTurn == 'W'){
                if (pieces[x].piece == 'BKing'){
                alert("White Wins...Press F5 to reset board and play again")
                }
				blackTaken.push({row: row, col: col, piece: pieces[x].piece});
				}
				for (y in pieces){
					if(pieces[y].row == clickedRow && pieces[y].column == clickedCol) {
						pieces[y].row = row;
						pieces[y].column = col;
						cell.innerHTML = "<font color=\"white\">" + pieces[y].display + "</font>";
						clickedCell.innerHTML = ''
						clickedCell.id = ''
						resetClicked = true;
						pieces.splice(x,1);
						break;
					}
				}
			}
			}
		for (y in pieces){
			if (pieces[y].row == clickedRow && pieces[y].column == clickedCol){
				pieces[y].row = row;
				pieces[y].column = col;
				cell.innerHTML = "<font color=\"white\">" + pieces[y].display + "</font>";
				clickedCell.innerHTML = ''
				clickedCell.id = ''
				resetClicked = true;
				break;
			}
			}	
}

 
