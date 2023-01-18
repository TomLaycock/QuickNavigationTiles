function AddInnerHtml(builder, value) { builder.currentElement.innerHTML = value; return builder; }

function OnClick(builder, func) { AddClickListnerToButton(builder.currentElement, func); return builder; }