const canvas = document.getElementById('myCanvas');
const ctx = setupCanvas(canvas);
const rows = 300;
const columns = 300;
let scale = 1;
const minScale = 1;
let offsetX = 0, offsetY = 0;
let isDragging = false;
let startDragOffset = {};
let controlPressed = false;
let sKeyPressed = false;
let dKeyPressed = false;
let cellMap = new Map();
let isDevMode = false;

initializeGrid(); // Initialize the grid

// Sample data for testing
const sampleData = [
  {
    "Cell ID": ["NTP-GF-08799", "NTP-GF-08800", "NTP-GF-08801", "NTP-GF-08802", "NTP-GF-08803", "NTP-GF-08804", "NTP-GF-08805", "NTP-GF-08806", "NTP-GF-08807", "NTP-GF-08808", "NTP-GF-08809", "NTP-GF-08810", "NTP-GF-08811", "NTP-GF-09099", "NTP-GF-09100", "NTP-GF-09101", "NTP-GF-09102", "NTP-GF-09103", "NTP-GF-09104", "NTP-GF-09105", "NTP-GF-09106", "NTP-GF-09107", "NTP-GF-09108", "NTP-GF-09109", "NTP-GF-09110", "NTP-GF-09111", "NTP-GF-09399", "NTP-GF-09400", "NTP-GF-09401", "NTP-GF-09402", "NTP-GF-09403", "NTP-GF-09404", "NTP-GF-09405", "NTP-GF-09406", "NTP-GF-09407", "NTP-GF-09408", "NTP-GF-09409", "NTP-GF-09410", "NTP-GF-09411", "NTP-GF-09699", "NTP-GF-09700", "NTP-GF-09701", "NTP-GF-09702", "NTP-GF-09703", "NTP-GF-09704", "NTP-GF-09705", "NTP-GF-09706", "NTP-GF-09707", "NTP-GF-09708", "NTP-GF-09709", "NTP-GF-09710", "NTP-GF-09711", "NTP-GF-09999", "NTP-GF-10000", "NTP-GF-10001", "NTP-GF-10002", "NTP-GF-10003", "NTP-GF-10004", "NTP-GF-10005", "NTP-GF-10006", "NTP-GF-10007", "NTP-GF-10008", "NTP-GF-10009", "NTP-GF-10010", "NTP-GF-10011", "NTP-GF-10299", "NTP-GF-10300", "NTP-GF-10301", "NTP-GF-10302", "NTP-GF-10303", "NTP-GF-10304", "NTP-GF-10305", "NTP-GF-10306", "NTP-GF-10307", "NTP-GF-10308", "NTP-GF-10309", "NTP-GF-10310", "NTP-GF-10311", "NTP-GF-10592", "NTP-GF-10593", "NTP-GF-10594", "NTP-GF-10595", "NTP-GF-10596", "NTP-GF-10597", "NTP-GF-10598", "NTP-GF-10599", "NTP-GF-10600", "NTP-GF-10601", "NTP-GF-10602", "NTP-GF-10603", "NTP-GF-10604", "NTP-GF-10605", "NTP-GF-10606", "NTP-GF-10607", "NTP-GF-10608", "NTP-GF-10609", "NTP-GF-10610", "NTP-GF-10611", "NTP-GF-10892", "NTP-GF-10893", "NTP-GF-10894", "NTP-GF-10895", "NTP-GF-10896", "NTP-GF-10897", "NTP-GF-10898", "NTP-GF-10899", "NTP-GF-10900", "NTP-GF-10901", "NTP-GF-10902", "NTP-GF-10903", "NTP-GF-10904", "NTP-GF-10905", "NTP-GF-10906", "NTP-GF-10907", "NTP-GF-10908", "NTP-GF-10909", "NTP-GF-10910", "NTP-GF-10911", "NTP-GF-11192", "NTP-GF-11193", "NTP-GF-11194", "NTP-GF-11195", "NTP-GF-11196", "NTP-GF-11197", "NTP-GF-11198", "NTP-GF-11199", "NTP-GF-11200", "NTP-GF-11201", "NTP-GF-11202", "NTP-GF-11203", "NTP-GF-11204", "NTP-GF-11205", "NTP-GF-11206", "NTP-GF-11207", "NTP-GF-11208", "NTP-GF-11209", "NTP-GF-11210", "NTP-GF-11211", "NTP-GF-11492", "NTP-GF-11493", "NTP-GF-11494", "NTP-GF-11495", "NTP-GF-11496", "NTP-GF-11497", "NTP-GF-11498", "NTP-GF-11499", "NTP-GF-11500", "NTP-GF-11501", "NTP-GF-11502", "NTP-GF-11503", "NTP-GF-11504", "NTP-GF-11505", "NTP-GF-11506", "NTP-GF-11507", "NTP-GF-11508", "NTP-GF-11509", "NTP-GF-11510", "NTP-GF-11511", "NTP-GF-11792", "NTP-GF-11793", "NTP-GF-11794", "NTP-GF-11795", "NTP-GF-11796", "NTP-GF-11797", "NTP-GF-11798", "NTP-GF-11799", "NTP-GF-11800", "NTP-GF-11801", "NTP-GF-11802", "NTP-GF-11803", "NTP-GF-11804", "NTP-GF-11805", "NTP-GF-11806", "NTP-GF-11807", "NTP-GF-11808", "NTP-GF-11809", "NTP-GF-11810", "NTP-GF-11811", "NTP-GF-12092", "NTP-GF-12093", "NTP-GF-12094", "NTP-GF-12095", "NTP-GF-12096", "NTP-GF-12097", "NTP-GF-12098", "NTP-GF-12099", "NTP-GF-12100", "NTP-GF-12101", "NTP-GF-12102", "NTP-GF-12103", "NTP-GF-12104", "NTP-GF-12105", "NTP-GF-12106", "NTP-GF-12107", "NTP-GF-12108", "NTP-GF-12109", "NTP-GF-12110", "NTP-GF-12111", "NTP-GF-12392", "NTP-GF-12393", "NTP-GF-12394", "NTP-GF-12395", "NTP-GF-12396", "NTP-GF-12397", "NTP-GF-12398", "NTP-GF-12399", "NTP-GF-12400", "NTP-GF-12401", "NTP-GF-12402", "NTP-GF-12403", "NTP-GF-12404", "NTP-GF-12405", "NTP-GF-12406", "NTP-GF-12407", "NTP-GF-12408", "NTP-GF-12409", "NTP-GF-12410", "NTP-GF-12411", "NTP-GF-12692", "NTP-GF-12693", "NTP-GF-12694", "NTP-GF-12695", "NTP-GF-12696", "NTP-GF-12697", "NTP-GF-12698", "NTP-GF-12699", "NTP-GF-12700", "NTP-GF-12701", "NTP-GF-12702", "NTP-GF-12703", "NTP-GF-12704", "NTP-GF-12705", "NTP-GF-12706", "NTP-GF-12707", "NTP-GF-12708", "NTP-GF-12709", "NTP-GF-12710", "NTP-GF-12711", "NTP-GF-12992", "NTP-GF-12993", "NTP-GF-12994", "NTP-GF-12995", "NTP-GF-12996", "NTP-GF-12997", "NTP-GF-12998", "NTP-GF-12999", "NTP-GF-13000", "NTP-GF-13001", "NTP-GF-13002", "NTP-GF-13003", "NTP-GF-13004", "NTP-GF-13005", "NTP-GF-13006", "NTP-GF-13007", "NTP-GF-13008", "NTP-GF-13009", "NTP-GF-13010", "NTP-GF-13011", "NTP-GF-13292", "NTP-GF-13293", "NTP-GF-13294", "NTP-GF-13295", "NTP-GF-13296", "NTP-GF-13297", "NTP-GF-13298", "NTP-GF-13299", "NTP-GF-13300", "NTP-GF-13301", "NTP-GF-13302", "NTP-GF-13303", "NTP-GF-13304", "NTP-GF-13305", "NTP-GF-13306", "NTP-GF-13307", "NTP-GF-13308", "NTP-GF-13309", "NTP-GF-13310", "NTP-GF-13311", "NTP-GF-13592", "NTP-GF-13593", "NTP-GF-13594", "NTP-GF-13595", "NTP-GF-13596", "NTP-GF-13597", "NTP-GF-13598", "NTP-GF-13599", "NTP-GF-13600", "NTP-GF-13601", "NTP-GF-13602", "NTP-GF-13603", "NTP-GF-13604", "NTP-GF-13605", "NTP-GF-13606", "NTP-GF-13607", "NTP-GF-13608", "NTP-GF-13609", "NTP-GF-13610", "NTP-GF-13611", "NTP-GF-13892", "NTP-GF-13893", "NTP-GF-13894", "NTP-GF-13895", "NTP-GF-13896", "NTP-GF-13897", "NTP-GF-13898", "NTP-GF-13899", "NTP-GF-13900", "NTP-GF-13901", "NTP-GF-13902", "NTP-GF-13903", "NTP-GF-13904", "NTP-GF-13905", "NTP-GF-13906", "NTP-GF-13907", "NTP-GF-13908", "NTP-GF-13909", "NTP-GF-13910", "NTP-GF-13911", "NTP-GF-14192", "NTP-GF-14193", "NTP-GF-14194", "NTP-GF-14195", "NTP-GF-14196", "NTP-GF-14197", "NTP-GF-14198", "NTP-GF-14199", "NTP-GF-14200", "NTP-GF-14201", "NTP-GF-14202", "NTP-GF-14203", "NTP-GF-14204", "NTP-GF-14205", "NTP-GF-14206", "NTP-GF-14207", "NTP-GF-14208", "NTP-GF-14209", "NTP-GF-14210", "NTP-GF-14211", "NTP-GF-14492", "NTP-GF-14493", "NTP-GF-14494", "NTP-GF-14495", "NTP-GF-14496", "NTP-GF-14497", "NTP-GF-14498", "NTP-GF-14499", "NTP-GF-14500", "NTP-GF-14501", "NTP-GF-14502", "NTP-GF-14503", "NTP-GF-14504", "NTP-GF-14505", "NTP-GF-14506", "NTP-GF-14507", "NTP-GF-14508", "NTP-GF-14509", "NTP-GF-14510", "NTP-GF-14511", "NTP-GF-14792", "NTP-GF-14793", "NTP-GF-14794", "NTP-GF-14795", "NTP-GF-14796", "NTP-GF-14797", "NTP-GF-14798", "NTP-GF-14799", "NTP-GF-14800", "NTP-GF-14801", "NTP-GF-14802", "NTP-GF-14803", "NTP-GF-14804", "NTP-GF-14805", "NTP-GF-14806", "NTP-GF-14807", "NTP-GF-14808", "NTP-GF-14809", "NTP-GF-14810", "NTP-GF-14811"],
    "Area Name": "Cabin 1",
    "Area Type": "Cabin",
    "Customer Name": "ABD Pvt Ltd",
    "Status": "Blocked"
  }
];


