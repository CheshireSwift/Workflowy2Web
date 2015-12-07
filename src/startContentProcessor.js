﻿// Dependent on DOM structure and javascript of workflowy
// exportIt is a custom workflowy function so can only be called in the page context


var opml = extractOpmlData();
var parsedOpml = $.parseXML(opml);
var xml = $(parsedOpml);

var siteTitle = $('.project.selected > .name').text();

var filename = prompt("Please enter a name", "Prototype");

var converter = new Converter(xml, siteTitle);
converter.GetZippedHtmlFiles(function (data) {
  saveAs(data, filename + ".zip");
});

function extractOpmlData() {
  openExportPopup();
  switchToOpmlTab();
  var opml = getWorkflowyAsXml();
  closeExportPopup();
  return opml;
}

function switchToOpmlTab() {
  $('#id_opml').click()
}

function getWorkflowyAsXml() {
  return $('#exportPopup').find('.previewWindow.hasOpml').text();
}

function openExportPopup() {
  var script = document.createElement('script');
  var code = document.createTextNode('(function() {$(".project.selected").exportIt();})();');
  script.appendChild(code);
  document.head.appendChild(script);
}

function closeExportPopup() {
  $('#exportPopup').parent().find('.ui-icon-closethick').click();
}