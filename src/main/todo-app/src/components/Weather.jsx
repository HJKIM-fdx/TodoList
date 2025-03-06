import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Text } = Typography;

function Weather({ city = "Seoul" }) {  // 기본값 "Seoul"
    const [weatherData, setWeatherData] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // 오늘 날짜 구하기
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getDate();
        const formattedDate = `${month < 10 ?  + month : month}월 ${day < 10 ? '0' + day : day}일`;
        setCurrentDate(formattedDate);

        // 날씨 데이터 가져오기
        fetch(`http://localhost:8081/api/weather?city=${city}&lang=kr`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error("Error fetching weather data:", error));
    }, [city]);

    return (
        <div style={{ padding: '0px', textAlign: 'center' }}>
            {weatherData ? (
                <div
                    style={{
                        background: '#f7f7f7',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '400px',
                        margin: '0 auto',
                    }}
                >
                    <Title level={2}>{`${currentDate}`}</Title>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Text strong>현재날씨: </Text>
                            <Text>{weatherData.description}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>현재온도: </Text>
                            <Text>{weatherData.temperature}°C</Text>
                        </Col>
                    </Row>
                </div>
            ) : (
                <Text>Loading...</Text>
            )}
        </div>
    );
}

export default Weather;