document.addEventListener("DOMContentLoaded", function () {
  // Initialize in Preview Mode
  updateCellMapWithApiData(sampleData);
  drawGrid();
});

document.getElementById('modeToggle').addEventListener('change', function (event) {
  isDevMode = event.target.checked;

  const selectionInfoElements = document.querySelectorAll('.selectionInfo');
  const cabinInfoElements = document.querySelectorAll('.cabinInfo');
  const row2Element = document.querySelectorAll('.row2');

  // Toggle display for .selectionInfo based on isDevMode
  selectionInfoElements.forEach(el => {
    el.style.display = isDevMode ? 'block' : 'none';
  });

  // Toggle display for .cabinInfo based on isDevMode
  cabinInfoElements.forEach(el => {
    el.style.display = isDevMode ? 'none' : 'block';
  });

  row2Element.forEach(el => {
    el.style.display = isDevMode ? 'block' : 'none';
  });



  if (isDevMode) {
    // Clear selections in Dev Mode
    cellMap.forEach(cell => {
      cell.selected = false;
      Object.keys(cell).forEach(key => {
        if (['black', 'grey', 'white', 'green', 'red', 'orange'].includes(key)) {
          cell[key] = false;
        }
      });
    });
    drawGrid();
  } else {
    // Reload API data in Preview Mode
    updateCellMapWithApiData(sampleData);
  }
});


function initializeGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cellId = generateCellId(i, j);
      let cell = {
        x: j * (canvas.width / columns),
        y: i * (canvas.height / rows),
        width: canvas.width / columns,
        height: canvas.height / rows,
        selected: false,
        black: false,
        grey: false,
        white: false,
        green: false,
        red: false,
        orange: false
      };
      cellMap.set(cellId, cell);
    }
  }
}

function updateCellMapWithApiData(apiData) {
  // Reset cell colors
  cellMap.forEach(cell => {
    cell.black = false;
    cell.grey = false;
    cell.white = false;
    cell.green = false;
    cell.red = false;
    cell.orange = false;
  });

  // Update cell colors based on API data
  apiData.forEach(area => {
    const statusColorMap = {
      'Blocked': 'red',
      'Temporarily Blocked': 'orange',
      'Empty': 'white',
      'Passage': 'grey',
      'Fixed Area': 'black'
    };

    area['Cell ID'].forEach(cellId => {
      if (cellMap.has(cellId)) {
        let cell = cellMap.get(cellId);
        let colorKey = statusColorMap[area.Status] || 'white';
        cell[colorKey] = true;
      }
    });
  });

  drawGrid();
}

// Cache DOM elements
const blackCellsTextarea = document.getElementById('blackCells');
const greyCellsTextarea = document.getElementById('greyCells');
const whiteCellsTextarea = document.getElementById('whiteCells');
const greenCellsTextarea = document.getElementById('greenCells');
const redCellsTextarea = document.getElementById('redCells');
const orangeCellsTextarea = document.getElementById('orangeCells');
const selectionDetailsTextarea = document.getElementById('selectionDetails');

