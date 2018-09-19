let data = {
	vectors: [
		{
			name: 'vector0',
			string: '40, 50, 20; 10, 30, -20',
			tail: [40, 50, 20],
			head: [10, 30, -20],
			color: '#d35400'
		},
		{
			name: 'vector1',
			string: '10,30,-20;0,0,0',
			tail: [10,30,-20],
			head: [0,0,0],
			color: '#27ae60'
		},
		{
			name: 'vector2',
			string: '0,0,0;40,50,20',
			tail: [0,0,0],
			head: [40, 50, 20],
			color: '#1f618d'
		}
	],
	functions: [
		{
			name: 'function0',
			string: 'x',
			color: '#707B7C',
			parsed: {}
		},
		{
			name: 'function1',
			string: 'cos(x)',
			color: '#C0392B',
			parsed: {}
		},
		{
			name: 'function2',
			string: 'sqrt(x)',
			color: '#27AE60',
			parsed: {}
		}
	]
}


export { data }