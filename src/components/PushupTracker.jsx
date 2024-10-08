import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function PushupTracker() {
  const [pushupLogs, setPushupLogs] = useState(() => {
    const storedLogs = localStorage.getItem('pushupLogs');
    return storedLogs ? JSON.parse(storedLogs) : {};
  });
  const [selectedCount, setSelectedCount] = useState(10);
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    localStorage.setItem('pushupLogs', JSON.stringify(pushupLogs));
  }, [pushupLogs]);

  useEffect(() => {
    const checkNewDay = () => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      if (!pushupLogs[today]) {
        setPushupLogs((prevLogs) => ({ ...prevLogs, [today]: 0 }));
      }
    };

    checkNewDay();
    const interval = setInterval(checkNewDay, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [pushupLogs]);

  const handleAddPushups = () => {
    const today = new Date().toISOString().split('T')[0];
    setPushupLogs((prevLogs) => ({
      ...prevLogs,
      [today]: (prevLogs[today] || 0) + selectedCount,
    }));
  };

  const calendarEvents = useMemo(() => {
    return Object.entries(pushupLogs).map(([date, count]) => ({
      title: `${count} pushups`,
      start: new Date(date),
      end: new Date(date),
      allDay: true,
    }));
  }, [pushupLogs]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-modern-navy p-6 rounded-3xl shadow-lg text-modern-gray">
      <h2 className="text-3xl font-bold mb-6 text-center text-modern-salmon">
        Pushup Tracker
      </h2>
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <div className="flex-1">
            <Select
              value={selectedCount.toString()}
              onValueChange={(value) => setSelectedCount(Number(value))}
            >
              <SelectTrigger className="w-full bg-modern-blue text-modern-gray rounded-full">
                <SelectValue placeholder="Select count" />
              </SelectTrigger>
              <SelectContent className="bg-modern-blue text-modern-gray rounded-xl shadow-md">
                {[10, 15, 20, 25, 30].map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAddPushups}
            className="flex-1 bg-modern-salmon hover:bg-modern-blue text-modern-gray rounded-full shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            Add Pushups
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setView('list')}
            className={`${
              view === 'list' ? 'bg-modern-blue' : 'bg-modern-navy'
            } text-modern-gray rounded-full shadow-md transition-all duration-300 ease-in-out hover:shadow-lg`}
          >
            List View
          </Button>
          <Button
            onClick={() => setView('calendar')}
            className={`${
              view === 'calendar' ? 'bg-modern-blue' : 'bg-modern-navy'
            } text-modern-gray rounded-full shadow-md transition-all duration-300 ease-in-out hover:shadow-lg`}
          >
            Calendar View
          </Button>
        </div>
      </div>
      {view === 'list' ? (
        <div className="bg-modern-blue p-4 rounded-2xl shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-center text-modern-salmon">
            Pushup History
          </h3>
          {Object.keys(pushupLogs).length === 0 ? (
            <p className="text-center text-modern-gray">
              No pushups recorded yet. Start adding some!
            </p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(pushupLogs)
                .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                .map(([date, count]) => (
                  <li
                    key={date}
                    className="bg-modern-navy p-2 rounded-xl shadow-sm flex justify-between items-center"
                  >
                    <span>{new Date(date).toLocaleDateString()}</span>
                    <span className="font-bold">{count} pushups</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <div
          className="bg-modern-blue p-4 rounded-2xl shadow-inner"
          style={{ height: '500px' }}
        >
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}

export default PushupTracker;
