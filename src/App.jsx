import './App.css'
import Cards from './components/Cards/Cards'
import { createContext, useState } from 'react';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <div className="bg-gray-800 w-full text-white text-xl font-bold p-4 flex justify-between">
          <div>News App</div>
          <div>
            <label  className="px-10">{theme==="light"?"Light Mode":"Dark Mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme=="dark"}/>
          </div>
        </div>
        <Cards />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
