import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from './Pages/SearchPage/SearchPage';

function App() {
  return (
    <BrowserRouter>
				<Routes>
					<Route exact path="/search" element={<SearchPage />}/>
					<Route exact path="/search/:search" element={<SearchPage />}/>
					<Route path="*" element={<Navigate to="/search"/>} />
				</Routes>
		</BrowserRouter>
  );
}

export default App;
