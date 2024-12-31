import './App.css';
import CommentsContainer from './components/CommentsContainer.tsx';
import CommentsContextProvider from './context/comments-context.tsx';

function App() {
  return (
    <>
      <CommentsContextProvider>
        <CommentsContainer />
      </CommentsContextProvider>
    </>
  );
}

export default App;
