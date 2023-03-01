/* SAVE ITEMS */

function SaveItem(key, value) {
    window.localStorage.setItem(key, value);
    TrackSavedItem(key);
}


/* TRACK SAVED ITEMS */

function TrackSavedItem(key)
{
  if(key == "qnt_saved_data") return;

  var saved_data = GetItem("qnt_saved_data", []);
  
  if(saved_data[key] === undefined)
  {
    saved_data.push(key);
  }

  SaveItem("qnt_saved_data", saved_data);
}


/* GET ITEM */

function GetItem(key) {
    return window.localStorage.getItem(key);
}

function GetItem(key, default_value, return_original = false) {
  var valueFound = window.localStorage.getItem(key);
  
  if(valueFound === null)
  {
    SaveItem(key, default_value);
  }

  return return_original ? valueFound : default_value;
}


/* DELETE ITEM */

function DeleteItem(key) {
    window.localStorage.removeItem(key);
}