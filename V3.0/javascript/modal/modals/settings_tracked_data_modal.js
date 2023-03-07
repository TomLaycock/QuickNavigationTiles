function Add_Settings_Tracked_Data_Modal_Content() {
  var builder = new ElementBuilder("div", "modal_content");
  builder.AddChild("h6")
    .Custom(AddInnerHtml, "Saved Data")
    .ReturnToRoot()
    .AddChild("div", null, "scrollable_content max_height_30vh");
      
  var data = GetTrackedItems();

  for (let index = 0; index < data.length; index++) {
    builder.AddChild("div", null, "modal_2_col").AddChild("p", null, "data_text ten_px_right_margin").Custom(AddInnerHtml, data[index]).StepToParent_NTimes(1)
    .Custom(AddButton, "cancel", "Remove", DeleteData_RefreshModal.bind(this, data[index], Add_Settings_Tracked_Data_Modal_Content), "two_px_vertical_margin").StepToParent_NTimes(1);
  }
      
  builder.StepToParent_NTimes(1).AddChild("div", "modal_controls").Custom(AddButton, "info", "Back", ShowModal_AddContent.bind(this, Add_Settings_Modal_Content, false));

  var modal = FindChildById(active_modal, "modal");
  modal.append(builder.ReturnResult());
}

function DeleteData_RefreshModal(DataToDelete, modal) {
  console.log("Button Clicked!");
  DeleteItem(DataToDelete);
  ShowModal_AddContent(modal, false)
}