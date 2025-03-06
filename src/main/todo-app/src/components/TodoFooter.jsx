import React from 'react';
import { Button } from 'antd';

const TodoFooter = ({ onRemoveAll, onCompleteAll }) => {
  return (
    <div className="footer" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div className="item">
        <Button type="primary" danger onClick={onRemoveAll}>
          전체삭제
        </Button>
      </div>
      <div className="item">
        <Button type="primary" onClick={onCompleteAll}>
          전체완료
        </Button>
      </div>
    </div>
  );
};

export default TodoFooter;
