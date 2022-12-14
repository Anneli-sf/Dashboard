
const TABLE_HEAD = document.querySelector('.table-head');
const TABLE_BODY = document.querySelector('.table-body');
const SELECT = document.querySelector('.select');
const MEDIA_QUERIES = window.matchMedia('(max-width: 600px)');

let activeOption = mainData.departures;

//-----------------------------------------------------load page dy default
document.addEventListener('DOMContentLoaded', () => { 
    showTable(activeOption);
});


//----------------------------------------------------switch arrival / departure
SELECT.addEventListener('change', (option) => {
    activeOption = mainData[option.target.value];
    showTable(activeOption);
});

//------------------------------------------------------sort table
TABLE_HEAD.addEventListener('click', sortTable);


//----------------------------CREATE & SHOW TABLE------------------------------------

function showTable(option) {
    TABLE_HEAD.innerHTML = ``;
    TABLE_BODY.innerHTML = ``;

    createHead();
    createBody(option);
};


function createHead(option) {

    const TABLE_HEAD_ROW = document.createElement('tr');
    TABLE_HEAD_ROW.classList.add('table-head-row');

    TABLE_HEAD_ROW.innerHTML = `
        <th id="sched" class="sched">TIME</th>
        <th id="apname" class="apname">DESTINATION</th> 
        <th id="apname" class="apname-fnr hidden">DESTINATION / AIRLINE</th>
        <th id="alname" class="alname">AIRLINE</th>
        <th id="fnr" class="fnr">FLIGHT</th>
        <th id="gate" class="gate">GATE</th>
        <th id="status" class="status">STATUS</th>                              
    `
    
    TABLE_HEAD.appendChild(TABLE_HEAD_ROW);

    if (option === mainData.arrivals) {//--------------------------there is no GATE in Arrival;
        document.querySelectorAll(".gate").classList.add('hidden');
    } 
};

function createBody(option) {

        for (let i=0; i < option.length; i++) {
            const TABLE_BODY_ROW = document.createElement('tr');
            TABLE_BODY_ROW.classList.add('table-body-row');
            TABLE_BODY_ROW.innerHTML += `
                <td class="sched">${formatTime(option[i].sched)}</td>
                <td class="apname">${option[i].apname}</td>
                <td class="apname-fnr hidden">${option[i].apname} - <b>${option[i].fnr}</b></td>
                <td class="alname">${option[i].alname}</td>
                <td class="fnr">${option[i].fnr}</td>
                <td class="gate">${option[i].gate}</td>
                <td class="status">${option[i].status}</td>       
        `;

        TABLE_BODY.append(TABLE_BODY_ROW);
        }

        if (option === mainData.arrivals) {//--------------------------there is no GATE in Arrival;
            const GATE = document.querySelectorAll(".gate");
            GATE.forEach(item => item.classList.add('hidden'));
        } 

}


//----------------------------------SORTING-------------------------
let order = 'abc';
let currSortCol;
let count = 0;

function sortTable(col) {
    
    let currCol = col.target.id; 
    let sortStr;
    let sortDate;
    
    if (currSortCol !== currCol || (currSortCol === currCol && count % 2 === 0)) {
        order = 'abc';

        if (currCol !== 'sched') {
            sortStr = sortStrAbc(currCol);
        }
        else { sortDate = sortDateAbc(currCol) 
        }

        count++;
    }    
    else {
        order = 'cba';
        if (currCol !== 'sched') {
            sortStr = sortStrBca(currCol);
        }
        else { sortDate = sortDateBca(currCol); 
        }
        count++;
    } 

    activeOption.sort(sortStr);
    activeOption.sort(sortDate);

    currSortCol = currCol;

    TABLE_BODY.innerHTML = '';
    createBody(activeOption);
}


//-------------------------------------ADDITIONAL FUNCTIONS---------------------

function formatTime(str) {
    return str.slice(11, 16);
}

function sortStrAbc(item) {
	return (a, b) => (a[item] >= b[item] ? 1 : -1);
}

function sortStrBca(item) {
	return (a, b) => (a[item] >= b[item] ? -1 : 1);
}

function sortDateAbc(item) {
	return (a, b) => (new Date(a[item]) > new Date(b[item]) ? 1 : -1);
}

function sortDateBca(item) {
	return (a, b) => (new Date(a[item]) > new Date(b[item]) ? -1 : 1);
}









