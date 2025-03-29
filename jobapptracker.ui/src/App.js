import './App.css';
import JobApplicationPage from './JobApplicationPage';
import Header from './Header';

function App() {

  return (
    <div className="App">
      <Header />
      <h1>Job Application Tracker</h1>
      <JobApplicationPage/>
    </div>
  );
}

export default App;
