import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import { getDataChart } from 'apis/adminApi';

export default function AdminOverview() {
	const [data, setData] = useState([
		{ column: 'Tháng 1', value: 0 },
		{ column: 'Tháng 2', value: 0 },
		{ column: 'Tháng 3', value: 0 },
		{ column: 'Tháng 4', value: 0 },
		{ column: 'Tháng 5', value: 0 },
		{ column: 'Tháng 6', value: 0 },
		{ column: 'Tháng 7', value: 0 },
	]);
	let isComponentMouted = false;

	const config = {
		data,
		height: 400,
		xField: 'column',
		yField: 'value',
		point: {
			size: 5,
			shape: 'diamond',
		},
		label: {
			style: {
				fill: '#aaa',
			},
		},
	};

	const fetchData = async () => {
		const data = await getDataChart();
		isComponentMouted && setData(data);
	};

	useEffect(() => {
		// eslint-disable-next-line
		isComponentMouted = true;
		fetchData();
		return () => {
			isComponentMouted = false;
		};
	}, []);

	return <Line {...config} />;
}
