module.exports.home = function (req, res) {
    return res.render("home", {
        title: "Issue Tracker | Home",
        projects: []
    });
};
