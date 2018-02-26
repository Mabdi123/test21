$(function() {
  MadCap.Utilities.CrossFrame.PostMessageRequest(parent,'help-name:'+$('#help-name').text());
  $('.relatedTopics').appendTo('.sideContentRight').show();
});