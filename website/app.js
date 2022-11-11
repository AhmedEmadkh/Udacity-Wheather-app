// Global variables
const apiKey = 'b76e35af2362d7986257c28024918aa4&units=imperial';
const btn = document.getElementById('generate');

// Getting Today's Date 
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();


// Listening Function
const updateWeather = async () =>{
  // Local Variables
  const zipCode = document.getElementById('zip');
  const cityName = document.getElementById('city').value;
  const feeling = document.getElementById('feelings').value;
  const myUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=`;
  const fetchedData = await getData(myUrl);
  let filterdData = {
    city:cityName,
    temp:fetchedData.main.temp,
    date:newDate,
    feeling:feeling
  }
  sendData('/add',filterdData);
  retrieveData('/get')
}


// Function that get data from website
const getData = async (myUrl)=>{
  const link = myUrl+apiKey;
  const fetchData = await fetch(link);
  try{
  const data = await fetchData.json();
  // console.log(data);
  return data;
  }catch(error){
    console.log('error'+error)
  }
}


// Sending Data Func. and adding route to the function and the Filterd Data 
const sendData = async (dataPath,filterdData)=>{
    const response =await fetch('/add',{
      method:'POST',
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(filterdData),
    });
    // console.log(response.json())
    try{
      const nData = await response.json();
      console.log(nData);
      return nData;     
    } catch(error){
      console.log('error is' ,error)
    }
}


// // GEtting data from the serer and post it
const retrieveData = async (URL) =>{
  const request = await fetch(URL);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
  document.getElementById('content').innerHTML = allData.city;
  document.getElementById("date").innerHTML =allData.date;
  document.getElementById("feeling").innerHTML=allData.feeling;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


// Event Listener
btn.addEventListener('click',updateWeather);












