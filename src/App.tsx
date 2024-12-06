import './App.scss';
import { useTypedDispatch, useTypedSelector } from './hooks/useTypedReduxHooks';
import { SearchBar } from './ui/searchBar/SearchBar';

function App() {
  return (
    <>
      <SearchBar />
    </>
  );
}

export default App;
