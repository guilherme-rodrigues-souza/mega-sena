var quantidadeResultados = document.getElementById('quantidadeResultados');
var generate = document.getElementById('generate');
var btnDeleteLastTable = document.getElementById('deleteLastTable');
var btnDeleteAllTables = document.getElementById('deleteAllTables');
generate.onclick = calculaNumeros;
btnDeleteLastTable.onclick = deleteLastTable;
btnDeleteAllTables.onclick = deleteAllTables;

function deleteLastTable() {
    var lastTable = document.querySelector('[id=tableGenerated]');
    var spanCreateds = document.querySelector('span');

    spanCreateds ? spanCreateds.parentNode.removeChild(spanCreateds) : null;
    lastTable ? lastTable.parentNode.removeChild(lastTable) : null;
}

function deleteAllTables() {
    var tablesCreateds = document.querySelectorAll('[id=tableGenerated]');
    var spanCreateds = document.querySelectorAll('[id=spanResult]');

    for(var i = 0; tablesCreateds.length; i++) {
        tablesCreateds[i].parentNode.removeChild(tablesCreateds[i]);
    }

    for(var j = 0; spanCreateds.length; j++) {
        spanCreateds[j].parentNode.removeChild(spanCreateds[j]);
    }
}

function calculaNumeros() {
    var numerosSorte = new Array(); // Create array
    var random = new Array(); // Create array
    var menorNumero = 1;
    var quantidadeNumeros = 6;
    var maiorNumero = 60;
    var numTentativas = 0;

    if(quantidadeResultados.value) {
        for(var i = 0; i < quantidadeResultados.value; i++) {
            numerosSorte[i] = []; // Create sub-array
            for(var j = 0; j < quantidadeNumeros; j++) {
                if(random.length) {
                    random.pop();
                }
                random.push(randomIntFromInterval(menorNumero,maiorNumero));
                while(numerosSorte[i].indexOf(random[0]) != -1) {
                    random.pop();
                    random.push(randomIntFromInterval(menorNumero,maiorNumero));
                    numTentativas++;
                    if(numTentativas >= 1000) {
                        break;
                    }
                }
                numerosSorte[i].push(random[0]);
            }
        }
        var span = document.createElement('span');
        if(numTentativas >= 1000) {
            span.innerHTML = 'Número de tentativas excedidas. Os número irão se repetir.';
            document.body.appendChild(span);
        }
        document.getElementById('tableJs').appendChild(makeTable(numerosSorte));
        document.body.appendChild(span);
        numTentativas = 0;
    }
}

function randomIntFromInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var result = Math.floor(Math.random() * (max - min + 1) + min);

    return (result.toString().length < 2) ? "0"+result : result;

}

function makeTable(array) {
    var table = document.createElement('table');
    table.setAttribute('id', 'tableGenerated');
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        cell1.setAttribute('id', 'cellResult');
            cell1.textContent = 'Resultado nº ' + (i + 1);
            row.appendChild(cell1);
        for (var j = 0; j < array[i].length; j++) {
            var cell2 = document.createElement('td');
            cell2.setAttribute('id', 'cellNumbers');
            cell2.textContent = array[i][j];
            row.appendChild(cell2);
        }
        table.appendChild(row);
    }
    return table;
}