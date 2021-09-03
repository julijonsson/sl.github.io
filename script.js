function GetStopAreaIdWithName(){
 
    let searchInput = document.getElementById("search").value;
    let url = " https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/typeahead.json?key=b897afed6c4446489075e7a16ddca8ba&searchstring=" + searchInput + " &stationsonly=true";
    axios
     .get(url)
     .then((response) => {
    console.log(response);
    GetTransportInformation(response.data.ResponseData[0].SiteId);
     })
    console.log(searchInput)
    }
    function GetTransportInformation(data){
    let overview = document.getElementById("overview");
    let url = " https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesv4.json?key=43bb6310e3924504b16c75db05080f92&siteid=" + data +"&timewindow=30";
    //LineNumber Destination DisplayTime
    axios
     .get(url)
     .then((response) => {
    console.log(response);
    WriteResultApiInformation(response)
     })
    }
    function WriteResultApiInformation(data){
    let myload = document.getElementsByClassName("myload")[0];
    myload.style.display = "inline-block"
     
    console.log(myload.style.visibility)
    RemoveTableTbody();
    WriteResultApiInformationByType(data.data.ResponseData.Metros);
    WriteResultApiInformationByType(data.data.ResponseData.Buses);
    WriteResultApiInformationByType(data.data.ResponseData.Trains);
     
    setTimeout(SpinnerLoader,1000)
     
    }
     
    function WriteResultApiInformationByType(DataByType){
    let myTbody = document.getElementById("tbody");
     
     
    for(let i = 0 ; i<DataByType.length;i++ )
     {
    let newElement = document.createElement("tr");
    newElement.innerHTML =
    "<td>" +DataByType[i].LineNumber + "</td>"+
    "<td>" +DataByType[i].Destination + "</td>"+
    "<td>" +DataByType[i].DisplayTime + "</td>"+
    "<td>" +DataByType[i].TransportMode + "</td>"
    myTbody.appendChild(newElement);
     }
     
     
    }
    function RemoveTableTbody(){
    let myTbody = document.getElementById("tbody");
    myTbody.innerHTML = "";
    }
    function SpinnerLoader(){
    let myload = document.getElementsByClassName("myload")[0];
     
    myload.style.display = "none";
    }