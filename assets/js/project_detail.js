var issue_title = document.getElementById('issue-title');
var issue_author = document.getElementById('issue-author');
var title_container = document.getElementById('title-container');
var author_container = document.getElementById('author-container');
var filter_form = document.getElementById('filter-form');
var filter_btn = document.getElementById('filter-btn');
var project_id = document.getElementById('project-id').value;
var issue_container = document.getElementById('issue-container');

// store the state of all filters used to search issues
const filter_params = {
    title: [],
    author: [],
    label: [],
    project_id
}

// press enter key or click on apply button to use the filter feature
filter_form.addEventListener('submit', function (e) {
    e.preventDefault();

    // check which checkboxes are marked
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var checked_values = Array.from(checkboxes).map(item => item.value);
    filter_params.label = checked_values;

    // if any title is written, add it to title search tags
    if (issue_title.value) {
        var new_element = create_element(issue_title.value, 'title');
        title_container.insertAdjacentElement("beforeend", new_element);
        filter_params.title.push(issue_title.value);
        issue_title.value = '';
    }

    // if any author is written, add it to author search tags
    if (issue_author.value) {
        var new_element = create_element(issue_author.value, 'author');
        author_container.insertAdjacentElement("beforeend", new_element);
        filter_params.author.push(issue_author.value);
        issue_author.value = '';
    }

    // on clicking apply button, marked checkbox are matched with labels of the issues related to that project
    if (filter_params.title.length > 0 || filter_params.author.length > 0 || filter_params.label.length > 0) {
        const data = JSON.stringify(filter_params);
        $.ajax({
            type: 'post',
            url: '/issue/filter-issue',
            data: data,
            success: function (response) {
                // console.log(response.data);
                const DOM_to_add = prepareDOM(response.data);
                issue_container.innerHTML = '';
                issue_container.innerHTML = DOM_to_add;
            },
            error: function (err) {
                issue_container.innerHTML = '';
                issue_container.innerHTML = `<h3 class="no-issue">No issues found</h3>`
                console.log(err);
            }
        });
    }
});

// create search tags for issue title and issue author
function create_element(message, type_message) {
    var new_element = document.createElement('div');
    new_element.classList.add('tag');
    new_element.innerHTML = `
        <i class="fas fa-times"></i>
        <span class="issue-${type_message}-tags" style="margin-left: 3px;">${message.trim()}</span>`;
    new_element.addEventListener('click', function (e) {
        e.preventDefault();
        const arr = filter_params[type_message].filter(item => item !== message);
        filter_params[type_message] = arr;
        new_element.remove();
    })
    return new_element;
}

// prepare DOM for search results based on filter applied
function prepareDOM(data) {
    const issues = data;

    // if no issues are found
    if (issues.length == 0) {
        return `<div class="no-issue flex col valign"><div>No issues found</div></div>`
    }

    const issue_dom_array = issues.map(issue => {
        // for issue labels
        let labels = issue.labels;
        let label_dom = '';
        for (label of labels) {
            label_dom += `<span style="margin-top: 5px;">
                ${label}
            </span>`;
        }

        // for issue status
        let issue_status = issue.status;
        let issue_status_dom = '';
        if (issue_status == 'ongoing') {
            issue_status_dom = `<form action="/issue/resolve-issue/${issue._id}" method="get"><button type="submit" style="margin-right: 10px;">Resolve</button></form>`
        } else {
            issue_status_dom = `<span style="font-size: 12px; background-color: var(--canvas); border: 1px solid var(--border-color); padding: 5px 10px; margin-right: 10px; border-radius: 5px;">Closed</span> `
        }

        // complete dom of an issue
        let DOMString = `<div class="issue-item" id="issue-${issue._id}"><div class="flex space-between valign"><div><h3>${issue.title}</h3><div class="issue-author">${issue.author}</div></div><div class="flex valign">${issue_status_dom}<a href="/issue/delete-issue/${issue._id}"><i class="fas fa-trash"></i></a></div></div><div class="issue-item-details flex space-between"><span style="max-width: 60%;">${issue.description}</span><span>${issue.createdAt.toLocaleString()}</span></div><div class="label-container flex wrap valign">${label_dom}</div></div>`;

        return DOMString;
    });

    return issue_dom_array.join(' ');

}
