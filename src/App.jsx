import PushupTracker from './components/PushupTracker';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-modern-navy to-modern-dark flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <PushupTracker />
      </div>
      <Footer />
    </div>
  );
}

export default App;
