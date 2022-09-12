/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('user-entries-local-storage', dataJSON);
});

var previousDataJSON = localStorage.getItem('user-entries-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
