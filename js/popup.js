// Get the table element and the first table body
var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
chrome.tabs.query({currentWindow: true}, function(tabs) {
    console.log(tabs)
    for (var i=0; i<tabs.length; i++) {
        // skip the current tab since we cant discard that one
        if (tabs[i].active === true){
            continue;
        }
        // Insert a new row for every tab at the last row
        var row = table.insertRow(table.rows.length);

        // insert a cells in the table row
        // Tab Name
        var cell0 = row.insertCell(0);
        // Status
        var cell1 = row.insertCell(1);

        // tabID (hidden)
        var cell2 = row.insertCell(2);

        // Set the text for each cell
        cell0.innerHTML = tabs[i].title;
        cell1.innerHTML = tabs[i].discarded;
        cell2.innerHTML = tabs[i].id;

        // Add onClick listener to each row
        row.onclick = (function() {
            var cnt = i;
            return function() {
                var id = this.cells[2].innerHTML;

                // Try to discard the clicked tab by ID
                console.log("tryig to discard here");
                chrome.tabs.query({currentWindow: true}, function(tabs) {
                  chrome.tabs.discard(Number(id), function(tab) {
                    console.log("Discarded") 
                  });
            });
            }
        })();
        
    }
});

