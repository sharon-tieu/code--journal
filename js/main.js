var $photoUrl = document.querySelector('.photo-url');
var $imgSrc = document.querySelector('.img-source');

$photoUrl.addEventListener('input', function (event) {
  if ($photoUrl.value === '') {
    $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    $imgSrc.setAttribute('src', $photoUrl.value);
  }
});

var $entryForm = document.querySelector('.data-form');
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var $titleEntryValue = document.querySelector('#title').value;
  var $photoUrlValue = document.querySelector('.photo-url').value;
  var $notesEntryValue = document.querySelector('#notes').value;
  var entries = {
    id: data.nextEntryId,
    $titleEntryValue,
    $photoUrlValue,
    $notesEntryValue
  };
  data.entries.unshift(entries);
  data.nextEntryId++;
  $entryForm.reset();
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
});
