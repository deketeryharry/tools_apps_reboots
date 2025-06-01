import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import RandomPicker from './pages/RandomPicker'
import CharacterCounter from './pages/CharacterCounter'
import LottoGenerator from './pages/LottoGenerator'

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/random-picker" element={<RandomPicker />} />
            <Route path="/character-counter" element={<CharacterCounter />} />
            <Route path="/lotto-generator" element={<LottoGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
