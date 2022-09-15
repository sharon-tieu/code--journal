var $photoUrl = document.querySelector('.photo-url');
var $imgSrc = document.querySelector('.img-source');
var $entryFormData = document.querySelector('.data-form');
var $navBarEntries = document.querySelector('.navbar-entries');
var $createEntryView = document.querySelector('.create-entry-view');
var $entriesListView = document.querySelector('.view-entries-list');
var $newButton = document.querySelector('.new-button');
var $noEntriesView = document.querySelector('.no-entries-view');
var $ulViewEntriesList = document.querySelector('ul');
var $newEntryHeading = document.querySelector('.new-entry-heading');
var $editEntryHeading = document.querySelector('.edit-entry-heading');
var $deleteEntry = document.querySelector('.delete-entry');

// $deleteEntry.addEventListener('click', function (event) {
//   console.log('delete is working');

// });

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
  if (data.editing === null) {
    data.entries.unshift(entries);
    data.nextEntryId++;
    $ulViewEntriesList.prepend(renderEntries(data.entries[0]));
  } else {
    var replaceForLiElement = document.querySelectorAll('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === data.editing.id) {
        entries = {
          id: data.entries[i].id,
          title: $entryFormData.elements.title.value,
          photoUrl: $entryFormData.elements.photourl.value,
          notes: $entryFormData.elements.notes.value
        };
        // filter.push(entries);
        data.entries = data.entries.filter(function (entry) {
          return entry.id !== data.editing.id;
        });
        data.entries.unshift(entries);
        for (i = 0; i < replaceForLiElement.length; i++) {
          if (Number(replaceForLiElement[i].getAttribute('data-entry-id')) === Number(data.editing.id)) {
            replaceForLiElement[i].replaceWith(renderEntries(entries));
          }
        }
      }
      //   // filter.push(data.entries[i]);
      // }
      // data.entries = filter;
      data.editing = null;
    }
  }
  $entryFormData.reset();
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  $createEntryView.className = 'hidden';
  $entriesListView.className = 'view-entries-list';
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

  var $textContentRow = document.createElement('div');
  $textContentRow.setAttribute('class', 'row justify-content-sb');
  $siblingDiv.appendChild($textContentRow);

  var $viewEntriesTitle = document.createElement('h2');
  $viewEntriesTitle.setAttribute('class', 'font-family-proza view-text-heading-dark-grey');
  $viewEntriesTitle.textContent = entries.title;
  $textContentRow.appendChild($viewEntriesTitle);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fa-solid fa-pencil padding-top-20');
  $textContentRow.appendChild($editIcon);

  $editIcon.addEventListener('click', function (event) {
    // console.log('editing icon is working');
    data.view = 'entry-form';
    // console.log('data.view from clicking on pencil icon:', data.view);
    viewSwap();
    if (data.view === 'entry-form') {
      $editEntryHeading.classList.remove('hidden');
      $newEntryHeading.classList.add('hidden');
    }
    // console.log('entries.id:', entries.id);
    var $editTitle = document.querySelector('#title');
    var $editPhotoUrl = document.querySelector('#photo-url');
    var $editNotes = document.querySelector('#notes');
    var entryId = Number(event.target.closest('li').getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === entryId) {
        // console.log('data.entries[i]:', data.entries[i]);
        data.editing = data.entries[i];
        $editTitle.value = data.entries[i].title;
        $editPhotoUrl.value = data.entries[i].photoUrl;
        $imgSrc.setAttribute('src', data.entries[i].photoUrl);
        $editNotes.value = data.entries[i].notes;
      }
    }
  });

  var $notesTextContentRow = document.createElement('div');
  $notesTextContentRow.setAttribute('class', 'row');
  $siblingDiv.appendChild($notesTextContentRow);

  var $viewEntriesNotes = document.createElement('p');
  $viewEntriesNotes.setAttribute('class', 'font-family-proza text-color-grey');
  $viewEntriesNotes.textContent = entries.notes;
  $notesTextContentRow.appendChild($viewEntriesNotes);

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
  $entryFormData.reset();
  $editEntryHeading.classList.add('hidden');
  $newEntryHeading.classList.remove('hidden');
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  // console.log('data.view from new button click:', data.view);
  $deleteEntry.classList.add('hidden');
  viewSwap();
});

function viewSwap(view) {
  if (data.view === 'view-entries') {
    data.view = 'view-entries';
    $createEntryView.className = 'hidden';
    $entriesListView.className = 'view-entries-list';
    $deleteEntry.className = 'delete-entry font-family-proza font-color-wh font-size-16';
    // $ulViewEntriesList = null;
    // for (var i = 0; i < data.entries.length; i++) {
    //   $ulViewEntriesList.prepend(renderEntries(data.entries[i]));
    // }
  } else {
    data.view = 'entry-form';
    $createEntryView.className = 'create-entry-view container padding-bottom-50';
    $entriesListView.className = 'hidden';
  }
}
