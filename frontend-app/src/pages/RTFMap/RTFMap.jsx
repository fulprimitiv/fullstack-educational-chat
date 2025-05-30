import React, { useState } from 'react';
import ContentContainer from '../../components/common/ContentContainer/ContentContainer';
import './RTFMap.css';

const RTFMap = () => {
	const [currentFloor, setCurrentFloor] = useState(0);

	const floors = [
		{ number: 0, name: 'Цокольный этаж', image: '/img/zero-floor.png' },
		{ number: 1, name: '1 этаж', image: '/img/first-floor.png' },
		{ number: 2, name: '2 этаж', image: '/img/second-floor.png' },
		{ number: 3, name: '3 этаж', image: '/img/third-floor.png' },
		{ number: 4, name: '4 этаж', image: '/img/fourth-floor.png' }
	];

	const handleFloorChange = (floorNumber) => {
		setCurrentFloor(floorNumber);
	};

	return (
		<ContentContainer title="Интерактивная карта института">
			<div className="rtf-map-container">
				{/* Навигация по этажам */}
				<div className="floor-navigation">
					<h3 className="floor-navigation-title">Выберите этаж:</h3>
					<div className="floor-buttons">
						{floors.map((floor) => (
							<button
								key={floor.number}
								className={`floor-btn ${currentFloor === floor.number ? 'active' : ''}`}
								onClick={() => handleFloorChange(floor.number)}
							>
								{floor.name}
							</button>
						))}
					</div>
				</div>

				{/* Карта */}
				<div className="map-viewer">
					<div className="map-container">
						<img
							src={floors[currentFloor].image}
							alt={`План ${floors[currentFloor].name}`}
							className="map-image"
							onError={(e) => {
								e.target.src = 'https://via.placeholder.com/800x600/E5E7EB/6B7280?text=План+этажа+недоступен';
							}}
						/>
					</div>

					{/* Информация о текущем этаже */}
					<div className="floor-info">
						<h2 className="current-floor-title">{floors[currentFloor].name}</h2>
						<p className="floor-description">
							План помещений и навигация по этажу
						</p>
					</div>
				</div>

				{/* Инструкция */}
				<div className="map-instructions">
					<h3>Как пользоваться картой:</h3>
					<ul>
						<li>Выберите нужный этаж в панели сверху</li>
						<li>Изучите расположение аудиторий и помещений</li>
						<li>Используйте план для навигации по зданию</li>
					</ul>
				</div>
			</div>
		</ContentContainer>
	);
};

export default RTFMap;
