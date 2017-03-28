var story_session = {
  story_meta: {},
  story: []
};

function updateTitle() {
  var title = $('#story-title').val();
  // Add meta data to meta
  story_session.story_meta.title = title;
  console.log(story_session);
}
function addNode() {
  var id = story_session.story.length;
  var text = $('#story-text').val();
  var choiceA = $('#story-choice-A').val() || null;
  var choiceB = $('#story-choice-B').val() || null;
  var node = {
    id: id,
    text: text,
    choices: [choiceA, choiceB]
  }

  story_session.story.push(node);
  console.log(story_session);
}
function formClear() {
  $('#story-text').val('');
  $('#story-choice-A').val('NA');
  $('#story-choice-B').val('NA');
}
function addNodeOptions() {
  var selOptions = story_session.story;
  var starterOption = '<option value="NA" selected="selected">NA</option>'
  var selectA = $('#story-choice-A');
  var selectB = $('#story-choice-B');

  // Clear previous options
  selectA.find('option').remove();
  selectB.find('option').remove();

  // Add first 'NA' option
  selectA.append(starterOption);
  selectB.append(starterOption);

  // Add additional options based on id
  selOptions.forEach(function(elm) {
    var option = '<option value="' + elm.id + '" >' + elm.id + '</option>';
    selectA.append(option);
    selectB.append(option);
  });
}
function displayOptions() {
  var listArea = $('#story-list');
  var storyNodes = story_session.story;

  listArea.empty();

  if (story_session.story_meta.title) {
    listArea.append('<h2>' + story_session.story_meta.title + '</h2>');
  }
  listArea.append('<ol class="story-list"></ol>');
  storyNodes.forEach(function(elm) {
    var node = '<li>' + elm.text + '</li>';
    listArea.children('ol').append(node);
  });
}

$('#form-title').submit(function(e) {
  e.preventDefault();
  updateTitle();
  displayOptions();
});
$('#form-story-node').submit(function(e) {
  e.preventDefault();
  addNode();
  formClear();
  addNodeOptions();
  displayOptions();
});
