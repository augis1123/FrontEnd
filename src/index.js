import {render} from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Header.css'
import './index.css';


import Protected from './Protected'
import NotFound from './NotFound'

import ChooseSellers from './ChooseSeller';

import ItemsList from './ItemsList';
import BillsList from './BillsList';
import AddBills from './AddBills';
import UpdateSeller from './UpdateSeller';
import AddSeller from './AddSeller';
import AddItem from './AddItem'
import UpdateItems from './UpdateItems';
//localStorage.clear()
render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="/AddSeller" element={<AddSeller />} />
        <Route path="/AddItem/:id" element={<AddItem />} />
        <Route path="/UpdateItems/:id/:idd" element={<UpdateItems />} />


        <Route path="/ChooseSellers" element={<ChooseSellers />} />
        <Route path="/ItemsList/:id" element={<ItemsList />} />
        <Route path="/UpdateSeller/:id" element={<UpdateSeller />} />

        <Route path="/BillsList/:id/:id2" element={<BillsList />} />
        <Route path="/addbills/:id/:id2" element={<Protected cmp={AddBills} role={"User"}/>} />

      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
