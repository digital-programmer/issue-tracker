var issue_title = document.getElementById('issue-title');
var issue_author = document.getElementById('issue-author');
var title_container = document.getElementById('title-container');
var author_container = document.getElementById('author-container');
var filter_form = document.getElementById('filter-form');

filter_form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (issue_title.value) {
        var new_element = create_element(issue_title.value);
        title_container.insertAdjacentElement("beforeend", new_element);
        issue_title.value = '';
    }
    if (issue_author.value) {
        var new_element = create_element(issue_author.value);
        author_container.insertAdjacentElement("beforeend", new_element);
        issue_author.value = '';
    }
});


function create_element(message) {
    var new_element = document.createElement('div');
    new_element.classList.add('tag');
    new_element.innerHTML = `
        <i class="fas fa-times"></i>
        <span class="issue-title-tags" style="margin-left: 3px;">${message.trim()}</span>`;
    new_element.addEventListener('click', function (e) {
        e.preventDefault();
        new_element.remove();
    })
    return new_element;
}