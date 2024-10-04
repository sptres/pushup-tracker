import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function PushupTracker() {
  const [pushups, setPushups] = useState([]);
  const [selectedCount, setSelectedCount] = useState(10);

  useEffect(() => {
    const storedPushups = localStorage.getItem('pushups');
    if (storedPushups) {
      setPushups(JSON.parse(storedPushups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pushups', JSON.stringify(pushups));
  }, [pushups]);

  const handleAddPushups = () => {
    const newPushup = {
      id: Date.now(),
      count: selectedCount,
      date: new Date().toISOString(),
    };
    setPushups([...pushups, newPushup]);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={selectedCount.toString()}
          onValueChange={(value) => setSelectedCount(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select pushup count" />
          </SelectTrigger>
          <SelectContent>
            {[10, 15, 20, 25, 30].map((count) => (
              <SelectItem key={count} value={count.toString()}>
                {count} pushups
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddPushups}>Add Pushups</Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Pushup History</h2>
        <ul>
          {pushups.map((pushup) => (
            <li key={pushup.id} className="mb-2">
              {pushup.count} pushups on {new Date(pushup.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PushupTracker;
