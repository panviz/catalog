const fs = require('fs')

fs.readdir([__dirname,'/svg'].join(''), function(err, files) {
    function filter(file) {
        return /(\.png)/.test(file)
    }
    var filtered = JSON.stringify(files.filter(filter));
    fs.writeFile([__dirname,'/data.json'].join(''), filtered, function(err) {
        if (err) throw new Error(err)
        console.log(filtered)
    })
})