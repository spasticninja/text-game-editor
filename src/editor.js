var storySession = {
  storyMeta: {},
  story: []
};

const listItem = ({text, choicesA, choicesB}) => `
  <li>
    <form>
      <div class="form-group">
        <div class="col-md-8">
          <textarea readonly class="hide-borders">
            ${text}
          </textarea>
        </div>
        <div class="col-md-1">
            ${choicesA}
        </div>
        <div class="col-md-1">
            ${choicesB}
        </div>
      </div>
    </form>
  </li>
`;

function updateTitle() {
  var title = $('#story-title').val();
  // Add meta data to meta
  storySession.storyMeta.title = title;
  console.log(storySession);
}
function addNode() {
  var id = storySession.story.length;
  var text = $('#story-text').val();
  var choiceA = $('#story-choice-A').val() || null;
  var choiceB = $('#story-choice-B').val() || null;
  var node = {
    id: id,
    text: text,
    choices: [choiceA, choiceB]
  }

  storySession.story.push(node);
  console.log(storySession);
}
function formClear() {
  $('#story-text').val('').focus();
  $('#story-choice-A').val('NA');
  $('#story-choice-B').val('NA');
}
function addNodeOptions() {
  var selOptions = storySession.story;
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
  var storyNodes = storySession.story;
  var list = [];

  // List of select options
  var selectOptions = ['NA'];
  for (var i = 0; i < storySession.story.length; i++) {
    selectOptions.push(i);
  }
  console.log(selectOptions);

  listArea.empty();

  if (storySession.storyMeta.title) {
    listArea.append('<h2>' + storySession.storyMeta.title + '</h2>');
  }

  listArea.append('<ul class="story-list"></ul>');
  storyNodes.forEach(function(elm) {
    var text = elm.text;
    var nodeA = elm.choices[0];
    var nodeB = elm.choices[1];
    var id = elm.id;
    var optionA, optionB;
    var optionsA = [];
    var optionsB = [];

    for (var i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i] == nodeA) {
        optionA = '<option selected="selected" value="' + selectOptions[i] + '">' + selectOptions[i] + '</option>';
      } else {
        optionA = '<option value="' + selectOptions[i] + '">' + selectOptions[i] + '</option>';
      }

      if (selectOptions[i] == nodeB) {
        optionB = '<option selected="selected" value="' + selectOptions[i] + '">' + selectOptions[i] + '</option>';
      } else {
        optionB = '<option value="' + selectOptions[i] + '">' + selectOptions[i] + '</option>';
      }

      optionsA.push(optionA);
      optionsB.push(optionB);
    }

    list.push({id, text, optionsA, optionsB});
  });
  list.forEach(function(elm) {
    $('.story-list').append(
      '<li data-editable data-key="' + elm.id + '"><form><div class="form-group"><div class="col-md-8"><textarea readonly class="hide-borders">' + elm.text + '</textarea></div><div class="col-md-1"><select>' + elm.optionsA.join('') + '</select></div><div class="col-md-1"><select>' + elm.optionsB.join('') + '</select></div></form></li>'
    );
  });
}
//export the storySession as a downloaded JSON file
function exportStorySession(storySession) {
  const downloadSelector = '#exportLink';
  const myStorySessionString = JSON.stringify(storySession);
  const b64StorySession = 'data:application/json;charset=utf-8,' + encodeURIComponent(myStorySessionString);

  const downloadHref = document.querySelector(downloadSelector);
  downloadHref.download = 'story_session.json';
  downloadHref.href = b64StorySession;
  downloadHref.click();
}

//return either an Error object or a decoded story session
function importStorySession(storySessionText) {
  const decodedStorySession = decodeURIComponent(storySessionText);
  let storySession = null;

  try {
    storySession = JSON.parse(decodedStorySession);
  } catch (e) {
    return e;
  }

  return storySession;
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
$('#click-download').click(function(e) {
  e.preventDefault();

  if (storySession.story.length !== 0) {
    console.log(storySession.story);
    exportStorySession(storySession);
  } else {
    console.log('no story to download');
  }
});
