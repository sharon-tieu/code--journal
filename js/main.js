var $photoUrl = document.querySelector('.photo-url');
var $imgSrc = document.querySelector('.img-source');
var $entryFormData = document.querySelector('.data-form');
var $navBarEntries = document.querySelector('.navbar-entries');
var $createEntryView = document.querySelector('.create-entry-view');
var $entriesListView = document.querySelector('.view-entries-list');
var $newButton = document.querySelector('.new-button');
var $noEntriesView = document.querySelector('.no-entries-view');
var $ulViewEntriesList = document.querySelector('ul');

$photoUrl.addEventListener('input', function (event) {
  if ($photoUrl.value === '') {
    $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    $imgSrc.setAttribute('src', $photoUrl.value);
  }
});

$entryFormData.addEventListener('submit', function (event) {
  event.preventDefault();
  var entries = {
    id: data.nextEntryId,
    title: $entryFormData.elements.title.value,
    photoUrl: $entryFormData.elements.photourl.value,
    notes: $entryFormData.elements.notes.value
  };
  data.entries.unshift(entries);
  data.nextEntryId++;
  $entryFormData.reset();
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  $createEntryView.className = 'hidden';
  $entriesListView.className = 'view-entries-list';
  $ulViewEntriesList.prepend(renderEntries(data.entries[0]));
  data.view = 'view-entries';
  viewSwap();
});

function renderEntries(entries) {
  var $parentLi = document.createElement('li');
  $parentLi.setAttribute('class', 'row margin-top-10');
  $parentLi.setAttribute('data-entry-id', entries.id);

  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $parentLi.appendChild($columnHalfDiv);

  var $imageSrc = document.createElement('img');
  $imageSrc.setAttribute('src', entries.photoUrl);
  $imageSrc.setAttribute('class', 'view-img');
  $columnHalfDiv.appendChild($imageSrc);

  var $siblingDiv = document.createElement('div');
  $siblingDiv.setAttribute('class', 'column-half padding-left-20');
  $parentLi.appendChild($siblingDiv);

  var $viewEntriesTitle = document.createElement('h2');
  $viewEntriesTitle.setAttribute('class', 'font-family-proza view-text-heading-dark-grey');
  $viewEntriesTitle.textContent = entries.title;
  $siblingDiv.appendChild($viewEntriesTitle);

  var $viewEntriesNotes = document.createElement('p');
  $viewEntriesNotes.setAttribute('class', 'font-family-proza text-color-grey');
  $viewEntriesNotes.textContent = entries.notes;
  $siblingDiv.appendChild($viewEntriesNotes);

  return $parentLi;
}

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length > 0) {
    $noEntriesView.className = 'hidden';
    for (var i = 0; i < data.entries.length; i++) {
      var accessEntry = renderEntries(data.entries[i]);
      $ulViewEntriesList.append(accessEntry);
    }
  }
  viewSwap();
});

$navBarEntries.addEventListener('click', function (event) {
  data.view = 'view-entries';
  viewSwap();
});

$newButton.addEventListener('click', function (event) {
  data.view = 'entry-form';
  viewSwap();
});

function viewSwap(view) {
  if (data.view === 'view-entries') {
    data.view = 'view-entries';
    $createEntryView.className = 'hidden';
    $entriesListView.className = 'view-entries-list';
  } else {
    data.view = 'entry-form';
    $createEntryView.className = 'create-entry-view container padding-bottom-50';
    $entriesListView.className = 'hidden';
  }
}
