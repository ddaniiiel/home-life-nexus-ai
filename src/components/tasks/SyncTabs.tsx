
import React from 'react';
import AppleRemindersSync from '@/components/AppleRemindersSync';
import BringAppSync from '@/components/BringAppSync';

const SyncTabs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppleRemindersSync />
      <BringAppSync />
    </div>
  );
};

export default SyncTabs;
