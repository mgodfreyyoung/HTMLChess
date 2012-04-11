var chessPiece, msPerFrame, frameCount, moveDist, pieceDivHeight;
var chessTwoDown;
var firstPlayer;
var secondPlayer;
var pieceToMove;
var flag1, flag2, flag3, flag4, flag5, flag6, flag7;
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

// the following block is the variables to change the positions of the pieces...I went with simple letters to insure browser compatiablity...
// create object literal array for chesspiece......the following row and column values can be modified to move the pieces.....
var pieces = [];
resetPieces();

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
    resetPieces();
    countDiv.innerHTML = writeboard();
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
    var Link = document.getElementById("link");
    link.innerHTML = '<a href="cookieCheck.html">cookieCheck.html </a>';

}





function resetPieces() {
	pieces = [{
		row : 0,
		column : 0,
		piece : "WRookL",
		display : "<img id = 'WRookL',  src='pieces/White_Rook.png', height=38 width=38>"
	}, {
		row : 0,
		column : 1,
		piece : "WKnightL",
		display : "<img id = 'WKnightL',  src='pieces/White_Knight.png', height=38 width=38>"
	}, {
		row : 5,
		column : 2,
		piece : "WBishopL",
		display : "<img id = 'WBishopL',  src='pieces/White_Bishop.png', height=38 width=38>"
	}, {
		row : 0,
		column : 3,
		piece : "WQueen",
		display : "<img id = 'WQuuen',  src='pieces/White_Queen.png', height=38 width=38>"
	}, {
		row : 0,
		column : 4,
		piece : "WKing",
		display : "<img id = 'WKing',  src='pieces/White_King.png', height=38 width=38>"
	}, {
		row : 0,
		column : 5,
		piece : "WBishopR",
		display : "<img id = 'WBishopR',  src='pieces/White_Bishop.png', height=38 width=38>"
	}, {
		row : 0,
		column : 6,
		piece : "WKnightR",
		display : "<img id = 'WknightR',  src='pieces/White_Knight.png', height=38 width=38>"
	}, {
		row : 0,
		column : 7,
		piece : "WRookR",
		display : "<img id = 'WRookR',  src='pieces/White_Rook.png', height=38 width=38>"
	},{
		row : 1,
		column : 0,
		piece : "WPawn1",
		display : "<img id = 'WPawn1', src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 1,
		piece : "WPawn2",
		display : "<img id = 'WPawn2', src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 2,
		piece : "WPawn3",
		display : "<img id = 'WPawn3', src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 3,
		piece : "WPawn4",
		display : "<img id = 'WPawn4',  src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 4,
		piece : "WPawn5",
		display : "<img id = 'WPawn5',  src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 5,
		piece : "WPawn6",
		display : "<img id = 'WPawn6',  src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 6,
		piece : "WPawn7",
		display : "<img id = 'WPawn7',  src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 1,
		column : 7,
		piece : "WPawn8",
		display : "<img id = 'WPawn8',  src='pieces/White_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 0,
		piece : "BPawn1",
		display : "<img id = 'BPawn1', src='pieces/Black_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 1,
		piece : "BPawn2",
		display : "<img id = 'BPawn2',  src='pieces/Black_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 2,
		piece : "BPawn3",
		display : "<img id = 'BPawn3',  src='pieces/Black_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 3,
		piece : "BPawn4",
		display : "<img  id = 'BPawn4', src='pieces/Black_Pawn.png', height=38 width=38>"
	},{
		row : 6,
		column : 4,
		piece : "BPawn5",
		display : "<img id = 'BPawn5',  src='pieces/Black_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 5,
		piece : "BPawn6",
		display : "<img id = 'BPawn6',  src='pieces/Black_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 6,
		piece : "BPawn7",
		display : "<img id = 'BPawn7',  src='pieces/Black_Pawn.png', height=38 width=38>"
	}, {
		row : 6,
		column : 7,
		piece : "BPawn8",
		display : "<img id = 'BPawn8',  src='pieces/Black_Pawn.png', height=38 width=38>"
	},{
		row : 7,
		column : 0,
		piece : "BRookL",
		display : "<img id = 'BrookL',  src='pieces/Black_Rook.png', height=38 width=38>"
	}, {
		row : 7,
		column : 1,
		piece : "BKnightL",
		display : "<img id = 'BKnightL',  src='pieces/Black_Knight.png', height=38 width=38>"
	}, {
		row : 7,
		column : 2,
		piece : "BBishopL",
		display : "<img id = 'BBishopL',  src='pieces/Black_Bishop.png', height=38 width=38>"
	}, {
		row : 7,
		column : 3,
		piece : "BQueen",
		display : "<img id = 'BQueen',  src='pieces/Black_Queen.png', height=38 width=38>"
	}, {
		row : 7,
		column : 4,
		piece : "BKing",
		display : "<img id = 'BKing',  src='pieces/Black_King.png', height=38 width=38>"
	}, {
		row : 7,
		column : 5,
		piece : "BBishopR",
		display : "<img id = 'BBishopR',  src='pieces/Black_Bishop.png', height=38 width=38>"
	}, {
		row : 7,
		column : 6,
		piece : "BKnightR",
		display : "<img id = 'BKnightR',  src='pieces/Black_Knight.png', height=38 width=38>"
	}, {
		row : 7,
		column : 7,
		piece : "BRookR",
		display : "<img id = 'BRookR',  src='pieces/Black_Rook.png', height=38 width=38>"
	}]
}

function getXML() {
	var request = new XMLHttpRequest();
    request.open("GET", "XMLdata.xml", false);
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
    var extraStuff = document.getElementsByTagName('td');
	alert(extraStuff[(row * 8) + col].innerHTML)

    if (clickedRow == row && clickedCol == col){
    	cell.id = '';
    	resetClicked = true;
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
            	tester = pieces[p].piece;
           }
           	}
         }
    }

    
    if (clickedRow != row || clickedCol != col){
    	for (x in moveList){
    		if (moveList[x].row == row && moveList[x].col == col){
			tryMove(tester,col,row,gridTable,cell)
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
    
    for (g in moveList){
    alert(moveList[g].row + ' ' + moveList[g].col)

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
	alert('intloop')
	str = pieces[p].piece
	var valid = true;
	if (str.substring(0, str.length - 1) == 'BPawn'){
		moveList.push({row: row - 1, col: col})
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
		if (str.substring(0, str.length - 1) == 'WPawn'){
		moveList.push({row: row + 1, col: col})
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
						moveList.push({row: row - 1, col: col - 1})
					}
					if (pieces[x].row == row + 1 && pieces[x].column == col + 1){
						moveList.push({row: row - 1, col: col + 1})
					}
				
			}
		}
		
	}
	return valid;
	
}
function tryMove(tester,col,row,gridTable,cell){
	

	if (tester.substring(0, tester.length - 1) == 'BPawn'){
		for (x in pieces){
			if (pieces[x].row == row && pieces[x].column == col){
				whiteTaken.push({row: row, col: col, piece: pieces[x].piece});
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
		if (tester.substring(0, tester.length - 1) == 'WPawn'){
		for (x in pieces){
			if (pieces[x].row == row && pieces[x].column == col){
				blackTaken.push({row: row, col: col, piece: pieces[x].piece});
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
}
