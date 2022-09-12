var $photoUrl = document.querySelector('.photo-url');
var $imgSrc = document.querySelector('.img-source');

$photoUrl.addEventListener('input', function (event) {
  if ($photoUrl.value === '') {
    $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    $imgSrc.setAttribute('src', $photoUrl.value);
  }
});

var $entryFormData = document.querySelector('.data-form');
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
});
