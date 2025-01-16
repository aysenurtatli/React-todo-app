import './App.css'
import Header from './parts/Header'
import Footer from './parts/Footer'
import TodoList from './TodoList'
import { useSelector } from 'react-redux'

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='min-h-screen dark:bg-zinc-900 dark:text-white'>
        <Header />
        <TodoList />
        <Footer />
      </div>
    </div>
  )
}

export default App
