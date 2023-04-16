let buttonElement = document.getElementById('checkButton');
console.log("hello22")
buttonElement.addEventListener('click', (event) => {
    console.log("hello");
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
            mode: "check",
            points: document.getElementById("points").value,
            switcherSize: document.getElementById("switcherSize").value,
            interval: document.getElementById("interval").value,
        });
    });
});

document.getElementById('startButton').addEventListener('click', (event) => {
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {
            mode: "start",
            points: document.getElementById("points").value,
            switcherSize: document.getElementById("switcherSize").value,
            interval: document.getElementById("interval").value,
        });
    });
});


/*
                <tr>
                    <th><label>points</label></th>
                    <td><input id="points" type="text" value="80,50,90,100"></td>
                </tr>
                <tr>
                    <th><label>switcher size</label></th>
                    <td><input id="switcherSize" type="number" value="80"></td>
                </tr>
                <tr>
                    <th><label>N player</label></th>
                    <td><input id="Nplayer" type="number" value="4"></td>
                </tr>
                <tr>
                    <th><label>interval</label></th>
                    <td><input id="interval" type="number" value="2"></td>
                </tr>
*/
