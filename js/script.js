
// const TABLE = document.querySelector('.table');
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
        <th id="sched">TIME</th>
        <th id="apname">DESTINATION</th> 
        <th id="alname">AIRLINE</th>
        <th id="fnr">FLIGHT</th>
        <th id="gate" class="gate">GATE</th>
        <th id="status">STATUS</th>                              
    `
    
    TABLE_HEAD.appendChild(TABLE_HEAD_ROW);

    if (MEDIA_QUERIES.matches) { //--------------------------hide the column if width=600px;
        let destn = document.querySelector('#apname');
        destn.innerHTML = `
            <th id="apname">DESTINATION / FLIGHT</th>
        `      
    }

    if (option === mainData.arrivals) {//--------------------------there is no GATE in Arrival;
        document.querySelectorAll(".gate").classList.add('hidden');
    } 
};

function createBody(option) {

        for (let i=0; i < option.length; i++) {
            const TABLE_BODY_ROW = document.createElement('tr');
            TABLE_BODY_ROW.classList.add('table-body-row');
            TABLE_BODY_ROW.innerHTML += `
                <td>${formatTime(option[i].sched)}</td>
                <td class="apname">${option[i].apname}</td>
                <td>${option[i].alname}</td>
                <td class="fnr">${option[i].fnr}</td>
                <td class="gate">${option[i].gate}</td>
                <td>${option[i].status}</td>       
        `;

        
        if (MEDIA_QUERIES.matches) {//--------------------------hide the column if width=600px;
            let dest = document.querySelectorAll('.apname');
            dest.forEach((el, index) => el.innerHTML = `
                <td class="apname">${option[index].apname} /<br><b>${option[index].fnr}</b></td>
            `
            )           
        }

        TABLE_BODY.append(TABLE_BODY_ROW);
        }

        if (option === mainData.arrivals) {//--------------------------there is no GATE in Arrival;
            const GATE = document.querySelectorAll(".gate");
            GATE.forEach(item => item.classList.add('hidden'));
        } 

}

function formatTime(str) {
        return str.slice(11, 16);
    }


//----------------------------------SORTING-------------------------
let order = 'abc';
// let currSortCol = null;
// let currentOption = 'departures';
let count = 0;

function sortTable(col) {
    
    let currCol = col.target.id;

    if (currCol !== 'sched') {//--------------------------if click on String

        let sortStr = (a, b) => a[currCol] > b[currCol] ? 1 : -1;
            
            if (order === 'cba') {
                sortStr = (a, b) => a[currCol] > b[currCol] ? -1 : 1;
            } 
            
        activeOption.sort(sortStr);
    } 
    else {   

        let sortDate = function(a, b) { //--------------------------if click on Date
            let rowA = new Date(a[currCol]);
            let rowB = new Date(b[currCol]);
            return rowA > rowB ? 1 : -1;
            } 
            
            if (order === 'abc') {
                sortDate = function(a, b) {
                    let rowA = new Date(a[currCol]);
                    let rowB = new Date(b[currCol]);
                    return rowA > rowB ? -1 : 1;
                } 
            } 

        activeOption.sort(sortDate);
        
    };

    if (order === 'abc' ) {
        order = 'cba';
    } else 
        order = 'abc';

        TABLE_BODY.innerHTML = '';
        createBody(activeOption);
}

// TABLE_HEAD.addEventListener('click', (col) => {
    
//     let currCol = col.target.id;
//     let sortStr;
    
//     if (currSortCol !== currCol) {
//         order = 'abc';
//         sortStr = (a, b) => a[currCol] > b[currCol] ? 1 : -1;
//         count++;
//     }    
//     else if (currSortCol === currCol && count % 2 !== 0) {
//         order = 'cba';
//         sortStr = (a, b) => a[currCol] > b[currCol] ? -1 : 1;
//         count = 0;
//     } 
//     else if (currSortCol === currCol && count % 2 == 0) {
//         order = 'abc';
//         sortStr = (a, b) => a[currCol] > b[currCol] ? 1 : -1;
//         count++;
//     }

//     activeOption.sort(sortStr);

//     currSortCol = currCol;

//     TABLE_BODY.innerHTML = '';
//     createBody(activeOption);

// })


// function sortFuncAbc(arr) {
//     return arr.sort((a,b) => a[arr] > b[arr] ? 1 : -1)
// }

// function sortFuncBca(arr) {
//     return arr.sort((a,b) => a[arr] > b[arr] ? -1 : 1)
// }








