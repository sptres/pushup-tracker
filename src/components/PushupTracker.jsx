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
    <div className="w-full max-w-md mx-auto bg-pastel-yellow p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-pastel-purple">
        Pushup Tracker
      </h2>
      <div className="flex flex-col items-center gap-4 mb-6">
        <Select
          value={selectedCount.toString()}
          onValueChange={(value) => setSelectedCount(Number(value))}
        >
          <SelectTrigger className="w-full max-w-[200px] bg-white">
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
        <Button
          onClick={handleAddPushups}
          className="w-full max-w-[200px] bg-pastel-green hover:bg-pastel-blue text-black"
        >
          Add Pushups
        </Button>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-center text-pastel-pink">
          Pushup History
        </h3>
        {pushups.length === 0 ? (
          <p className="text-center text-gray-500">
            No pushups recorded yet. Start adding some!
          </p>
        ) : (
          <ul className="space-y-2">
            {pushups.map((pushup) => (
              <li key={pushup.id} className="bg-pastel-blue p-2 rounded">
                <span className="font-bold">{pushup.count}</span> pushups on{' '}
                {new Date(pushup.date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PushupTracker;
