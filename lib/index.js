module.exports = function() {
	var a = arguments,
		func = a[a.length - 1],
		groups = [ ],
		map = { },
		rank = [ ],
		r = 0;
	
	//map occurrences of each priority group
	for (var i = 0; i < a.length - 1; i++) {
		if (!map[a[i]]) {
			groups.push(a[i]);
			map[a[i]] = [ ];
		}
		map[a[i]].push(i);
	}
	
	groups.sort();
	
	//calculate rank
	for (var p in groups)
		for (var i = 0; i < map[groups[p]].length; i++)
			rank[map[groups[p]][i]] = r++;
	
	return function() {		
		if (arguments.length >= rank.length)
			return func.apply(this, arguments);
		
		var args = [],
			r = 0;
		
		for (var i = 0; i < rank.length; i++)
			args.push(rank[i] < arguments.length ? arguments[r++] : undefined);
		
		return func.apply(this, args);
	}
}