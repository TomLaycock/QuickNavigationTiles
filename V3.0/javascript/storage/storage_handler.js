/* SAVE ITEMS */

function SaveItem(key, value) {
    window.localStorage.setItem(key, value);
}


/* GET ITEM */

function GetItem(key) {
    return window.localStorage.getItem(key);
}


/* DELETE ITEM */

function DeleteItem(key) {
    window.localStorage.removeItem(key);
}