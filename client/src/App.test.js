import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

test("Renderiza el nombre de la app", () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </Provider>);
  const elemento = screen.getByText("FoodBook PI");
  expect(elemento).toBeInTheDocument();
});

test("Renderiza la funcion de Crear Receta", () => {
  render(<Provider store={store}>
    <BrowserRouter><Navbar/></BrowserRouter>
  </Provider>);
  const create = screen.getByText("Create Recipe!");
  expect(create).toBeInTheDocument();
})