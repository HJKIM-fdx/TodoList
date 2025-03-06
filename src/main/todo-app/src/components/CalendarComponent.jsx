import React from 'react';
import { Calendar, Badge } from 'antd';
import dayjs from 'dayjs';

const CalendarComponent = ({ setSelectedDate, todoList = [] }) => {
  console.log("@@@ todoList 확인:", todoList); // 디버깅용 로그
  
  // 날짜 선택 시 호출되는 함수
  const handleDateSelect = (date) => {
      if (date) {
          console.log('Selected Date:', date.format('YYYY-MM-DD'));
          setSelectedDate(dayjs(date));
        }
    };
    
    // 날짜별 일정 표시 (cellRender 사용)
    const cellRender = (current, info) => {
        if (info.type !== 'date') return info.originNode; // 기본 UI 유지
        
        const formattedDate = current.format('YYYY-MM-DD');
        
        // dueDate를 변환 후 비교 (이전 문제 해결)
        const dailyTodos = todoList.filter(todo =>
            dayjs(todo.dueDate).isValid() && dayjs(todo.dueDate).format('YYYY-MM-DD') === formattedDate
          );
          
        
        // console.log(`📆 ${formattedDate}:`, dailyTodos); // ✅ 디버깅용
        dailyTodos.forEach(todo => console.log(`✅ ${todo.todoId}: ${todo.todoTitle}`));
        
        return (
            <div>
        {dailyTodos.map((todo) => (
            <Badge 
            key={todo.todoId} 
            status="processing" 
            text={todo.todoTitle} 
            style={{ display: 'block', marginTop: 4, fontSize: '14px' }} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{ padding: '16px' }}>
      <Calendar 
        mode="month" 
        onSelect={handleDateSelect} 
        cellRender={cellRender} 
        fullscreen={true} // 연도 버튼 제거
        headerRender={({ value, onChange }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12, fontSize: '18px', fontWeight: 'bold' }}>
              <button 
                onClick={() => onChange(value.subtract(1, 'month'))} 
                style={{ fontSize: '20px', padding: '6px 12px', marginRight: '16px', cursor: 'pointer', border: 'none', background: 'none' }}>
                {'<'}
              </button>
              <span>{value.year()} {value.format('MMM')}</span>
              <button 
                onClick={() => onChange(value.add(1, 'month'))} 
                style={{ fontSize: '20px', padding: '6px 12px', marginLeft: '16px', cursor: 'pointer', border: 'none', background: 'none' }}>
                {'>'}
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarComponent;