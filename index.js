var spawn = require('child_process').spawn

var outdated = spawn('npm', ['outdated']);
outdated.stdout.on('data', function (data) {
  var out = data.toString();
  var lines = out.split('\n');
  if (lines.length > 1) {
    lines = lines.slice(1);
    var packages = [];
    lines.forEach(function(line) {
      if (line.length > 0) {
        var parts = line.split(/\s+/);

        var package = parts[0];
        var current = parts[1];
        var wanted = parts[2];

        if (wanted != current) {
          packages.push({name: package, current: current, wanted: wanted})
        }
      }
    })

    if (packages.length > 0) {
      packages.forEach(function(p) {
        console.log(p.name + '\t' + p.current + ' => ' + p.wanted);
      })
    }
  }
});

