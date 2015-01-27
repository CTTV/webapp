var margin = 0;
var diameter = 600;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.value; })

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json("flare2.json", function(error, root) {
    if (error) return console.error(error);

    console.log("ROOT:");
    console.log(root);
    var focus = root;
    var	nodes = pack.nodes(root);
    var view;

    var circle = svg.selectAll("circle")
	.data(nodes)
	.enter().append("circle")
	.attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
	.style("fill", function(d) { return d.children ? color(d.depth) : null; })
	.on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

    var text = svg.selectAll("text")
	.data(nodes)
	.enter().append("text")
	.attr("class", "label")
	.style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
	.style("display", function(d) { return d.parent === root ? null : "none"; })
	.text(function(d) { return d.name; });

    var node = svg.selectAll("circle,text");

    d3.select("body")
	.style("background", color(-1))
	.on("click", function() { zoom(root); });

    focusTo([root.x, root.y, root.r * 2 + margin]);
    
    function zoom(d) {
	var focus0 = focus; focus = d;
	console.log("ZOOM!");
	var transition = d3.transition()
	    .duration(d3.event.altKey ? 7500 : 750)
	    .tween("zoom", function(d) {
		var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
		return function(t) { focusTo(i(t)); };
	    });

	// transition.selectAll("text")
	//     .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
	//     .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
	//     .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
	// 	.each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function focusTo(v) {
	console.log(v);
	var k = diameter / v[2];
	view = v;
	console.log("VIEW:");
	console.log(view);
	console.log("NODE:");
	console.log(node);
	node.attr("transform", function(d) { console.log("translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"); return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
	console.log("CIRCLE:");
	console.log(circle);
	circle.attr("r", function(d) { console.log(d.r*k); return d.r * k; });
    }
});

d3.select(self.frameElement).style("height", diameter + "px");
