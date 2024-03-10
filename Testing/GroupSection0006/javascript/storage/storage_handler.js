/* SAVE ITEMS */

function SaveItem(key, value) {
    window.localStorage.setItem(key, value);
    TrackSavedItem(key);
}


/* TRACK SAVED ITEMS */

function TrackSavedItem(key)
{
  if(key == "qnt_saved_data") return;

  var saved_data = GetTrackedItems();

  console.log("Tracked Items:   " + key);
  console.log(saved_data);
  console.log(saved_data[key]);

  if(!saved_data.includes(key))
  {
    saved_data.push(key);
  }

  SaveItem("qnt_saved_data", JSON.stringify(saved_data));
}


function GetTrackedItems() {
  var saved_data = GetItem("qnt_saved_data");

  if(saved_data === undefined || saved_data == null)
    saved_data = [];
  else
    saved_data = JSON.parse(saved_data);

  return saved_data;
}


/* GET ITEM */

function GetItem(key) {
    return window.localStorage.getItem(key);
}

function GetItemWithDefault(key, default_value, return_original = false) {
  var valueFound = window.localStorage.getItem(key);

  if(valueFound === null)
  {
    SaveItem(key, default_value);
  }

  return return_original ? valueFound : default_value;
}


/* DELETE ITEM */

function DeleteItem(key) {
    var saved_data = GetTrackedItems();

    if(saved_data.includes(key))
    {
      RemoveItemFromArrayOnce(saved_data, key);
      SaveItem("qnt_saved_data", JSON.stringify(saved_data));
    }

    window.localStorage.removeItem(key);
}