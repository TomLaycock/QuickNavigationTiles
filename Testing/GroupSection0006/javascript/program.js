program_ready(main);

function main() {
    Initialise_QuickNav();
    InitialiseModal();
    check_for_first_time_load();
}

function check_for_first_time_load() {
  var first_load = GetItemWithDefault("first_time_load", true, true) === null ? true : false;
  if(first_load)
  {
    ShowModal_AddContent(Add_Welcome_Modal_Content);
  }
}