// Load the image once and add a load event listener
const bgImage = new Image();
bgImage.onload = drawGrid; // Call drawGrid as soon as the image is loaded
bgImage.src = './NTP-GF-BG.png';

function setupCanvas(canvas) {
  let dpr = window.devicePixelRatio || 1;

  // Get the size of the canvas as displayed on the screen
  let rect = canvas.getBoundingClientRect();

  // Set the drawing buffer size to match the displayed size, factoring in the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  let ctx = canvas.getContext('2d');

  // Scale all drawing operations by the dpr, so everything is drawn at the correct size.
  ctx.scale(dpr, dpr);

  return ctx;
}


function generateCellId(row, column) {
  let idNumber = row * columns + column + 1;
  return String(idNumber).padStart(5, '0');
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function updateCellColors(textareaId, colorProperty) {
  const cellIds = document.getElementById(textareaId).value
    .split(',')
    .map(id => id.trim()) // Trim whitespace
    .map(id => id.replace(/"/g, '')); // Remove quotes

  cellMap.forEach((cell, cellId) => {
    cell[colorProperty] = cellIds.includes(cellId);
  });

  drawGrid();
}


blackCellsTextarea.addEventListener('input', debounce(() => updateCellColors('blackCells', 'black')));
greyCellsTextarea.addEventListener('input', debounce(() => updateCellColors('greyCells', 'grey')));
whiteCellsTextarea.addEventListener('input', debounce(() => updateCellColors('whiteCells', 'white')));
greenCellsTextarea.addEventListener('input', debounce(() => updateCellColors('greenCells', 'green')));
redCellsTextarea.addEventListener('input', debounce(() => updateCellColors('redCells', 'red')));
orangeCellsTextarea.addEventListener('input', debounce(() => updateCellColors('orangeCells', 'orange')));
selectionDetailsTextarea.addEventListener('input', debounce(() => {
  const inputIds = selectionDetailsTextarea.value.split(',').map(id => id.trim());
  cellMap.forEach((cell, cellId) => {
    cell.selected = inputIds.includes(cellId);
  });
  drawGrid();
}));

function drawGrid() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(offsetX, offsetY);
  ctx.save();
  ctx.scale(scale, scale);

  if (isDevMode) {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = '#b8fffe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.lineWidth = 0.5 / scale;

  const cellOverlap = 0.5; // Extra pixels to add to the fill to cover grid lines

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cellId = generateCellId(i, j);
      let cell = cellMap.get(cellId) || {
        x: j * (canvas.width / columns),
        y: i * (canvas.height / rows),
        width: canvas.width / columns,
        height: canvas.height / rows,
        selected: false,
        black: false,
        grey: false,
        white: false,
        green: false,
        red: false,
        orange: false
      };
      cellMap.set(cellId, cell);

      const colors = {
        black: '#000000',
        grey: '#808080',
        white: '#FFFFFF',
        green: '#008000',
        red: '#FF0000',
        orange: '#FFA500'
      };

      let filled = false;
      Object.keys(colors).forEach(colorProperty => {
        if (cell[colorProperty]) {
          ctx.fillStyle = colors[colorProperty];
          // Overdraw the fill slightly to avoid grid lines showing through
          ctx.fillRect(cell.x - cellOverlap / 2, cell.y - cellOverlap / 2, cell.width + cellOverlap, cell.height + cellOverlap);
          filled = true;
        }
      });

      if (!filled && cell.selected) {
        ctx.fillStyle = 'rgba(0, 100, 255, 0.3)';
        ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
      }

      // Only draw grid lines for non-filled cells in Dev mode
      if (isDevMode && !filled) {
        ctx.strokeStyle = '#ddd';
        ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
      }
    }
  }

  ctx.restore();
}


canvas.addEventListener('wheel', function (event) {
  const zoomIntensity = 0.1;
  const mousex = event.clientX - canvas.getBoundingClientRect().left;
  const mousey = event.clientY - canvas.getBoundingClientRect().top;
  const wheel = event.deltaY < 0 ? 1 : -1;
  const zoom = Math.exp(wheel * zoomIntensity);

  const newScale = scale * zoom;
  if (newScale >= minScale) {
    offsetX = mousex - (mousex - offsetX) * zoom;
    offsetY = mousey - (mousey - offsetY) * zoom;
    scale = newScale;
    drawGrid();
  }
  event.preventDefault();
});

function setGrabbingCursor(isGrabbing) {
  canvas.style.cursor = isGrabbing ? 'grabbing' : (controlPressed ? 'grab' : 'default');
}

canvas.addEventListener('mousedown', function (event) {
  if (event.ctrlKey) {
    isDragging = true;
    startDragOffset.x = event.clientX - offsetX;
    startDragOffset.y = event.clientY - offsetY;
    setGrabbingCursor(true);
  }
});

canvas.addEventListener('mousemove', function (event) {
  if (isDragging && controlPressed) {
    offsetX = event.clientX - startDragOffset.x;
    offsetY = event.clientY - startDragOffset.y;
    drawGrid();
  }
  setGrabbingCursor(isDragging && controlPressed);

  if (sKeyPressed && !controlPressed) {
    selectCells(event);
  } else if (dKeyPressed && !controlPressed) {
    deselectCells(event.clientX, event.clientY);
  }
});

canvas.addEventListener('mouseup', function (event) {
  isDragging = false;
  setGrabbingCursor(false);
});

window.addEventListener('keydown', function (event) {
  if (event.key === 'Control') {
    controlPressed = true;
    setGrabbingCursor(isDragging);
  }
  if (!isDevMode) return;
  if (event.key === 's' || event.key === 'S') {
    sKeyPressed = true;
  }
  if (event.key === 'd' || event.key === 'D') {
    dKeyPressed = true;
  }
});


window.addEventListener('keyup', function (event) {
  if (event.key === 'Control') {
    controlPressed = false;
    setGrabbingCursor(false);
  }
  if (event.key === 's' || event.key === 'S') {
    sKeyPressed = false;
  }
  if (event.key === 'd' || event.key === 'D') {
    dKeyPressed = false;
  }
});

function selectCells(event) {
  const mousex = (event.clientX - canvas.getBoundingClientRect().left - offsetX) / scale;
  const mousey = (event.clientY - canvas.getBoundingClientRect().top - offsetY) / scale;

  for (const [cellId, cell] of cellMap.entries()) {
    if (mousex >= cell.x && mousex < cell.x + cell.width && mousey >= cell.y && mousey < cell.y + cell.height) {
      cell.selected = true;
    }
  }

  updateSelectionDetails();
  drawGrid();
}

function deselectCells(mouseX, mouseY) {
  const mousex = (mouseX - canvas.getBoundingClientRect().left - offsetX) / scale;
  const mousey = (mouseY - canvas.getBoundingClientRect().top - offsetY) / scale;

  for (const [cellId, cell] of cellMap.entries()) {
    if (mousex >= cell.x && mousex < cell.x + cell.width && mousey >= cell.y && mousey < cell.y + cell.height) {
      cell.selected = false;
    }
  }

  updateSelectionDetails();
  drawGrid();
}

function updateSelectionDetails() {
  const selectedCellIds = Array.from(cellMap.entries())
    .filter(([_, cell]) => cell.selected)
    .map(([cellId, _]) => `"${cellId}"`); // Add quotes around each cell ID
  document.getElementById('selectionDetails').value = selectedCellIds.join(', ');
}


canvas.onselectstart = function () { return false; }
canvas.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// Add the new event listener for selectionDetails textarea
document.getElementById('selectionDetails').addEventListener('input', function () {
  const inputText = this.value;
  const inputIds = inputText.split(',').map(id => id.trim());
  cellMap.forEach((cell, cellId) => {
    cell.selected = inputIds.includes(cellId);
  });
  drawGrid();
});

// ...............................................................

let fKeyPressed = false;

window.addEventListener('keydown', function (event) {
  if (event.key === 'f' || event.key === 'F') {
    fKeyPressed = true;
  }
});

window.addEventListener('keyup', function (event) {
  if (event.key === 'f' || event.key === 'F') {
    fKeyPressed = false;
  }
});

canvas.addEventListener('click', function (event) {
  // Only execute in Preview Mode and if 'F' key is pressed
  if (!isDevMode && fKeyPressed) {
    const mousex = (event.clientX - canvas.getBoundingClientRect().left - offsetX) / scale;
    const mousey = (event.clientY - canvas.getBoundingClientRect().top - offsetY) / scale;

    const columnClicked = Math.floor(mousex / (canvas.width / columns));
    const rowClicked = Math.floor(mousey / (canvas.height / rows));
    const cellId = generateCellId(rowClicked, columnClicked);

    // Find the area data for the clicked cell
    const areaData = sampleData.find(area => area["Cell ID"].includes(cellId));

    const cabinDetailsTextarea = document.getElementById('cabinDetails');

    // Display the area data or a default message
    if (areaData) {
      cabinDetailsTextarea.value = `Area Name: ${areaData["Area Name"]}\nArea Type: ${areaData["Area Type"]}\nCustomer Name: ${areaData["Customer Name"]}\nStatus: ${areaData["Status"]}`;
    } else {
      // If no data is found, display a default message or leave it empty
      cabinDetailsTextarea.value = `No data found for Cell ID: ${cellId}`;
      // or you can clear the previous details
      // cabinDetailsTextarea.value = '';
    }
  }
});


function generateCellId(row, column) {
  let idNumber = row * columns + column + 1;
  return String(idNumber).padStart(5, '0');
}

drawGrid(); // Initial draw